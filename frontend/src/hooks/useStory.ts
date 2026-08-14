import { useState, useEffect, useCallback, useRef } from 'react';
import { StoryChapter, StoryChoice, StoryConfig, StoryState, ViewStage } from '../types/story';
import { fetchStoryChapter, StoryApiRequest } from '../services/api';
import { loadSavedStory, saveStory, clearSavedStory } from '../utils/storage';

const LOADING_MESSAGES = [
  'Creating your world...',
  'Introducing your character...',
  'Hiding a few plot twists...',
  'Your adventure is almost ready...',
  'Weaving your decision into destiny...',
  'Crafting the next scene...',
];

export function useStory() {
  const [viewStage, setViewStage] = useState<ViewStage>('landing');
  const [storyState, setStoryState] = useState<StoryState | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState<number>(0);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [showNewStoryConfirm, setShowNewStoryConfirm] = useState<boolean>(false);

  // Store last failed request parameters for retry capability
  const lastRequestRef = useRef<StoryApiRequest | null>(null);

  // Load saved story from storage on mount
  useEffect(() => {
    const saved = loadSavedStory();
    if (saved && saved.chapters && saved.chapters.length > 0) {
      setStoryState(saved);
    }
  }, []);

  // Cycling loading messages interval
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isGenerating) {
      timer = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGenerating]);

  // Execute story chapter procedural generation
  const executeGeneration = useCallback(async (requestPayload: StoryApiRequest, currentStory: StoryState | null) => {
    setIsGenerating(true);
    setError(null);
    lastRequestRef.current = requestPayload;

    try {
      const responseData = await fetchStoryChapter(requestPayload);

      let updatedStory: StoryState;

      if (requestPayload.action === 'start') {
        const firstChapter: StoryChapter = {
          number: 1,
          title: responseData.chapterTitle,
          content: responseData.content,
          choices: responseData.choices,
        };

        updatedStory = {
          storyId: `story_${Date.now()}`,
          title: responseData.storyTitle,
          config: {
            ...requestPayload.config,
            seed: responseData.seed,
          },
          chapters: [firstChapter],
          completed: responseData.isFinal,
          seed: responseData.seed,
          flags: responseData.flags,
        };
      } else {
        if (!currentStory) {
          throw new Error('No active story found to update.');
        }

        const nextChapterNumber = (requestPayload.currentChapter || 1);
        const nextChapter: StoryChapter = {
          number: nextChapterNumber,
          title: responseData.chapterTitle,
          content: responseData.content,
          choices: responseData.choices,
        };

        const updatedChapters = [...currentStory.chapters];
        
        // If previous chapter exists, mark its selected choice
        if (updatedChapters.length > 0 && requestPayload.selectedChoice) {
          updatedChapters[updatedChapters.length - 1].selectedChoice = requestPayload.selectedChoice;
        }

        updatedChapters.push(nextChapter);

        updatedStory = {
          ...currentStory,
          title: responseData.storyTitle || currentStory.title,
          chapters: updatedChapters,
          completed: responseData.isFinal || nextChapterNumber >= requestPayload.config.totalChapters,
          seed: responseData.seed,
          flags: responseData.flags,
        };
      }

      setStoryState(updatedStory);
      saveStory(updatedStory);
      setViewStage('story');
    } catch (err: unknown) {
      console.error('Story generation error:', err);
      const msg = err instanceof Error ? err.message : "We couldn't generate the next chapter. Please try again.";
      setError({
        title: 'The story hit an unexpected twist.',
        message: msg,
      });
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const createStory = useCallback((config: StoryConfig) => {
    const requestPayload: StoryApiRequest = {
      action: 'start',
      config,
      seed: config.seed,
      flags: {},
    };
    executeGeneration(requestPayload, null);
  }, [executeGeneration]);

  const selectChoice = useCallback((choice: StoryChoice) => {
    if (!storyState || isGenerating) return;

    const currentChapterNum = storyState.chapters.length;
    const nextChapterNum = currentChapterNum + 1;
    const isFinalNext = nextChapterNum >= storyState.config.totalChapters;
    const action = isFinalNext ? 'finish' : 'continue';

    const requestPayload: StoryApiRequest = {
      action,
      config: storyState.config,
      storyTitle: storyState.title,
      chapters: storyState.chapters,
      selectedChoice: choice,
      currentChapter: nextChapterNum,
      seed: storyState.seed,
      flags: storyState.flags,
    };

    executeGeneration(requestPayload, storyState);
  }, [storyState, isGenerating, executeGeneration]);

  const retryLastAction = useCallback(() => {
    if (lastRequestRef.current) {
      executeGeneration(lastRequestRef.current, storyState);
    }
  }, [executeGeneration, storyState]);

  const requestNewStory = useCallback(() => {
    if (storyState && !storyState.completed && storyState.chapters.length > 0) {
      setShowNewStoryConfirm(true);
    } else {
      setViewStage('setup');
    }
  }, [storyState]);

  const confirmNewStory = useCallback(() => {
    setShowNewStoryConfirm(false);
    clearSavedStory();
    setStoryState(null);
    setError(null);
    setViewStage('setup');
  }, []);

  const cancelNewStory = useCallback(() => {
    setShowNewStoryConfirm(false);
  }, []);

  const restartSameConfig = useCallback(() => {
    if (storyState) {
      createStory(storyState.config);
    }
  }, [storyState, createStory]);

  const restoreSavedStory = useCallback(() => {
    if (storyState) {
      setViewStage(storyState.completed ? 'fullStory' : 'story');
    }
  }, [storyState]);

  return {
    viewStage,
    setViewStage,
    storyState,
    isGenerating,
    loadingMessage: LOADING_MESSAGES[loadingMsgIdx],
    error,
    setError,
    showNewStoryConfirm,
    createStory,
    selectChoice,
    retryLastAction,
    requestNewStory,
    confirmNewStory,
    cancelNewStory,
    restartSameConfig,
    restoreSavedStory,
  };
}
