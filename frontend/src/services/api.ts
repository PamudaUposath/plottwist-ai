import { StoryChapter, StoryChoice, StoryConfig } from '../types/story';
import { generateStoryChapter } from '../storyEngine/generator';
import { EngineChapter } from '../storyEngine/types';

export type StoryApiRequest = {
  action: 'start' | 'continue' | 'finish';
  config: StoryConfig;
  storyTitle?: string;
  chapters?: StoryChapter[];
  selectedChoice?: StoryChoice;
  currentChapter?: number;
  seed?: number;
  flags?: Record<string, boolean>;
};

export type StoryChapterResponse = {
  storyTitle: string;
  chapterTitle: string;
  content: string;
  choices?: StoryChoice[];
  isFinal: boolean;
  seed: number;
  flags: Record<string, boolean>;
};

export async function fetchStoryChapter(
  requestPayload: StoryApiRequest
): Promise<StoryChapterResponse> {
  // Artificial natural delay for smooth UI transition (skipped during unit testing)
  const isTest = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  if (!isTest) {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  const chapterNum = requestPayload.currentChapter || 1;
  const previousEngineChapters: EngineChapter[] = (requestPayload.chapters || []).map((ch) => ({
    number: ch.number,
    title: ch.title,
    content: ch.content,
    choices: ch.choices,
    selectedChoice: ch.selectedChoice,
  }));

  const output = generateStoryChapter(
    {
      genre: requestPayload.config.genre,
      characterName: requestPayload.config.characterName,
      characterDescription: requestPayload.config.characterDescription,
      setting: requestPayload.config.setting,
      totalChapters: requestPayload.config.totalChapters,
      plotTwistLevel: requestPayload.config.plotTwistLevel,
      seed: requestPayload.seed ?? requestPayload.config.seed,
    },
    chapterNum,
    previousEngineChapters,
    requestPayload.selectedChoice,
    requestPayload.flags || {}
  );

  return {
    storyTitle: output.storyTitle,
    chapterTitle: output.chapterTitle,
    content: output.content,
    choices: output.choices,
    isFinal: output.isFinal,
    seed: output.seed,
    flags: output.flags,
  };
}
