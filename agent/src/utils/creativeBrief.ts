import { TimePeriod } from './timePeriod.js';

export interface CreativeBrief {
  genre: string;
  setting: string;
  mainCharacter: string;
  secondaryCharacter: string;
  tone: string;
  conflict: string;
  theme: string;
  plotTwistDirection: string;
  timePeriod: TimePeriod;
}

const GENRE_POOL: Record<TimePeriod, string[]> = {
  MORNING: ['Adventure', 'Discovery', 'Exploration', 'Fantasy', 'Comedy'],
  AFTERNOON: ['Science Fiction', 'Action', 'Mystery', 'Comedy', 'Adventure'],
  EVENING: ['Fantasy', 'Drama', 'Mystery', 'Emotional', 'Adventure'],
  LATE_NIGHT: ['Horror', 'Cyberpunk', 'Supernatural', 'Strange fiction', 'Dark mystery', 'Mystery'],
};

const SETTING_POOL = [
  'An abandoned underground railway station',
  'A forgotten celestial temple floating in dense clouds',
  'A neon-drenched dark alleyway in a cyberpunk metropolis',
  'A quiet coastal lighthouse surrounded by heavy morning fog',
  'An old archive room containing locked historical records',
  'A remote solar-powered research outpost in the frozen tundra',
  'A bustling interstellar spaceport station',
  'An overgrown greenhouse in a derelict mansion',
];

const MAIN_CHARACTER_POOL = [
  'Mira, a curious student radio operator',
  'Aeliana, an apprentice spellscribe searching for relics',
  'Jax, a veteran space pilot with a secret ledger',
  'Clara, a sharp investigative journalist',
  'Leo, a map-making explorer with an old brass compass',
  'Elena, an archivist on the late-night shift',
  'Barnaby, an optimistic baker with magical cooking accidents',
];

const SECONDARY_CHARACTER_POOL = [
  'An unknown caller with a distorted voice',
  'A mysterious hooded traveller who knows too much',
  'A quiet holographic interface assistant that behaves strangely',
  'An eccentric street merchant selling clockwork key mechanisms',
  'A mechanical security drone that has bypassed its programming',
  'A friendly stray animal that guides the way',
];

const TONE_POOL = [
  'Atmospheric',
  'Suspenseful',
  'Humorous',
  'Mysterious',
  'Awe-inspiring',
  'Melancholic',
  'Tense',
];

const CONFLICT_POOL = [
  'A strange radio signal predicts events seconds before they happen',
  'An ancient artifact begins radiating a dark, warm energy',
  'A secure vault door is found unlocked from the inside',
  'The time beacon starts counting down to an unknown date',
  'All digital screens show a cryptic recurring countdown',
  'A legendary creature appears to be trying to communicate a warning',
];

const THEME_POOL = [
  'Trusting the unknown',
  'The cost of curiosity',
  'Technology vs Nature',
  'Echoes of the past',
  'Survival in isolation',
  'Unexpected bonds',
];

const TWIST_POOL = [
  'The mysterious caller is actually speaking from the past',
  'The artifact is not a weapon, but a protective shield',
  'The culprit is a projection designed to test the characters',
  'The countdown is not for destruction, but an automated arrival',
  'The guides are the ones who need rescue',
];

function getRandomElement<T>(arr: T[]): T {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export function generateCreativeBrief(timePeriod: TimePeriod): CreativeBrief {
  const possibleGenres = GENRE_POOL[timePeriod];
  const genre = getRandomElement(possibleGenres);
  const setting = getRandomElement(SETTING_POOL);
  const mainCharacter = getRandomElement(MAIN_CHARACTER_POOL);
  const secondaryCharacter = getRandomElement(SECONDARY_CHARACTER_POOL);
  const tone = getRandomElement(TONE_POOL);
  const conflict = getRandomElement(CONFLICT_POOL);
  const theme = getRandomElement(THEME_POOL);
  const plotTwistDirection = getRandomElement(TWIST_POOL);

  return {
    genre,
    setting,
    mainCharacter,
    secondaryCharacter,
    tone,
    conflict,
    theme,
    plotTwistDirection,
    timePeriod,
  };
}
