import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { CreativeBrief } from '../utils/creativeBrief.js';
import { SYSTEM_PROMPT, buildStoryUserPrompt } from '../prompts/storyPrompt.js';
import { parseAndValidateModelResponse, BedrockParsedResponse } from '../utils/responseParser.js';

let bedrockClient: BedrockRuntimeClient | null = null;

function getBedrockClient(): BedrockRuntimeClient {
  if (!bedrockClient) {
    const region = process.env.AWS_REGION || 'us-east-1';
    bedrockClient = new BedrockRuntimeClient({ region });
  }
  return bedrockClient;
}

export async function generateStoryFromBedrock(
  brief: CreativeBrief
): Promise<BedrockParsedResponse> {
  const modelId = process.env.BEDROCK_MODEL_ID || 'us.amazon.nova-lite-v1:0';
  const client = getBedrockClient();
  const userPrompt = buildStoryUserPrompt(brief);

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
      maxTokens: 2000,
      temperature: 0.8,
      topP: 0.9,
    },
  });

  const response = await client.send(command);

  if (!response.output || !response.output.message || !response.output.message.content) {
    throw new Error('Received empty response payload from Bedrock.');
  }

  const responseText = response.output.message.content
    .map((item) => item.text || '')
    .join('')
    .trim();

  return parseAndValidateModelResponse(responseText);
}
