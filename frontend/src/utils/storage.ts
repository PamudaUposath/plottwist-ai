import { StoryState } from '../types/story';

const STORAGE_KEY = 'plottwist_story_v1';

export function loadSavedStory(): StoryState | null {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as StoryState;
  } catch {
    return null;
  }
}

export function saveStory(state: StoryState): void {
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('Failed to save story to browser storage:', err);
  }
}

export function clearSavedStory(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear story from browser storage:', err);
  }
}
