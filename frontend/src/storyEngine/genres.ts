import { GenreDefinition, GenreId } from './types';

export const GENRES: Record<GenreId, GenreDefinition> = {
  Fantasy: {
    id: 'Fantasy',
    name: 'Fantasy',
    description: 'Magic, ancient prophecies, and mythical beasts in realms unknown.',
    defaultCharacterName: 'Aeliana Sunweaver',
    defaultCharacterDescription: 'A young spellscribe with an unawakened ancient crest.',
    iconName: 'Crown',
    defaultSettings: [
      'Forgotten Celestial Citadel',
      'Whispering Emerald Forest',
      'Sunken Temple of Aethelgard',
      'Dragon’s Spine Mountain Pass',
    ],
  },
  'Science Fiction': {
    id: 'Science Fiction',
    name: 'Science Fiction',
    description: 'Futuristic technologies, deep space anomaly, and artificial intelligence.',
    defaultCharacterName: 'Commander Jax Vance',
    defaultCharacterDescription: 'A veteran pilot investigating silent deep-space relays.',
    iconName: 'Rocket',
    defaultSettings: [
      'Abandoned Orbital Station Helix-9',
      'Neon-Drenched Cyber City Delta',
      'Sub-Zero Subterranean Crater on Europa',
      'Derelict Quantum Research Vessel',
    ],
  },
  Mystery: {
    id: 'Mystery',
    name: 'Mystery',
    description: 'Shadowy clues, secretive motives, and high-stakes detective investigations.',
    defaultCharacterName: 'Detective Clara Vance',
    defaultCharacterDescription: 'A sharp analytical investigator who notices what everyone misses.',
    iconName: 'Search',
    defaultSettings: [
      'Fog-Bound Blackwood Manor',
      'Midnight Express Trans-Continental Train',
      'Grand Obsidian Museum of Antiquities',
      'Old Waterfront Lighthouse Precinct',
    ],
  },
  Adventure: {
    id: 'Adventure',
    name: 'Adventure',
    description: 'Uncharted wilderness, perilous traps, and lost historical treasures.',
    defaultCharacterName: 'Captain Leo Drake',
    defaultCharacterDescription: 'A daring explorer driven by curiosity and an old compass.',
    iconName: 'Compass',
    defaultSettings: [
      'Lost City of Gold in the Amazon',
      'Sunken Galleon in Coral Abyss',
      'Ancient Mayan Pyramid Ruins',
      'Storm-Swept Archipelago Island',
    ],
  },
  Horror: {
    id: 'Horror',
    name: 'Horror',
    description: 'Eerie shadows, psychological dread, and mysterious ancient entities.',
    defaultCharacterName: 'Elena Rostova',
    defaultCharacterDescription: 'An archivist whose night watch turns into a nightmare.',
    iconName: 'Ghost',
    defaultSettings: [
      'Abandoned Ravenscroft Asylum',
      'Subterranean Catacombs of Saint Jude',
      'Isolated Cabin in Blackwood Ridge',
      'Cursed Maritime Cargo Ship',
    ],
  },
  Comedy: {
    id: 'Comedy',
    name: 'Comedy',
    description: 'Bizarre coincidences, absurd magic glitches, and hilarious misunderstandings.',
    defaultCharacterName: 'Barnaby Pym',
    defaultCharacterDescription: 'An overly optimistic apprentice with terrible luck and great enthusiasm.',
    iconName: 'Laugh',
    defaultSettings: [
      'Royal Bakery of Mismanaged Magic',
      'Intergalactic Bureau of Minor Complaints',
      'Wizard Academy Kitchens',
      'Chaos-Infested Village Market',
    ],
  },
};

export function getGenreDefinition(genre: string): GenreDefinition {
  const matchedKey = Object.keys(GENRES).find(
    (g) => g.toLowerCase() === genre.toLowerCase()
  ) as GenreId;
  return GENRES[matchedKey] || GENRES.Fantasy;
}
