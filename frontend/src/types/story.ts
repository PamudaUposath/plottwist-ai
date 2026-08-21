export type StoryChoice = {
  id: string;
  text: string;
  flagToSet?: string;
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
  seed?: number;
};

export type StoryState = {
  storyId: string;
  title: string;
  config: StoryConfig;
  chapters: StoryChapter[];
  completed: boolean;
  seed: number;
  flags: Record<string, boolean>;
};

export type ViewStage = 'landing' | 'setup' | 'story' | 'fullStory' | 'autopilot' | 'autopilotStory';

export type GenreOption = {
  id: string;
  name: string;
  description: string;
  iconName: 'Crown' | 'Rocket' | 'Search' | 'Compass' | 'Ghost' | 'Laugh';
};

export type SettingOption = {
  id: string;
  name: string;
  iconName?: string;
};
