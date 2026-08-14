import { GenreId, TwistTemplate } from './types';

export const TWISTS: Record<GenreId, TwistTemplate[]> = {
  Fantasy: [
    {
      id: 'fantasy_twist_1',
      title: 'The Mirror of Truth',
      intensity: 'Unexpected',
      contentTemplate: (hero, setting, flags) => {
        let text = `As ${hero} reached the central altar of ${setting}, the air shivered with silver luminescence.\n\n`;
        if (flags.trustedStranger) {
          text += `The robed stranger steps forward, pulls off their hood, and reveals they are actually the legendary ancient Archmage, bound to test your worthiness!`;
        } else if (flags.discoveredArtifact) {
          text += `The luminescent crystal pulses rapidly, projecting a holographic vision revealing that ${setting} was built not to seal evil, but to protect the heart of the world from corruption!`;
        } else {
          text += `A massive ancient mirror materializes in mid-air, revealing that the true guardian of ${setting} is a magical reflection of your own inner strength!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Embrace the ancient power revealed in the vision',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You absorbed the ancient Archmage legacy power.',
        },
        {
          id: 'B',
          text: 'Channel the energy into a protective ward shield',
          flagToSet: 'twistShielded',
          consequenceText: 'You converted the twist magic into defensive wards.',
        },
        {
          id: 'C',
          text: 'Refuse the optical illusion and rely strictly on your own skill',
          flagToSet: 'twistRefused',
          consequenceText: 'You relied purely on mortal courage and resolve.',
        },
      ],
    },
  ],

  'Science Fiction': [
    {
      id: 'scifi_twist_1',
      title: 'The Paradox Core',
      intensity: 'Unexpected',
      contentTemplate: (_hero, setting, flags) => {
        let text = `Inside the deep processing vault of ${setting}, primary systems shuddered.\n\n`;
        if (flags.controlRoomVisited) {
          text += `Main override records decrypt! The emergency distress signal wasn't sent from an alien ship—it was sent from your own vessel back from 100 years in the future!`;
        } else if (flags.trustedStranger) {
          text += `The station engineer smiles softly, revealing that they are an advanced Synthetic Android assigned to safeguard your mission!`;
        } else {
          text += `Sensor arrays confirm that ${setting} isn't drifting in space—it is orbiting an unmapped temporal rift that alters local reality!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Sync your vessel telemetry with the temporal signal',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You aligned your navigational computers with future telemetry.',
        },
        {
          id: 'B',
          text: 'Establish a direct neural link with the station AI',
          flagToSet: 'twistShielded',
          consequenceText: 'You took direct neural command of station systems.',
        },
        {
          id: 'C',
          text: 'Initiate localized stasis locks to freeze the temporal anomaly',
          flagToSet: 'twistRefused',
          consequenceText: 'You contained the temporal anomaly safely.',
        },
      ],
    },
  ],

  Mystery: [
    {
      id: 'mystery_twist_1',
      title: 'The Double Agent',
      intensity: 'Unexpected',
      contentTemplate: (_hero, setting, flags) => {
        let text = `Lighting flashes across the windows of ${setting}.\n\n`;
        if (flags.discoveredArtifact) {
          text += `The chemical forensic sample matches the seal of the city magistrate! The victim staged their own disappearance to expose corruption at the highest level!`;
        } else if (flags.trustedStranger) {
          text += `The informant reveals their true badge—they are an undercover inspector working the same syndicate case from the inside!`;
        } else {
          text += `A hidden vault compartment pops open, revealing that the stolen heirlooms were planted to frame the true mastermind!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Team up with the undercover agent to trap the true culprit',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You formed a sting operation with the undercover inspector.',
        },
        {
          id: 'B',
          text: 'Secure the original evidence logs before anyone else arrives',
          flagToSet: 'twistShielded',
          consequenceText: 'You protected the crucial crime evidence.',
        },
        {
          id: 'C',
          text: 'Confront the corrupt magistrate directly at the city assembly',
          flagToSet: 'twistRefused',
          consequenceText: 'You exposed the magistrate publicly.',
        },
      ],
    },
  ],

  Adventure: [
    {
      id: 'adventure_twist_1',
      title: 'The Guardian Unmasked',
      intensity: 'Unexpected',
      contentTemplate: (_hero, setting, flags) => {
        let text = `Dust settles inside the central temple of ${setting}.\n\n`;
        if (flags.discoveredArtifact) {
          text += `The solar artifact slots into the wall, unlocking not a treasure vault, but a secret map chamber revealing a forgotten underwater continent!`;
        } else if (flags.foundKey) {
          text += `The ancient lock mechanism clicks, revealing that the ruin was built by your own ancestors centuries ago!`;
        } else {
          text += `The legendary treasure guardian kneels, recognizing your compass ring as the sacred symbol of the First Pathfinder!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Claim the Pathfinder mantle and activate the ancient map',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You claimed the legacy of the First Pathfinder.',
        },
        {
          id: 'B',
          text: 'Use the sun mechanism to seal the ruins against pillagers',
          flagToSet: 'twistShielded',
          consequenceText: 'You safeguarded the ancient sanctuary.',
        },
        {
          id: 'C',
          text: 'Chart the newly revealed subterranean passage to the coast',
          flagToSet: 'twistRefused',
          consequenceText: 'You charted an expedition route to the coast.',
        },
      ],
    },
  ],

  Horror: [
    {
      id: 'horror_twist_1',
      title: 'The Spectral Covenant',
      intensity: 'Unexpected',
      contentTemplate: (_hero, setting, flags) => {
        let text = `Cold fog pours through the stone archways of ${setting}.\n\n`;
        if (flags.discoveredArtifact) {
          text += `The eldritch tome whispers a hidden truth: the entity hauntings are trapped souls crying out for release from a binding curse!`;
        } else if (flags.trustedStranger) {
          text += `The caretaker steps between you and the shadow, revealing that their family has guarded the threshold for three generations to keep the curse contained!`;
        } else {
          text += `The spectral entity pauses, revealing it cannot cross silver lines, exposing its vulnerable soul nexus!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Perform the ritual of release to free the trapped spectral souls',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You released the haunting spirits to peace.',
        },
        {
          id: 'B',
          text: 'Banish the entity permanently using the silver mirror matrix',
          flagToSet: 'twistShielded',
          consequenceText: 'You permanently banished the spectral threat.',
        },
        {
          id: 'C',
          text: 'Seal the mausoleum doors forever to contain the darkness',
          flagToSet: 'twistRefused',
          consequenceText: 'You entombed the entity inside the mausoleum.',
        },
      ],
    },
  ],

  Comedy: [
    {
      id: 'comedy_twist_1',
      title: 'The Ultimate Absurdity',
      intensity: 'Unexpected',
      contentTemplate: (_hero, setting, flags) => {
        let text = `Fireworks detonate in slow motion across ${setting}.\n\n`;
        if (flags.magicGlitched) {
          text += `The spell glitch didn't ruin the ceremony—it actually unlocked the royal secret vault filled with infinite gold coins and free donuts!`;
        } else if (flags.trustedStranger) {
          text += `The top-hat cat clears its throat and announces it is actually the King who transformed himself to avoid paying tax bills!`;
        } else {
          text += `The screaming cookbook confesses it just wanted a starring role in a dramatic theater play!`;
        }
        return text;
      },
      choices: [
        {
          id: 'A',
          text: 'Crown the top-hat cat and host a kingdom-wide donut feast',
          flagToSet: 'twistEmbraced',
          consequenceText: 'You organized the grandest celebration in history.',
        },
        {
          id: 'B',
          text: 'Award the screaming cookbook a starring role in the Royal Theater',
          flagToSet: 'twistShielded',
          consequenceText: 'You made the cookbook an international theater star.',
        },
        {
          id: 'C',
          text: 'Use the magic bubbles to fly everyone home safely',
          flagToSet: 'twistRefused',
          consequenceText: 'You floated back home on sparkling magic bubbles.',
        },
      ],
    },
  ],
};
