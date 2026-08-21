import { EventBridgeEvent } from 'aws-lambda';
import { runAutonomousGeneration } from '../services/storyAgent.js';
import { logError } from '../utils/logger.js';

interface ScheduledDetail {
  // Can contain scheduled event info depending on schema
}

export const handler = async (event: EventBridgeEvent<'Scheduled Event', ScheduledDetail>): Promise<void> => {
  try {
    const executionTime = new Date(event.time || new Date().toISOString());
    const epoch = Math.floor(executionTime.getTime() / 1000);
    await runAutonomousGeneration(executionTime, epoch);
  } catch (error) {
    logError('LAMBDA_HANDLER_EXECUTION_FAILED', error);
    // Rethrow to signal Lambda failure to AWS (for CloudWatch metrics & retries)
    throw error;
  }
};
