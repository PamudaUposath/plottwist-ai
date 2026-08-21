export interface BedrockParsedResponse {
  title: string;
  genre: string;
  theme: string;
  setting: string;
  summary: string;
  story: string;
  plotTwist: string;
  tone: string;
}

export class InvalidModelResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidModelResponseError';
  }
}

export function parseAndValidateModelResponse(rawText: string | null | undefined): BedrockParsedResponse {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
    throw new InvalidModelResponseError('Received empty or invalid text response from Bedrock.');
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences if present
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
  } catch (err: any) {
    throw new InvalidModelResponseError(`Bedrock output could not be parsed as valid JSON: ${err.message}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new InvalidModelResponseError('Parsed Bedrock response is not a valid JSON object.');
  }

  const obj = parsed as Record<string, unknown>;

  const requiredFields = ['title', 'genre', 'theme', 'setting', 'summary', 'story', 'plotTwist', 'tone'];
  for (const field of requiredFields) {
    if (typeof obj[field] !== 'string' || obj[field].trim().length === 0) {
      throw new InvalidModelResponseError(`Model response is missing a valid string field: "${field}".`);
    }
  }

  return {
    title: (obj.title as string).trim(),
    genre: (obj.genre as string).trim(),
    theme: (obj.theme as string).trim(),
    setting: (obj.setting as string).trim(),
    summary: (obj.summary as string).trim(),
    story: (obj.story as string).trim(),
    plotTwist: (obj.plotTwist as string).trim(),
    tone: (obj.tone as string).trim(),
  };
}
