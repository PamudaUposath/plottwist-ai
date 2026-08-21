import { CreativeBrief } from '../utils/creativeBrief.js';

export const SYSTEM_PROMPT = `You are a professional creative fiction writer.
Your job is to generate a standalone, high-quality, engaging creative story suitable for general audiences.
The story should be detailed, descriptive, and match the parameters of the provided creative brief.
Target approximately 500-800 words.

STRICT RULES:
1. Return ONLY a valid JSON object matching the requested schema.
2. Do not output any introductory or concluding text, explanations, or code fences (e.g. do not wrap the JSON in \`\`\`json).
3. Do not include a "generatedAt" or "storyId" property.
4. Keep the output clean, safe, and free from graphic violence or explicit content.

REQUIRED JSON SCHEMA:
{
  "title": "string (A catchy title for the story)",
  "genre": "string (The genre from the brief)",
  "theme": "string (The core theme/topic)",
  "setting": "string (The main environment/setting)",
  "summary": "string (A 1-2 sentence hook/summary of the plot)",
  "story": "string (The full standalone creative story, approximately 500-800 words)",
  "plotTwist": "string (A description of the unexpected plot twist that occurs)",
  "tone": "string (The narrative tone from the brief)"
}`;

export function buildStoryUserPrompt(brief: CreativeBrief): string {
  return `Please generate a story based on this Creative Brief:
- Time Period of Day: ${brief.timePeriod}
- Genre: ${brief.genre}
- Setting: ${brief.setting}
- Main Character: ${brief.mainCharacter}
- Secondary Character: ${brief.secondaryCharacter}
- Tone: ${brief.tone}
- Conflict: ${brief.conflict}
- Theme: ${brief.theme}
- Plot Twist Direction: ${brief.plotTwistDirection}

Generate the JSON object exactly following the schema instructions. Make the story engaging and ensure the plot twist direction is integrated naturally near the climax of the story.`;
}
