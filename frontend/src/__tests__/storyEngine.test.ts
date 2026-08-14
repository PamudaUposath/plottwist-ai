import { describe, it, expect, beforeEach } from 'vitest';
import { generateStoryChapter } from '../storyEngine/generator';
import { SeededRandom } from '../storyEngine/random';
import { loadSavedStory, saveStory, clearSavedStory } from '../utils/storage';
import { StoryState } from '../types/story';

describe('Procedural Story Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('1. Seeded Randomness: generates identical output for identical seeds', () => {
    const seed = 123456789;
    const config = {
      genre: 'Fantasy',
      setting: 'Forgotten Citadel',
      totalChapters: 3,
      seed,
    };

    const run1 = generateStoryChapter(config, 1, [], undefined, {});
    const run2 = generateStoryChapter(config, 1, [], undefined, {});

    expect(run1.seed).toBe(seed);
    expect(run2.seed).toBe(seed);
    expect(run1.storyTitle).toBe(run2.storyTitle);
    expect(run1.chapterTitle).toBe(run2.chapterTitle);
    expect(run1.content).toBe(run2.content);
    expect(run1.choices).toEqual(run2.choices);
  });

  it('2. Seed Variation: different seeds generate noticeably different stories', () => {
    const config1 = {
      genre: 'Fantasy',
      setting: 'Forgotten Citadel',
      totalChapters: 3,
      seed: 11111,
    };
    const config2 = {
      genre: 'Fantasy',
      setting: 'Forgotten Citadel',
      totalChapters: 3,
      seed: 99999,
    };

    const story1 = generateStoryChapter(config1, 1);
    const story2 = generateStoryChapter(config2, 1);

    expect(story1.seed).not.toBe(story2.seed);
    // Story title or choices or chapter template differ by seed
    expect(story1.chapterTitle !== story2.chapterTitle || story1.storyTitle !== story2.storyTitle).toBe(true);
  });

  it('3. Choice Consequences: user choices set flags and influence later chapters', () => {
    const seed = 424242;
    const config = {
      genre: 'Science Fiction',
      setting: 'Orbital Station',
      totalChapters: 3,
      seed,
    };

    // Chapter 1
    const ch1 = generateStoryChapter(config, 1);
    expect(ch1.choices).toBeDefined();
    expect(ch1.choices?.length).toBe(3);

    const selectedChoice = ch1.choices![0]; // e.g. controlRoomVisited or discoveredArtifact
    expect(selectedChoice.flagToSet).toBeDefined();

    // Chapter 2 (Twist chapter for 3-chapter story)
    const ch2 = generateStoryChapter(config, 2, [], selectedChoice, ch1.flags);
    expect(ch2.flags[selectedChoice.flagToSet!]).toBe(true);

    // Final Chapter 3
    const selectedChoice2 = ch2.choices![0];
    const ch3 = generateStoryChapter(config, 3, [], selectedChoice2, ch2.flags);
    expect(ch3.flags.twistEmbraced || ch3.flags.twistShielded || ch3.flags.twistRefused || ch3.flags[selectedChoice.flagToSet!]).toBe(true);
  });

  it('4. Exactly Three Choices: every non-final chapter has exactly 3 choice options', () => {
    const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Adventure', 'Horror', 'Comedy'];
    
    genres.forEach((genre) => {
      const config = {
        genre,
        setting: 'Test Arena',
        totalChapters: 5,
        seed: 777,
      };

      // Non-final chapters 1 to 4
      for (let chNum = 1; chNum <= 4; chNum++) {
        const output = generateStoryChapter(config, chNum);
        expect(output.isFinal).toBe(false);
        expect(output.choices).toBeDefined();
        expect(output.choices?.length).toBe(3);
      }
    });
  });

  it('5. Chapter Progression: handles Quick Adventure (3) and Standard Adventure (5)', () => {
    // Quick Adventure (3 chapters)
    const configQuick = {
      genre: 'Mystery',
      setting: 'Blackwood Manor',
      totalChapters: 3,
      seed: 888,
    };

    const quickCh1 = generateStoryChapter(configQuick, 1);
    expect(quickCh1.isFinal).toBe(false);

    const quickCh2 = generateStoryChapter(configQuick, 2, [], quickCh1.choices![0], quickCh1.flags);
    expect(quickCh2.isFinal).toBe(false);

    const quickCh3 = generateStoryChapter(configQuick, 3, [], quickCh2.choices![0], quickCh2.flags);
    expect(quickCh3.isFinal).toBe(true);
    expect(quickCh3.choices).toBeUndefined();

    // Standard Adventure (5 chapters)
    const configStandard = {
      genre: 'Adventure',
      setting: 'Amazon Ruins',
      totalChapters: 5,
      seed: 999,
    };

    for (let ch = 1; ch <= 4; ch++) {
      const chapter = generateStoryChapter(configStandard, ch);
      expect(chapter.isFinal).toBe(false);
    }
    const finalStandard = generateStoryChapter(configStandard, 5);
    expect(finalStandard.isFinal).toBe(true);
    expect(finalStandard.choices).toBeUndefined();
  });

  it('6. Final Endings: final chapter contains meaningful resolution without choices', () => {
    const config = {
      genre: 'Horror',
      setting: 'Ravenscroft Asylum',
      totalChapters: 3,
      seed: 555,
    };

    const ch1 = generateStoryChapter(config, 1);
    const ch2 = generateStoryChapter(config, 2, [], ch1.choices![0], ch1.flags);
    const ch3 = generateStoryChapter(config, 3, [], ch2.choices![0], ch2.flags);

    expect(ch3.isFinal).toBe(true);
    expect(ch3.chapterTitle).toContain('Final Chapter');
    expect(ch3.content.length).toBeGreaterThan(100);
    expect(ch3.choices).toBeUndefined();
  });

  it('7. Persistence: saves and loads story state deterministically across storage', () => {
    const seed = SeededRandom.generateSeed();
    const mockStoryState: StoryState = {
      storyId: 'story_test_123',
      title: 'Chronicles of Forgotten Citadel',
      config: {
        genre: 'Fantasy',
        setting: 'Forgotten Citadel',
        totalChapters: 3,
        seed,
      },
      chapters: [
        {
          number: 1,
          title: 'Chapter 1: The Unawakened Crest',
          content: 'Opening content here...',
          choices: [
            { id: 'A', text: 'Inspect crystal', flagToSet: 'discoveredArtifact' },
            { id: 'B', text: 'Accept key', flagToSet: 'trustedStranger' },
            { id: 'C', text: 'Stealth move', flagToSet: 'stealthApproach' },
          ],
        },
      ],
      completed: false,
      seed,
      flags: { discoveredArtifact: true },
    };

    saveStory(mockStoryState);

    const loaded = loadSavedStory();
    expect(loaded).not.toBeNull();
    expect(loaded?.storyId).toBe(mockStoryState.storyId);
    expect(loaded?.seed).toBe(seed);
    expect(loaded?.flags.discoveredArtifact).toBe(true);
    expect(loaded?.chapters.length).toBe(1);

    clearSavedStory();
    expect(loadSavedStory()).toBeNull();
  });
});
