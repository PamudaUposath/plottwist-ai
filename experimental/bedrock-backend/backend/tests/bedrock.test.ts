import { describe, it, expect, vi } from 'vitest';
import { generateStoryChapter } from '../src/bedrock.js';
import { StoryRequestBody } from '../src/types.js';

// Mock AWS SDK Bedrock Runtime client
vi.mock('@aws-sdk/client-bedrock-runtime', () => {
  return {
    BedrockRuntimeClient: vi.fn().mockImplementation(() => ({
      send: vi.fn().mockResolvedValue({
        output: {
          message: {
            content: [
              {
                text: JSON.stringify({
                  storyTitle: 'Mocked Bedrock Story',
                  chapterTitle: 'Chapter 1: The Outpost',
                  content: 'Alex stepped out into the freezing storm.',
                  choices: [
                    { id: 'A', text: 'Enter the bunker' },
                    { id: 'B', text: 'Check the rover' },
                    { id: 'C', text: 'Signal the mothership' },
                  ],
                  isFinal: false,
                }),
              },
            ],
          },
        },
      }),
    })),
    ConverseCommand: vi.fn(),
  };
});

describe('Bedrock Integration Module', () => {
  it('invokes Bedrock Converse API and returns parsed story chapter', async () => {
    const requestPayload: StoryRequestBody = {
      action: 'start',
      config: {
        genre: 'Science Fiction',
        characterName: 'Alex',
        setting: 'Frozen Outpost',
        totalChapters: 3,
      },
    };

    const result = await generateStoryChapter(requestPayload);
    expect(result.storyTitle).toBe('Mocked Bedrock Story');
    expect(result.chapterTitle).toBe('Chapter 1: The Outpost');
    expect(result.choices).toHaveLength(3);
    expect(result.isFinal).toBe(false);
  });
});
