import { SeededRandom } from './random';
import { getGenreDefinition } from './genres';
import { OPENINGS } from './openings';
import { EVENTS } from './events';
import { TWISTS } from './twists';
import { ENDINGS } from './endings';
import { applyChoiceFlags, ensureThreeChoices } from './branches';
import {
  EngineChapter,
  GenreId,
  StoryChoiceOption,
  StoryEngineConfig,
  StoryEngineOutput,
  StoryFlags,
} from './types';

export function generateStoryChapter(
  config: StoryEngineConfig,
  currentChapterNum: number = 1,
  _previousChapters: EngineChapter[] = [],
  selectedChoice?: StoryChoiceOption,
  existingFlags: StoryFlags = {}
): StoryEngineOutput {
  const seed = config.seed ?? SeededRandom.generateSeed();
  
  // Combine seed and chapter number for deterministic step generation
  const prng = new SeededRandom(`${seed}_ch${currentChapterNum}`);
  
  const genreDef = getGenreDefinition(config.genre);
  const genreId = genreDef.id as GenreId;

  const characterName =
    config.characterName && config.characterName.trim() !== ''
      ? config.characterName.trim()
      : genreDef.defaultCharacterName;

  const characterDescription =
    config.characterDescription && config.characterDescription.trim() !== ''
      ? config.characterDescription.trim()
      : genreDef.defaultCharacterDescription;

  const setting =
    config.setting && config.setting.trim() !== ''
      ? config.setting.trim()
      : prng.choice(genreDef.defaultSettings);

  const totalChapters = config.totalChapters || 5;

  // Update flags with latest choice
  let flags = applyChoiceFlags(existingFlags, selectedChoice);

  // Story Title (deterministic based on seed)
  const storyTitle = generateStoryTitle(genreId, setting, seed);

  // Determine chapter type based on current chapter vs total chapters
  const isFinalChapter = currentChapterNum >= totalChapters;
  const isTwistChapter = !isFinalChapter && currentChapterNum === totalChapters - 1;

  let chapterTitle = '';
  let content = '';
  let choices: [StoryChoiceOption, StoryChoiceOption, StoryChoiceOption] | undefined = undefined;

  if (currentChapterNum === 1) {
    // CHAPTER 1: Opening
    const genreOpenings = OPENINGS[genreId] || OPENINGS.Fantasy;
    const openingTemplate = prng.choice(genreOpenings);
    
    chapterTitle = `Chapter 1: ${openingTemplate.title}`;
    content = openingTemplate.contentTemplate(characterName, characterDescription, setting);
    choices = ensureThreeChoices(openingTemplate.initialChoices);
  } else if (isFinalChapter) {
    // FINAL CHAPTER: Ending
    const genreEndings = ENDINGS[genreId] || ENDINGS.Fantasy;
    
    // Find matching ending with satisfied flags, or fallback to default
    const validEnding = genreEndings.find((ending) => {
      if (!ending.requiredFlags) return false;
      return ending.requiredFlags.every((f) => flags[f]);
    }) || genreEndings[genreEndings.length - 1];

    chapterTitle = `Final Chapter: ${validEnding.title}`;
    content = validEnding.contentTemplate(characterName, characterDescription, setting, flags);
    choices = undefined;
  } else if (isTwistChapter) {
    // PRE-FINAL CHAPTER: Plot Twist
    const genreTwists = TWISTS[genreId] || TWISTS.Fantasy;
    const twistTemplate = prng.choice(genreTwists);

    chapterTitle = `Chapter ${currentChapterNum}: ${twistTemplate.title}`;
    content = twistTemplate.contentTemplate(characterName, setting, flags);
    choices = ensureThreeChoices(twistTemplate.choices);
  } else {
    // MIDDLE CHAPTER: Event / Discovery
    const genreEvents = EVENTS[genreId] || EVENTS.Fantasy;
    const eventTemplate = prng.choice(genreEvents);

    chapterTitle = `Chapter ${currentChapterNum}: ${eventTemplate.title}`;
    content = eventTemplate.contentTemplate(characterName, characterDescription, setting, flags);
    choices = ensureThreeChoices(eventTemplate.choices);
  }

  return {
    seed,
    storyTitle,
    chapterTitle,
    content,
    choices,
    isFinal: isFinalChapter,
    flags,
  };
}

function generateStoryTitle(genreId: GenreId, setting: string, seed: number): string {
  const prng = new SeededRandom(`title_${seed}`);
  
  const titleTemplates: Record<GenreId, string[]> = {
    Fantasy: [
      `Chronicles of ${setting}`,
      `The Awakening of ${setting}`,
      `The Archmage's Quest in ${setting}`,
      `Crest of ${setting}`,
    ],
    'Science Fiction': [
      `The Anomaly of ${setting}`,
      `Protocol ${setting}`,
      `Sub-Space Relay: ${setting}`,
      `The Echo of ${setting}`,
    ],
    Mystery: [
      `The Secret of ${setting}`,
      `Shadows Over ${setting}`,
      `The ${setting} Enigma`,
      `Cipher in ${setting}`,
    ],
    Adventure: [
      `Expedition to ${setting}`,
      `The Treasure of ${setting}`,
      `Lost Realm of ${setting}`,
      `Beyond ${setting}`,
    ],
    Horror: [
      `The Haunting of ${setting}`,
      `Whispers from ${setting}`,
      `Shadows of ${setting}`,
      `Curse of ${setting}`,
    ],
    Comedy: [
      `The Great Glitch at ${setting}`,
      `Misadventures in ${setting}`,
      `Chaos in ${setting}`,
      `The ${setting} Escapade`,
    ],
  };

  const templates = titleTemplates[genreId] || titleTemplates.Fantasy;
  return prng.choice(templates);
}
