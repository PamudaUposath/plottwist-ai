import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { AutonomousStory } from '../types/story.js';

let ddbDocClient: DynamoDBDocumentClient | null = null;

function getDdbClient(): DynamoDBDocumentClient {
  if (!ddbDocClient) {
    const region = process.env.AWS_REGION || 'us-east-1';
    const client = new DynamoDBClient({ region });
    ddbDocClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return ddbDocClient;
}

export async function saveAutonomousStory(story: AutonomousStory): Promise<void> {
  const tableName = process.env.STORIES_TABLE || 'plottwist-autopilot-stories';
  const client = getDdbClient();

  // Conditional write on generationKey to guarantee idempotency and avoid duplicates
  await client.send(
    new PutCommand({
      TableName: tableName,
      Item: story,
      ConditionExpression: 'attribute_not_exists(generationKey)',
    })
  );
}

export async function getStoryById(storyId: string): Promise<AutonomousStory | null> {
  const tableName = process.env.STORIES_TABLE || 'plottwist-autopilot-stories';
  const client = getDdbClient();

  const response = await client.send(
    new GetCommand({
      TableName: tableName,
      Key: { storyId },
    })
  );

  return (response.Item as AutonomousStory) || null;
}

export async function listAutonomousStories(limit = 10): Promise<AutonomousStory[]> {
  const tableName = process.env.STORIES_TABLE || 'plottwist-autopilot-stories';
  const client = getDdbClient();

  // Query using GSI1: generationType = 'AUTONOMOUS', sorted by generatedAt descending
  const response = await client.send(
    new QueryCommand({
      TableName: tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'generationType = :pk',
      ExpressionAttributeValues: {
        ':pk': 'AUTONOMOUS',
      },
      ScanIndexForward: false, // Descending order (newest first)
      Limit: limit,
    })
  );

  return (response.Items as AutonomousStory[]) || [];
}

export async function getTotalStoriesCount(): Promise<number> {
  const tableName = process.env.STORIES_TABLE || 'plottwist-autopilot-stories';
  const client = getDdbClient();

  // Query using GSI1 but select COUNT
  const response = await client.send(
    new QueryCommand({
      TableName: tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'generationType = :pk',
      ExpressionAttributeValues: {
        ':pk': 'AUTONOMOUS',
      },
      Select: 'COUNT',
    })
  );

  return response.Count || 0;
}
