import { StoryRequestBody } from './types.js';

export const ALLOWED_GENRES = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Adventure',
  'Horror',
  'Comedy',
];

export const ALLOWED_PLOT_TWIST_LEVELS = ['Gentle', 'Unexpected', 'Chaotic'];

export type ValidationResult =
  | { isValid: true; data: StoryRequestBody }
  | { isValid: false; error: string };

export function validateStoryRequest(rawBody: string | null): ValidationResult {
  if (!rawBody) {
    return { isValid: false, error: 'Request body is empty.' };
  }

  if (rawBody.length > 100000) {
    return { isValid: false, error: 'Payload size exceeds allowable limit (100KB).' };
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return { isValid: false, error: 'Invalid JSON payload.' };
  }

  if (typeof body !== 'object' || body === null) {
    return { isValid: false, error: 'Request payload must be a JSON object.' };
  }

  const req = body as Partial<StoryRequestBody>;

  // Action validation
  if (!req.action || !['start', 'continue', 'finish'].includes(req.action)) {
    return { isValid: false, error: "Field 'action' must be 'start', 'continue', or 'finish'." };
  }

  // Config validation
  if (!req.config || typeof req.config !== 'object') {
    return { isValid: false, error: "Field 'config' must be a valid object." };
  }

  const { genre, characterName, characterDescription, setting, totalChapters, plotTwistLevel } =
    req.config;

  if (!genre || typeof genre !== 'string' || genre.trim().length === 0 || genre.length > 50) {
    return { isValid: false, error: "Field 'config.genre' must be a non-empty string under 50 characters." };
  }

  if (!setting || typeof setting !== 'string' || setting.trim().length === 0 || setting.length > 120) {
    return { isValid: false, error: "Field 'config.setting' must be between 1 and 120 characters." };
  }

  if (characterName !== undefined && characterName !== null) {
    if (typeof characterName !== 'string' || characterName.length > 40) {
      return { isValid: false, error: "Field 'config.characterName' must be a string up to 40 characters." };
    }
  }

  if (characterDescription !== undefined && characterDescription !== null) {
    if (typeof characterDescription !== 'string' || characterDescription.length > 250) {
      return { isValid: false, error: "Field 'config.characterDescription' must be a string up to 250 characters." };
    }
  }

  if (totalChapters !== 3 && totalChapters !== 5) {
    return { isValid: false, error: "Field 'config.totalChapters' must be either 3 or 5." };
  }

  if (plotTwistLevel !== undefined && plotTwistLevel !== null) {
    if (typeof plotTwistLevel !== 'string' || !ALLOWED_PLOT_TWIST_LEVELS.includes(plotTwistLevel)) {
      return { isValid: false, error: "Field 'config.plotTwistLevel' must be 'Gentle', 'Unexpected', or 'Chaotic'." };
    }
  }

  // Action specific validation
  if (req.action === 'continue') {
    if (typeof req.currentChapter !== 'number' || req.currentChapter < 1 || req.currentChapter > totalChapters) {
      return { isValid: false, error: `Field 'currentChapter' must be a number between 1 and ${totalChapters}.` };
    }

    // For non-final chapters, selectedChoice is required
    const isFinalChapter = req.currentChapter >= totalChapters;
    if (!isFinalChapter) {
      if (!req.selectedChoice || typeof req.selectedChoice !== 'object' || !req.selectedChoice.id || !req.selectedChoice.text) {
        return { isValid: false, error: "Field 'selectedChoice' with 'id' and 'text' is required to continue." };
      }
      if (req.selectedChoice.text.length > 250) {
        return { isValid: false, error: "Field 'selectedChoice.text' cannot exceed 250 characters." };
      }
    }
  }

  return { isValid: true, data: req as StoryRequestBody };
}
