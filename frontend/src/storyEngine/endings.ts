import { EndingTemplate, GenreId } from './types';

export const ENDINGS: Record<GenreId, EndingTemplate[]> = {
  Fantasy: [
    {
      id: 'fantasy_ending_heroic',
      title: 'Dawn of the Celestial Archmage',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, desc, setting, flags) => {
        let details = flags.trustedStranger
          ? `Side by side with your trusted allies, ${hero} raised the ancient crest.`
          : flags.discoveredArtifact
          ? `With the ancient crystal blazing with sacred light, ${hero} unleashed the sanctum's true potential.`
          : `${hero} stood firm at the center of ${setting}.`;
        return `${details}\n\nThe corrupted magic dissolving into shimmering star-dust, light returned to ${setting}. The realm sang your name, honoring ${hero}—${desc}—as the true legendary savior whose choices forged a new age of harmony.`;
      },
    },
    {
      id: 'fantasy_ending_guardian',
      title: 'Shield of the Realm',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting, flags) => {
        let details = flags.stealthApproach
          ? `Having traversed ${setting} unseen, ${hero} locked the guardian wards securely.`
          : `${hero} channeled all defensive wards around ${setting}.`;
        return `${details}\n\nThe sanctuary doors sealed tight against all future dark influences. ${hero} took up silent watch over ${setting}, securing peace for generations to come.`;
      },
    },
    {
      id: 'fantasy_ending_default',
      title: 'Triumph of the Wanderer',
      contentTemplate: (hero, desc, setting) =>
        `Standing atop the high ramparts of ${setting}, ${hero} looked out across the horizon.\n\nEvery decision made along the perilous path had reshaped destiny. ${hero}—${desc}—walked forward into legend, ready for whatever adventure lay beyond the dawn.`,
    },
  ],

  'Science Fiction': [
    {
      id: 'scifi_ending_transcendent',
      title: 'Quantum Vanguard',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, _desc, setting, flags) => {
        let details = flags.controlRoomVisited
          ? `Having mastered the primary control systems of ${setting}, ${hero} harmonized the station's quantum array.`
          : flags.decodedSignal
          ? `With the decrypted signals guiding the core, ${hero} synchronized all subspace nodes.`
          : `${hero} engaged the temporal override.`;
        return `${details}\n\nA radiant pulse of clean energy surged across space lanes. ${setting} was transformed into a beacon of stellar exploration, with ${hero} at the helm of humanity's greatest breakthrough.`;
      },
    },
    {
      id: 'scifi_ending_sentinel',
      title: 'Aethelgard Aegis',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting) =>
        `Reinforced shields locked in place across ${setting}. ${hero} secured all sub-deck airlocks, neutralizing the anomaly.\n\nThe crew cheered as full life support stabilized, cementing ${hero}'s place as the supreme defender of deep space frontiers.`,
    },
    {
      id: 'scifi_ending_default',
      title: 'The Unbroken Voyage',
      contentTemplate: (hero, _desc, setting) =>
        `Thrust engines hummed smoothly as ${setting} returned to normal navigational alignment.\n\n${hero} engaged sub-light propulsion toward new uncharted stars, leaving a legacy of courage across the cosmos.`,
    },
  ],

  Mystery: [
    {
      id: 'mystery_ending_justice',
      title: 'The Mastermind Exposed',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, _desc, setting, flags) => {
        let details = flags.discoveredArtifact
          ? `Presenting the chemical evidence alongside documented ledgers, ${hero} left no room for doubt.`
          : flags.trustedStranger
          ? `Joining forces with the undercover agent, ${hero} unveiled the complete syndicate dossier.`
          : `${hero} presented the final piece of evidence inside ${setting}.`;
        return `${details}\n\nJustice prevailed swiftly. Headlines across the nation declared ${hero} as the brilliant sleuth who solved the impossible case of ${setting}.`;
      },
    },
    {
      id: 'mystery_ending_guardian',
      title: 'Keeper of Secrets',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting) =>
        `With evidence safely locked in the high-security vault of ${setting}, ${hero} prevented widespread panic while neutralizing the crime syndicate in silence.\n\nAnother case closed with flawless precision by ${hero}.`,
    },
    {
      id: 'mystery_ending_default',
      title: 'Case Closed',
      contentTemplate: (hero, _desc, setting) =>
        `Rain stopped outside ${setting} as morning light broke through the clouds.\n\n${hero} adjusted their collar, closed the case file, and stepped out onto the quiet city streets, ready for the next mystery.`,
    },
  ],

  Adventure: [
    {
      id: 'adventure_ending_legend',
      title: 'Pathfinder of Gold',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, _desc, setting, flags) => {
        let details = flags.foundKey
          ? `Using the ancient golden key, ${hero} unlocked the heart of the sunken temple.`
          : flags.discoveredArtifact
          ? `The sunstone artifact illuminated the lost treasures of ${setting}.`
          : `${hero} stepped into the golden treasure sanctuary of ${setting}.`;
        return `${details}\n\nExplorers around the globe would speak for centuries of ${hero}'s extraordinary expedition, marking the discovery of ${setting} as the greatest adventure of the era.`;
      },
    },
    {
      id: 'adventure_ending_protector',
      title: 'Guardian of Antiquity',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting) =>
        `The ancient traps resealed safely, protecting ${setting} from mercenaries and destruction.\n\n${hero} departed with detailed maps and an unyielding commitment to preserve history's wonders.`,
    },
    {
      id: 'adventure_ending_default',
      title: 'Into the Horizon',
      contentTemplate: (hero, _desc, setting) =>
        `With relic in hand and compass in pocket, ${hero} stood atop the ridge overlooking ${setting}.\n\nThe map was marked complete, but the true spirit of adventure would forever drive ${hero} to the next frontier.`,
    },
  ],

  Horror: [
    {
      id: 'horror_ending_redemption',
      title: 'Light Over Darkness',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, _desc, setting, flags) => {
        let details = flags.discoveredArtifact
          ? `Reciting the sacred banishment verses from the eldritch tome, ${hero} cleansed the ground.`
          : flags.trustedStranger
          ? `Standing side by side with the loyal caretaker, ${hero} severed the ancient curse.`
          : `${hero} raised the holy ward inside ${setting}.`;
        return `${details}\n\nThe choking shadows dissolved into warm sunlight. ${setting} was finally purified, and the spirits found eternal rest thanks to ${hero}'s fearless resolve.`;
      },
    },
    {
      id: 'horror_ending_sanctuary',
      title: 'The Sealed Gate',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting) =>
        `The heavy mausoleum doors slammed shut, bound by iron wards and silver seals.\n\n${hero} stepped away into the morning air, surviving the night and ensuring the nightmare inside ${setting} could never escape.`,
    },
    {
      id: 'horror_ending_default',
      title: 'Survivor of the Gloom',
      contentTemplate: (hero, _desc, setting) =>
        `Dawn broke over ${setting}, casting away the terrifying shadows of the night.\n\n${hero} took a deep breath of cold morning air—shaken, but victorious, having conquered the darkness.`,
    },
  ],

  Comedy: [
    {
      id: 'comedy_ending_glorious',
      title: 'The Grand Celebration',
      requiredFlags: ['twistEmbraced'],
      contentTemplate: (hero, desc, setting, flags) => {
        let details = flags.magicGlitched
          ? `Confetti rained from the sky as sparkling magic bubbles carried ${hero} across the ballroom.`
          : flags.trustedStranger
          ? `The cat king officially knighted ${hero} in front of a cheering crowd.`
          : `${hero} led the grand march through ${setting}.`;
        return `${details}\n\nIt was universally declared the most wonderfully ridiculous day in kingdom history! ${hero}—${desc}—was forever celebrated as the Supreme Champion of Fun!`;
      },
    },
    {
      id: 'comedy_ending_order',
      title: 'Peace and Pastries',
      requiredFlags: ['twistShielded'],
      contentTemplate: (hero, _desc, setting) =>
        `The screaming cookbook settled into a peaceful nap, and the grape soda fountain was successfully turned into a cozy hot tub.\n\n${hero} kicked back in ${setting} with a warm pastry, reflecting on a job hilariously well done.`,
    },
    {
      id: 'comedy_ending_default',
      title: 'Another Day, Another Glitch',
      contentTemplate: (hero, _desc, setting) =>
        `The dust settled, the floating pies landed safely on plates, and ${setting} returned to normal-ish conditions.\n\n${hero} tipped their hat and smiled—because in a world like this, the next hilarious twist was just around the corner!`,
    },
  ],
};
