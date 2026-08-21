import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTimePeriod, getTimePeriodForHour } from '../src/utils/timePeriod.js';
import { generateCreativeBrief } from '../src/utils/creativeBrief.js';
import { parseAndValidateModelResponse } from '../src/utils/responseParser.js';
import { buildStoryUserPrompt } from '../src/prompts/storyPrompt.js';

// Mock Bedrock client
vi.mock('@aws-sdk/client-bedrock-runtime', () => {
  return {
    BedrockRuntimeClient: vi.fn().mockImplementation(() => {
      return {
        send: vi.fn(),
      };
    }),
    ConverseCommand: vi.fn(),
  };
});

describe('Time Period Logic', () => {
  it('identifies correct periods based on hours', () => {
    expect(getTimePeriodForHour(5)).toBe('MORNING');
    expect(getTimePeriodForHour(11)).toBe('MORNING');
    expect(getTimePeriodForHour(12)).toBe('AFTERNOON');
    expect(getTimePeriodForHour(16)).toBe('AFTERNOON');
    expect(getTimePeriodForHour(17)).toBe('EVENING');
    expect(getTimePeriodForHour(21)).toBe('EVENING');
    expect(getTimePeriodForHour(22)).toBe('LATE_NIGHT');
    expect(getTimePeriodForHour(4)).toBe('LATE_NIGHT');
    expect(getTimePeriodForHour(0)).toBe('LATE_NIGHT');
  });

  it('correctly maps dates to timezone-specific hours', () => {
    // 2026-08-21T05:00:00Z is 10:30 AM in Asia/Colombo
    const date = new Date('2026-08-21T05:00:00Z');
    expect(getTimePeriod(date, 'Asia/Colombo')).toBe('MORNING');

    // 2026-08-21T18:00:00Z is 11:30 PM in Asia/Colombo
    const dateNight = new Date('2026-08-21T18:00:00Z');
    expect(getTimePeriod(dateNight, 'Asia/Colombo')).toBe('LATE_NIGHT');
  });
});

describe('Creative Brief Selection', () => {
  it('generates consistent and valid creative briefs', () => {
    const brief = generateCreativeBrief('MORNING');
    expect(brief.timePeriod).toBe('MORNING');
    expect(brief.genre).toBeDefined();
    expect(brief.setting).toBeDefined();
    expect(brief.tone).toBeDefined();
    expect(brief.theme).toBeDefined();
    expect(brief.plotTwistDirection).toBeDefined();
  });
});

describe('Bedrock Response Parsing and Validation', () => {
  it('extracts JSON objects from markdown fences', () => {
    const mockOutput = '```json\n{\n  "title": "A Test",\n  "genre": "Mystery",\n  "theme": "Hope",\n  "setting": "Old Train",\n  "summary": "Short desc",\n  "story": "Once upon a time there was an adventure...",\n  "plotTwist": "It was all a dream",\n  "tone": "Mysterious"\n}\n```';
    const parsed = parseAndValidateModelResponse(mockOutput);
    expect(parsed.title).toBe('A Test');
    expect(parsed.genre).toBe('Mystery');
    expect(parsed.story).toContain('Once upon');
  });

  it('throws validation error if any required field is missing or empty', () => {
    const malformed = '{\n  "title": "",\n  "genre": "Mystery"\n}';
    expect(() => parseAndValidateModelResponse(malformed)).toThrow();
  });
});
