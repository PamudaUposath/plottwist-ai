import { describe, it, expect } from 'vitest';
import { validateStoryRequest } from '../src/validation.js';

describe('Backend Payload Validation', () => {
  it('rejects empty request body', () => {
    const result = validateStoryRequest(null);
    expect(result.isValid).toBe(false);
    if (!result.isValid) {
      expect(result.error).toContain('empty');
    }
  });

  it('rejects malformed JSON', () => {
    const result = validateStoryRequest('{ bad json ');
    expect(result.isValid).toBe(false);
    if (!result.isValid) {
      expect(result.error).toContain('Invalid JSON');
    }
  });

  it('validates a correct start action payload', () => {
    const payload = JSON.stringify({
      action: 'start',
      config: {
        genre: 'Science Fiction',
        characterName: 'Alex',
        characterDescription: 'A curious space explorer',
        setting: 'Abandoned Space Station',
        totalChapters: 5,
        plotTwistLevel: 'Unexpected',
      },
    });

    const result = validateStoryRequest(payload);
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(result.data.action).toBe('start');
      expect(result.data.config.genre).toBe('Science Fiction');
    }
  });

  it('rejects invalid totalChapters', () => {
    const payload = JSON.stringify({
      action: 'start',
      config: {
        genre: 'Fantasy',
        setting: 'Enchanted Forest',
        totalChapters: 10,
      },
    });

    const result = validateStoryRequest(payload);
    expect(result.isValid).toBe(false);
    if (!result.isValid) {
      expect(result.error).toContain('totalChapters');
    }
  });

  it('rejects continue action without selectedChoice', () => {
    const payload = JSON.stringify({
      action: 'continue',
      config: {
        genre: 'Mystery',
        setting: 'Haunted Mansion',
        totalChapters: 3,
      },
      currentChapter: 2,
    });

    const result = validateStoryRequest(payload);
    expect(result.isValid).toBe(false);
    if (!result.isValid) {
      expect(result.error).toContain('selectedChoice');
    }
  });

  it('accepts valid continue action with selectedChoice', () => {
    const payload = JSON.stringify({
      action: 'continue',
      config: {
        genre: 'Adventure',
        setting: 'Remote Island',
        totalChapters: 3,
      },
      currentChapter: 2,
      selectedChoice: {
        id: 'B',
        text: 'Explore the dark cave',
      },
    });

    const result = validateStoryRequest(payload);
    expect(result.isValid).toBe(true);
  });
});
