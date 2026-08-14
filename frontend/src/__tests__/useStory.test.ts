import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStory } from '../hooks/useStory';

describe('useStory Custom Hook', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('initializes with default landing view stage', () => {
    const { result } = renderHook(() => useStory());
    expect(result.current.viewStage).toBe('landing');
    expect(result.current.storyState).toBeNull();
    expect(result.current.isGenerating).toBe(false);
  });

  it('allows navigating between view stages', () => {
    const { result } = renderHook(() => useStory());
    act(() => {
      result.current.setViewStage('setup');
    });
    expect(result.current.viewStage).toBe('setup');
  });

  it('creates story and sets view stage to story', async () => {
    const { result } = renderHook(() => useStory());

    await act(async () => {
      result.current.createStory({
        genre: 'Science Fiction',
        setting: 'Abandoned Space Station',
        totalChapters: 5,
        seed: 12345,
      });
    });

    expect(result.current.viewStage).toBe('story');
    expect(result.current.storyState).not.toBeNull();
    expect(result.current.storyState?.chapters.length).toBe(1);
    expect(result.current.storyState?.config.genre).toBe('Science Fiction');
    expect(result.current.storyState?.seed).toBe(12345);
    expect(result.current.storyState?.chapters[0].choices?.length).toBe(3);
  });

  it('advances through choices all the way to Chapter 5', async () => {
    const { result } = renderHook(() => useStory());

    // Start 5-chapter story
    await act(async () => {
      result.current.createStory({
        genre: 'Science Fiction',
        setting: 'Abandoned Space Station',
        totalChapters: 5,
        seed: 99999,
      });
    });

    expect(result.current.storyState?.chapters.length).toBe(1);

    // Chapter 1 choice -> Chapter 2
    await act(async () => {
      const choice1 = result.current.storyState?.chapters[0].choices![0];
      if (choice1) result.current.selectChoice(choice1);
    });
    expect(result.current.storyState?.chapters.length).toBe(2);

    // Chapter 2 choice -> Chapter 3
    await act(async () => {
      const choice2 = result.current.storyState?.chapters[1].choices![1];
      if (choice2) result.current.selectChoice(choice2);
    });
    expect(result.current.storyState?.chapters.length).toBe(3);

    // Chapter 3 choice -> Chapter 4
    await act(async () => {
      const choice3 = result.current.storyState?.chapters[2].choices![0];
      if (choice3) result.current.selectChoice(choice3);
    });
    expect(result.current.storyState?.chapters.length).toBe(4);

    // Chapter 4 choice -> Chapter 5 (Final)
    await act(async () => {
      const choice4 = result.current.storyState?.chapters[3].choices![2];
      if (choice4) result.current.selectChoice(choice4);
    });
    expect(result.current.storyState?.chapters.length).toBe(5);
    expect(result.current.storyState?.completed).toBe(true);
    expect(result.current.storyState?.chapters[4].choices).toBeUndefined();
  });
});
