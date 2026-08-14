import { describe, it, expect } from 'vitest';
import { parseAndValidateModelResponse, InvalidModelResponseError } from '../src/modelResponse.js';

describe('modelResponse Extractor & Validator', () => {
  it('parses a valid normal chapter response correctly', () => {
    const raw = JSON.stringify({
      storyTitle: 'The Silent Orbit',
      chapterTitle: 'The Signal',
      content: 'Mira stepped into the corridor.',
      choices: [
        { id: 'A', text: 'Investigate control room' },
        { id: 'B', text: 'Search for survivors' },
        { id: 'C', text: 'Contact base station' },
      ],
      isFinal: false,
    });

    const res = parseAndValidateModelResponse(raw);
    expect(res.storyTitle).toBe('The Silent Orbit');
    expect(res.chapterTitle).toBe('The Signal');
    expect(res.content).toBe('Mira stepped into the corridor.');
    expect(res.choices).toHaveLength(3);
    expect(res.isFinal).toBe(false);
  });

  it('parses a valid final chapter response correctly', () => {
    const raw = JSON.stringify({
      storyTitle: 'The Silent Orbit',
      chapterTitle: 'The Conclusion',
      content: 'Mira restored the orbital power core and survived.',
      choices: [],
      isFinal: true,
    });

    const res = parseAndValidateModelResponse(raw);
    expect(res.isFinal).toBe(true);
    expect(res.choices).toHaveLength(0);
  });

  it('strips ```json markdown blocks and extracts JSON object', () => {
    const raw = `\`\`\`json
{
  "storyTitle": "Fenced Story",
  "chapterTitle": "Chapter 1",
  "content": "Story content text.",
  "choices": [
    { "id": "A", "text": "Option A" },
    { "id": "B", "text": "Option B" },
    { "id": "C", "text": "Option C" }
  ],
  "isFinal": false
}
\`\`\``;

    const res = parseAndValidateModelResponse(raw);
    expect(res.storyTitle).toBe('Fenced Story');
    expect(res.choices).toHaveLength(3);
  });

  it('handles unexpected text before JSON', () => {
    const raw = `Here is the generated chapter JSON:
{
  "storyTitle": "Text Before JSON",
  "chapterTitle": "Chapter 2",
  "content": "Story content goes here.",
  "choices": [
    { "id": "A", "text": "Option A" },
    { "id": "B", "text": "Option B" },
    { "id": "C", "text": "Option C" }
  ],
  "isFinal": false
}`;

    const res = parseAndValidateModelResponse(raw);
    expect(res.storyTitle).toBe('Text Before JSON');
  });

  it('throws InvalidModelResponseError for empty Bedrock response', () => {
    expect(() => parseAndValidateModelResponse('')).toThrow(InvalidModelResponseError);
    expect(() => parseAndValidateModelResponse(null)).toThrow(InvalidModelResponseError);
  });

  it('throws InvalidModelResponseError for invalid non-JSON string', () => {
    expect(() => parseAndValidateModelResponse('Just some plain narrative without JSON')).toThrow(
      InvalidModelResponseError
    );
  });

  it('throws InvalidModelResponseError when missing content field', () => {
    const raw = JSON.stringify({
      storyTitle: 'Missing Content',
      chapterTitle: 'Chapter 1',
      choices: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
      ],
      isFinal: false,
    });

    expect(() => parseAndValidateModelResponse(raw)).toThrow(InvalidModelResponseError);
  });

  it('throws InvalidModelResponseError when non-final chapter has only two choices', () => {
    const raw = JSON.stringify({
      storyTitle: 'Two Choices Story',
      chapterTitle: 'Chapter 1',
      content: 'Some text',
      choices: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
      ],
      isFinal: false,
    });

    expect(() => parseAndValidateModelResponse(raw)).toThrow(InvalidModelResponseError);
  });

  it('throws InvalidModelResponseError when non-final chapter has four choices', () => {
    const raw = JSON.stringify({
      storyTitle: 'Four Choices Story',
      chapterTitle: 'Chapter 1',
      content: 'Some text',
      choices: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      isFinal: false,
    });

    expect(() => parseAndValidateModelResponse(raw)).toThrow(InvalidModelResponseError);
  });
});
