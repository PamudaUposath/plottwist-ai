export type StoryChoice = {
  id: string;
  text: string;
};

export type StoryChapter = {
  number: number;
  title: string;
  content: string;
  choices?: StoryChoice[];
  selectedChoice?: StoryChoice;
};

export type PlotTwistLevel = 'Gentle' | 'Unexpected' | 'Chaotic';

export type StoryConfig = {
  genre: string;
  characterName?: string;
  characterDescription?: string;
  setting: string;
  totalChapters: number; // 3 or 5
  plotTwistLevel?: PlotTwistLevel;
};

export type StoryAction = 'start' | 'continue' | 'finish';

export type StoryRequestBody = {
  action: StoryAction;
  config: StoryConfig;
  storyTitle?: string;
  chapters?: StoryChapter[];
  selectedChoice?: StoryChoice;
  currentChapter?: number;
};

export type BedrockStoryOutput = {
  storyTitle: string;
  chapterTitle: string;
  content: string;
  choices: StoryChoice[];
  isFinal: boolean;
};

export type APIResponseSuccess = {
  success: true;
  data: BedrockStoryOutput;
};

export type APIResponseError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type APIResponse = APIResponseSuccess | APIResponseError;
