import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { listAutonomousStories, getStoryById, getTotalStoriesCount } from '../services/dynamodb.js';
import { APIResponse } from '../types/story.js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Content-Type': 'application/json',
};

function formatSuccess<T>(data: T): APIGatewayProxyResultV2 {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      data,
    } as APIResponse<T>),
  };
}

function formatError(statusCode: number, message: string): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: false,
      error: message,
    } as APIResponse<never>),
  };
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'CORS OK' }),
    };
  }

  try {
    console.log(`API request received. Method: ${method}, Path: ${path}, rawPath: ${event.rawPath}`);
    // Check if rawPath is defined (for HTTP API payload version 2.0)
    let requestPath = event.rawPath || path;
    
    // Strip environment stage prefix if present (e.g. /challenge/stories -> /stories)
    const stagePrefix = `/${process.env.AWS_STAGE || 'challenge'}`;
    if (requestPath.startsWith(stagePrefix)) {
      requestPath = requestPath.substring(stagePrefix.length);
    }
    if (requestPath.length === 0) {
      requestPath = '/';
    }
    // GET /health
    if (method === 'GET' && requestPath === '/health') {
      return formatSuccess({
        status: 'ok',
        service: 'PlotTwist Autopilot',
      });
    }

    // GET /stories/latest
    if (method === 'GET' && requestPath === '/stories/latest') {
      const stories = await listAutonomousStories(1);
      if (stories.length === 0) {
        return formatError(404, 'No stories found');
      }
      return formatSuccess(stories[0]);
    }

    // GET /stories
    if (method === 'GET' && requestPath === '/stories') {
      let limit = 10;
      if (event.queryStringParameters?.limit) {
        const parsedLimit = parseInt(event.queryStringParameters.limit, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          limit = Math.min(parsedLimit, 50); // Hard limit cap of 50
        }
      }
      const stories = await listAutonomousStories(limit);
      return formatSuccess(stories);
    }

    // GET /stories/{id}
    if (method === 'GET' && requestPath.startsWith('/stories/')) {
      const parts = requestPath.split('/');
      const id = parts[parts.length - 1];
      if (!id || id.trim().length === 0) {
        return formatError(400, 'Invalid story ID');
      }
      const story = await getStoryById(id);
      if (!story) {
        return formatError(404, 'Story not found');
      }
      return formatSuccess(story);
    }

    // GET /agent/status
    if (method === 'GET' && requestPath === '/agent/status') {
      const latestStories = await listAutonomousStories(1);
      const totalStories = await getTotalStoriesCount();
      const schedule = process.env.STORY_SCHEDULE || 'rate(3 hours)';

      return formatSuccess({
        status: 'ACTIVE',
        lastGeneratedAt: latestStories[0]?.generatedAt || null,
        totalAutonomousStories: totalStories,
        schedule,
      });
    }

    return formatError(404, `Not found: ${requestPath}`);
  } catch (error: any) {
    console.error('API Error:', error);
    return formatError(500, 'Internal Server Error');
  }
};
