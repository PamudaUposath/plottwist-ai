export interface AutonomousStory {
  storyId: string;
  title: string;
  genre: string;
  theme: string;
  setting: string;
  tone: string;
  summary: string;
  story: string;
  plotTwist: string;
  generatedAt: string;
  generatedAtEpoch: number;
  generationType: 'AUTONOMOUS';
  timePeriod: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'LATE_NIGHT';
  model: string;
  status: 'COMPLETED';
  generationKey: string;
}

export type APIResponseSuccess<T> = {
  success: true;
  data: T;
};

export type APIResponseError = {
  success: false;
  error: string;
};

export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;
