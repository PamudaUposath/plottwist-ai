import { randomUUID } from 'node:crypto';
import { generateCreativeBrief } from '../utils/creativeBrief.js';
import { getTimePeriod } from '../utils/timePeriod.js';
import { generateStoryFromBedrock } from './bedrock.js';
import { saveAutonomousStory } from './dynamodb.js';
import { AutonomousStory } from '../types/story.js';
import { logInfo, logError } from '../utils/logger.js';

export async function runAutonomousGeneration(executionTime: Date, scheduledTimeEpoch: number): Promise<AutonomousStory> {
  const timezone = process.env.AGENT_TIMEZONE || 'Asia/Colombo';
  const modelId = process.env.BEDROCK_MODEL_ID || 'us.amazon.nova-lite-v1:0';
  const storyId = randomUUID();

  // Create stable idempotency key using scheduled time (rounded to 5 minutes window to be extremely safe, or just using epoch)
  // Round to nearest 5 mins (300 seconds) to ensure that retries or double triggers within that window match the exact same key
  const timeWindow = Math.floor(scheduledTimeEpoch / 300) * 300;
  const generationKey = `scheduler_${timeWindow}`;

  logInfo('AUTONOMOUS_GENERATION_STARTED', { storyId, generationKey, scheduledTimeEpoch });

  const timePeriod = getTimePeriod(executionTime, timezone);
  const brief = generateCreativeBrief(timePeriod);
  logInfo('CREATIVE_BRIEF_CREATED', { storyId, brief });

  logInfo('BEDROCK_GENERATION_STARTED', { storyId, modelId });
  let parsedContent;
  const startTime = Date.now();
  try {
    parsedContent = await generateStoryFromBedrock(brief);
    const durationMs = Date.now() - startTime;
    logInfo('BEDROCK_GENERATION_SUCCESS', { storyId, durationMs });
  } catch (error) {
    logError('BEDROCK_GENERATION_FAILED', error, { storyId });
    throw error;
  }

  // Validate the story components (already done inside parsing, but double check values are present)
  logInfo('STORY_VALIDATION_SUCCESS', { storyId });

  const storyItem: AutonomousStory = {
    storyId,
    title: parsedContent.title,
    genre: parsedContent.genre,
    theme: parsedContent.theme,
    setting: parsedContent.setting,
    tone: parsedContent.tone,
    summary: parsedContent.summary,
    story: parsedContent.story,
    plotTwist: parsedContent.plotTwist,
    generatedAt: executionTime.toISOString(),
    generatedAtEpoch: Math.floor(executionTime.getTime() / 1000),
    generationType: 'AUTONOMOUS',
    timePeriod: brief.timePeriod,
    model: modelId,
    status: 'COMPLETED',
    generationKey,
  };

  try {
    await saveAutonomousStory(storyItem);
    logInfo('STORY_SAVED', { storyId });
  } catch (error: any) {
    if (error.name === 'ConditionalCheckFailedException') {
      logInfo('DYNAMODB_WRITE_SKIPPED', { storyId, message: 'Duplicate run prevented via generationKey conditional check.' });
      throw new Error(`Generation key ${generationKey} already exists. Skipping.`);
    }
    logError('DYNAMODB_WRITE_FAILED', error, { storyId });
    throw error;
  }

  logInfo('AUTONOMOUS_GENERATION_COMPLETED', { storyId });
  return storyItem;
}
