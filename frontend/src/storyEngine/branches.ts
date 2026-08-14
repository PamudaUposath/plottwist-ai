import { StoryChoiceOption, StoryFlags } from './types';

export function applyChoiceFlags(
  currentFlags: StoryFlags,
  selectedChoice?: StoryChoiceOption
): StoryFlags {
  const updatedFlags = { ...currentFlags };
  if (selectedChoice && selectedChoice.flagToSet) {
    updatedFlags[selectedChoice.flagToSet] = true;
  }
  return updatedFlags;
}

export function ensureThreeChoices(
  choices: StoryChoiceOption[]
): [StoryChoiceOption, StoryChoiceOption, StoryChoiceOption] {
  if (choices.length >= 3) {
    return [choices[0], choices[1], choices[2]];
  }

  const fallbackChoices: StoryChoiceOption[] = [
    {
      id: 'A',
      text: 'Investigate the area thoroughly for hidden clues',
      flagToSet: 'discoveredArtifact',
      consequenceText: 'You inspected the environment with keen detail.',
    },
    {
      id: 'B',
      text: 'Proceed cautiously while maintaining high alert',
      flagToSet: 'stealthApproach',
      consequenceText: 'You advanced carefully and stayed out of sight.',
    },
    {
      id: 'C',
      text: 'Rally your strength and push forward directly',
      flagToSet: 'disarmedTrap',
      consequenceText: 'You charged forward with decisive action.',
    },
  ];

  const result: StoryChoiceOption[] = [...choices];
  for (let i = result.length; i < 3; i++) {
    result.push({
      ...fallbackChoices[i],
      id: String.fromCharCode(65 + i),
    });
  }

  return [result[0], result[1], result[2]];
}
