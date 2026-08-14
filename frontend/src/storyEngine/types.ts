import { PlotTwistLevel } from '../types/story';

export type GenreId = 
  | 'Fantasy'
  | 'Science Fiction'
  | 'Mystery'
  | 'Adventure'
  | 'Horror'
  | 'Comedy';

export type StoryFlags = Record<string, boolean>;

export interface StoryChoiceOption {
  id: string;
  text: string;
  flagToSet?: string;
  consequenceText?: string;
}

export interface EngineChapter {
  number: number;
  title: string;
  content: string;
  choices?: StoryChoiceOption[];
  selectedChoice?: StoryChoiceOption;
}

export interface StoryEngineConfig {
  genre: string;
  characterName?: string;
  characterDescription?: string;
  setting: string;
  totalChapters: number;
  plotTwistLevel?: PlotTwistLevel;
  seed?: number;
}

export interface GenreDefinition {
  id: GenreId;
  name: string;
  description: string;
  defaultCharacterName: string;
  defaultCharacterDescription: string;
  iconName: 'Crown' | 'Rocket' | 'Search' | 'Compass' | 'Ghost' | 'Laugh';
  defaultSettings: string[];
}

export interface OpeningTemplate {
  id: string;
  title: string;
  contentTemplate: (character: string, desc: string, setting: string) => string;
  initialChoices: [StoryChoiceOption, StoryChoiceOption, StoryChoiceOption];
}

export interface EventTemplate {
  id: string;
  title: string;
  contentTemplate: (character: string, desc: string, setting: string, flags: StoryFlags) => string;
  choices: [StoryChoiceOption, StoryChoiceOption, StoryChoiceOption];
  requiredFlags?: string[];
}

export interface TwistTemplate {
  id: string;
  title: string;
  intensity: PlotTwistLevel;
  contentTemplate: (character: string, setting: string, flags: StoryFlags) => string;
  choices: [StoryChoiceOption, StoryChoiceOption, StoryChoiceOption];
}

export interface EndingTemplate {
  id: string;
  title: string;
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  contentTemplate: (character: string, desc: string, setting: string, flags: StoryFlags) => string;
}

export interface StoryEngineOutput {
  seed: number;
  storyTitle: string;
  chapterTitle: string;
  content: string;
  choices?: StoryChoiceOption[];
  isFinal: boolean;
  flags: StoryFlags;
}
