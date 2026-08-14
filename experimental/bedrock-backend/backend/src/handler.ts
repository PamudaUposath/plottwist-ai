import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validateStoryRequest } from './validation.js';
import { generateStoryChapter } from './bedrock.js';
import { APIResponse } from './types.js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod || (event as unknown as { requestContext?: { http?: { method?: string } } })?.requestContext?.http?.method || 'POST';

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'CORS preflight OK' }),
    };
  }

  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST requests are supported.' },
      } as APIResponse),
    };
  }

  const validation = validateStoryRequest(event.body);

  if (!validation.isValid) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: { code: 'INVALID_REQUEST', message: validation.error },
      } as APIResponse),
    };
  }

  try {
    const storyData = await generateStoryChapter(validation.data);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        data: storyData,
      } as APIResponse),
    };
  } catch (error) {
    console.error('PlotTwist Bedrock Generation Error:', error);

    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: {
          code: 'GENERATION_FAILED',
          message: "We couldn't create that version of the story right now. Please try again.",
        },
      } as APIResponse),
    };
  }
};
