import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { BedrockStoryOutput, StoryRequestBody } from './types.js';
import { SYSTEM_PROMPT, buildStoryUserPrompt } from './prompts.js';
import { parseAndValidateModelResponse, InvalidModelResponseError } from './modelResponse.js';

let bedrockClient: BedrockRuntimeClient | null = null;

function getBedrockClient(): BedrockRuntimeClient {
  if (!bedrockClient) {
    const region = process.env.AWS_REGION || 'us-east-1';
    bedrockClient = new BedrockRuntimeClient({ region });
  }
  return bedrockClient;
}

export async function generateStoryChapter(
  request: StoryRequestBody
): Promise<BedrockStoryOutput> {
  const modelId = process.env.BEDROCK_MODEL_ID || 'us.amazon.nova-lite-v1:0';
  const client = getBedrockClient();
  const userPrompt = buildStoryUserPrompt(request);

  const command = new ConverseCommand({
    modelId,
    system: [{ text: SYSTEM_PROMPT }],
    messages: [
      {
        role: 'user',
        content: [{ text: userPrompt }],
      },
    ],
    inferenceConfig: {
      maxTokens: 1200,
      temperature: 0.7,
      topP: 0.9,
    },
  });

  const response = await client.send(command);

  if (!response.output || !response.output.message || !response.output.message.content) {
    throw new InvalidModelResponseError('Received empty response payload from Bedrock.');
  }

  const responseText = response.output.message.content
    .map((item) => item.text || '')
    .join('')
    .trim();

  return parseAndValidateModelResponse(responseText);
}
