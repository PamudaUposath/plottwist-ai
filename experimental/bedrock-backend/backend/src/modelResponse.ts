import { BedrockStoryOutput } from './types.js';

export class InvalidModelResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidModelResponseError';
  }
}

export function parseAndValidateModelResponse(rawText: string | null | undefined): BedrockStoryOutput {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
    throw new InvalidModelResponseError('Received empty or invalid text response from Bedrock.');
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences if present (e.g. ```json ... ```)
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/```(?:json)?\s*/gi, '').replace(/\s*```/g, '');
  }

  // Extract JSON object substring between first '{' and last '}'
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'JSON parse error';
    throw new InvalidModelResponseError(`Bedrock output could not be parsed as valid JSON: ${errMsg}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new InvalidModelResponseError('Parsed Bedrock response is not a valid JSON object.');
  }

  const obj = parsed as Record<string, unknown>;

  // Required Field Checks
  if (typeof obj.chapterTitle !== 'string' || obj.chapterTitle.trim().length === 0) {
    throw new InvalidModelResponseError('Model response is missing a valid string chapterTitle.');
  }

  if (typeof obj.content !== 'string' || obj.content.trim().length === 0) {
    throw new InvalidModelResponseError('Model response is missing valid string content.');
  }

  if (typeof obj.isFinal !== 'boolean') {
    throw new InvalidModelResponseError('Model response is missing a boolean isFinal indicator.');
  }

  const storyTitle =
    typeof obj.storyTitle === 'string' && obj.storyTitle.trim().length > 0
      ? obj.storyTitle.trim()
      : 'An Unexpected Twist';

  const isFinal = obj.isFinal;
  const chapterTitle = obj.chapterTitle.trim();
  const content = obj.content.trim();

  // Final Chapter Validation Rule: Must have choices.length === 0 and isFinal === true
  if (isFinal) {
    const choicesArr = Array.isArray(obj.choices) ? obj.choices : [];
    if (choicesArr.length > 0) {
      // Clean choices to empty for final chapter
    }
    return {
      storyTitle,
      chapterTitle,
      content,
      choices: [],
      isFinal: true,
    };
  }

  // Non-Final Chapter Validation Rule: Must have exactly 3 valid choices
  if (!Array.isArray(obj.choices)) {
    throw new InvalidModelResponseError('Non-final chapter response is missing a choices array.');
  }

  const validChoices = obj.choices
    .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
    .map((c, idx) => ({
      id: typeof c.id === 'string' && c.id.trim() ? c.id.trim() : String.fromCharCode(65 + idx),
      text: typeof c.text === 'string' ? c.text.trim() : '',
    }))
    .filter((c) => c.text.length > 0);

  if (validChoices.length !== 3) {
    throw new InvalidModelResponseError(
      `Non-final chapter response must contain exactly 3 valid choices, received ${validChoices.length}.`
    );
  }

  return {
    storyTitle,
    chapterTitle,
    content,
    choices: validChoices,
    isFinal: false,
  };
}
