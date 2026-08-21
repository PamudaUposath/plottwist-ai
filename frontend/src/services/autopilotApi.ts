import { AutonomousStory } from '../../../agent/src/types/story';
import { AutopilotStatus } from '../types/autopilot';

const API_BASE_URL = import.meta.env.VITE_AUTOPILOT_API_URL || '';

export async function fetchStories(limit = 10): Promise<AutonomousStory[]> {
  const url = `${API_BASE_URL}/stories?limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch autonomous stories');
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch stories');
  }
  return result.data;
}

export async function fetchLatestStory(): Promise<AutonomousStory> {
  const url = `${API_BASE_URL}/stories/latest`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch latest story');
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch latest story');
  }
  return result.data;
}

export async function fetchStoryById(id: string): Promise<AutonomousStory> {
  const url = `${API_BASE_URL}/stories/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Story not found');
    }
    throw new Error('Failed to fetch story details');
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch story');
  }
  return result.data;
}

export async function fetchAgentStatus(): Promise<AutopilotStatus> {
  const url = `${API_BASE_URL}/agent/status`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch agent status');
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch agent status');
  }
  return result.data;
}
