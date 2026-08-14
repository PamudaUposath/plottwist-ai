import { GenreId, OpeningTemplate } from './types';

export const OPENINGS: Record<GenreId, OpeningTemplate[]> = {
  Fantasy: [
    {
      id: 'fantasy_opening_1',
      title: 'The Unawakened Crest',
      contentTemplate: (hero, desc, setting) =>
        `The air in the ${setting} crackled with ancient resonance. ${hero}, ${desc}, stood before a towering archway covered in glowing runes that thrummed like a heartbeat.\n\nA heavy stone pedestal occupied the center of the sanctum, bearing a faintly luminescent crystal and a forgotten leather tome bound with iron straps. Deep within the shadow of the arch, a mysterious robed figure watched in silence, holding out a silver key.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Inspect the glowing crystal on the central pedestal',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You acquired a luminescent ancient crystal.',
        },
        {
          id: 'B',
          text: 'Accept the silver key offered by the robed stranger',
          flagToSet: 'trustedStranger',
          consequenceText: 'You forged an early alliance with the robed stranger.',
        },
        {
          id: 'C',
          text: 'Use stealth to slip past the stranger toward the inner vault',
          flagToSet: 'stealthApproach',
          consequenceText: 'You maintained complete stealth, keeping your presence hidden.',
        },
      ],
    },
    {
      id: 'fantasy_opening_2',
      title: 'Whispers of the Shrine',
      contentTemplate: (hero, desc, setting) =>
        `Thick twilight blanketed the ${setting}. ${hero}, ${desc}, navigated through tangled roots toward the ruins of a forgotten sanctuary.\n\nBeneath a fallen pillar, a hidden iron trapdoor shimmered with faint spellwork. Nearby, an injured elven scout clutched a glowing parchmentmap, while strange blue wisps hovered near the tree line, beckoning deeper into the gloom.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Force open the spell-sealed iron trapdoor',
          flagToSet: 'foundKey',
          consequenceText: 'You uncovered a hidden subterranean vault passage.',
        },
        {
          id: 'B',
          text: 'Tend to the injured scout and examine their glowing map',
          flagToSet: 'trustedStranger',
          consequenceText: 'You gained a valuable ally and an annotated map.',
        },
        {
          id: 'C',
          text: 'Follow the mysterious blue wisps into the dark forest',
          flagToSet: 'stealthApproach',
          consequenceText: 'You bypassed the obvious path to trail the mysterious wisps.',
        },
      ],
    },
  ],

  'Science Fiction': [
    {
      id: 'scifi_opening_1',
      title: 'Emergency Override',
      contentTemplate: (hero, desc, setting) =>
        `Warning alarms chimed softly across the primary concourse of ${setting}. ${hero}, ${desc}, arrived as emergency blast doors sealed the main transit hub.\n\nTo the left, a flickering terminal displayed decrypted command logs from an unknown vessel. Straight ahead, the main control room hummed with erratic power spikes. Nearby, an engineer sealed inside a decompression chamber pounded frantically on the viewport.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Bypass security locks to enter the central control room',
          flagToSet: 'controlRoomVisited',
          consequenceText: 'You gained direct access to primary station systems.',
        },
        {
          id: 'B',
          text: 'Decrypt the classified alien command logs at the terminal',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You downloaded classified sub-routine telemetry data.',
        },
        {
          id: 'C',
          text: 'Override the chamber valves to rescue the trapped engineer',
          flagToSet: 'trustedStranger',
          consequenceText: 'You saved the station engineer, earning their trust.',
        },
      ],
    },
    {
      id: 'scifi_opening_2',
      title: 'The Silent Transmission',
      contentTemplate: (hero, desc, setting) =>
        `Sensors registered zero organic signatures inside ${setting}, yet telemetry confirmed power was routing to the lower deck laboratories. ${hero}, ${desc}, stepped off the shuttle into heavy artificial gravity.\n\nAn abandoned maintenance drone sparkled with modified code, while an automated distress signal repeated in code from an airlock hatch. High above, an unmapped relay antenna hummed with energy.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Hack the modified drone to extract its navigation core',
          flagToSet: 'foundKey',
          consequenceText: 'You reprogrammed the maintenance drone as an override tool.',
        },
        {
          id: 'B',
          text: 'Unseal the lower airlock hatch to investigate the distress signal',
          flagToSet: 'controlRoomVisited',
          consequenceText: 'You opened the restricted lower deck corridor.',
        },
        {
          id: 'C',
          text: 'Reroute auxiliary power to scan the high-altitude antenna',
          flagToSet: 'stealthApproach',
          consequenceText: 'You scanned the antenna array without tripping sensor grids.',
        },
      ],
    },
  ],

  Mystery: [
    {
      id: 'mystery_opening_1',
      title: 'The Broken Cipher',
      contentTemplate: (hero, desc, setting) =>
        `Rain lashed the stained-glass windows of ${setting}. ${hero}, ${desc}, surveyed the scene where an antique wall safe stood wide open.\n\nOn the mahogany desk lay a half-burned letter containing half a cipher code. In the shadows by the fireplace stood a nervously fidgeting butler clutching a brass key. Outside, fresh muddy footprints vanished down a narrow service passage.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Examine the half-burned letter and decipher the hidden message',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You reconstructed the encrypted correspondence.',
        },
        {
          id: 'B',
          text: 'Question the butler about the brass key in his hands',
          flagToSet: 'trustedStranger',
          consequenceText: 'You secured testimony and a key to the estate wings.',
        },
        {
          id: 'C',
          text: 'Follow the muddy footprints down the dark service passage',
          flagToSet: 'foundKey',
          consequenceText: 'You tracked the intruder’s escape route before it washed away.',
        },
      ],
    },
    {
      id: 'mystery_opening_2',
      title: 'Midnight Intrigue',
      contentTemplate: (hero, desc, setting) =>
        `Clock chimes echoed through the empty corridors of ${setting}. ${hero}, ${desc}, arrived following an anonymous tip sent earlier that evening.\n\nA heavy oak door had been unlocked from the inside. Inside, a shattered glass display case held traces of rare luminescent chemical powder. A figure in a dark trench coat slipped behind the curtain at the far end of the hall.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Collect chemical powder samples from the shattered display',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You gathered vital chemical forensic evidence.',
        },
        {
          id: 'B',
          text: 'Confront the shadowy figure hiding behind the velvet curtain',
          flagToSet: 'trustedStranger',
          consequenceText: 'You intercepted the secretive informant.',
        },
        {
          id: 'C',
          text: 'Silently slip through the unlocked oak door to scout ahead',
          flagToSet: 'stealthApproach',
          consequenceText: 'You infiltrated the inner archive undetected.',
        },
      ],
    },
  ],

  Adventure: [
    {
      id: 'adventure_opening_1',
      title: 'The Golden Sunstone',
      contentTemplate: (hero, desc, setting) =>
        `Moisture dripped from ancient vines surrounding ${setting}. ${hero}, ${desc}, brushed aside foliage to reveal a grand stone gateway carved with sun icons.\n\nA pressure plate mechanism blocked the archway. To the right, a precarious rope bridge stretched over a roaring chasm. To the left, a hidden cave entrance emitted a warm, golden glow.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Disarm the stone pressure plate to open the main gateway',
          flagToSet: 'foundKey',
          consequenceText: 'You unlocked the direct path into the ancient complex.',
        },
        {
          id: 'B',
          text: 'Cross the fragile rope bridge to reach the lookout tower',
          flagToSet: 'stealthApproach',
          consequenceText: 'You took the high vantage route over the canyon.',
        },
        {
          id: 'C',
          text: 'Explore the glowing cave to locate the source of the light',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You retrieved an ancient solar artifact from the cave.',
        },
      ],
    },
    {
      id: 'adventure_opening_2',
      title: 'Map of the Deep',
      contentTemplate: (hero, desc, setting) =>
        `Sea spray swept across ${setting}. ${hero}, ${desc}, studied an antique brass astrolabe pointing directly toward a sea cave exposed by low tide.\n\nAn abandoned explorer camp showed signs of a sudden retreat, leaving behind an iron lockbox. Out on the breakers, a distress flare sparked from an anchored schooner.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Pick the lock on the abandoned explorer’s iron box',
          flagToSet: 'foundKey',
          consequenceText: 'You recovered an expedition journal and skeleton key.',
        },
        {
          id: 'B',
          text: 'Head into the sea cave before the incoming tide seals it',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You uncovered the subterranean cave relic early.',
        },
        {
          id: 'C',
          text: 'Row toward the schooner to investigate the distress flare',
          flagToSet: 'trustedStranger',
          consequenceText: 'You allied with the crew of the stranded vessel.',
        },
      ],
    },
  ],

  Horror: [
    {
      id: 'horror_opening_1',
      title: 'The Chilling Gloom',
      contentTemplate: (hero, desc, setting) =>
        `The temperature plummeted as ${hero}, ${desc}, stepped past the iron gates of ${setting}. Shadows stretched unnatural distances across the rotting floorboards.\n\nA weeping melody echoed from a music box in the grand parlor. A heavy basement trapdoor thumped rhythmically from below, while an old caretaker holding an oil lantern beckoned from the dark staircase.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Investigate the weeping melody coming from the parlor',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You discovered a haunted family heirloom.',
        },
        {
          id: 'B',
          text: 'Follow the nervous caretaker up the creaking staircase',
          flagToSet: 'trustedStranger',
          consequenceText: 'You aligned with the caretaker who knows the house secrets.',
        },
        {
          id: 'C',
          text: 'Unbolt the thumping heavy trapdoor into the basement',
          flagToSet: 'foundKey',
          consequenceText: 'You entered the cursed lower catacombs.',
        },
      ],
    },
    {
      id: 'horror_opening_2',
      title: 'Echoes in the Fog',
      contentTemplate: (hero, desc, setting) =>
        `Dense grey fog clung to ${setting}. ${hero}, ${desc}, heard the sound of scraping metal echoing from the darkness ahead.\n\nAn abandoned ambulance sat with its rear doors swinging wide. Near a shattered streetlight lay a trail of glowing crimson liquid leading toward an old mausoleum.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Search the interior of the abandoned ambulance',
          flagToSet: 'foundKey',
          consequenceText: 'You found medical supplies and an emergency keycard.',
        },
        {
          id: 'B',
          text: 'Follow the crimson trail toward the sealed mausoleum',
          flagToSet: 'stealthApproach',
          consequenceText: 'You tracked the entity while keeping to the shadows.',
        },
        {
          id: 'C',
          text: 'Call out into the fog to contact whoever is scraping metal',
          flagToSet: 'trustedStranger',
          consequenceText: 'You made contact with a desperate fellow survivor.',
        },
      ],
    },
  ],

  Comedy: [
    {
      id: 'comedy_opening_1',
      title: 'The Great Glitch',
      contentTemplate: (hero, desc, setting) =>
        `Everything that could go wrong in ${setting} had already started going delightfully sideways. ${hero}, ${desc}, dodged a levitating pie floating at head height.\n\nAn over-enthusiastic enchanted broom was furiously sweeping the ceiling. A bewildered goblin royal messenger clutched a glowing scroll that was turning into cheese, while a mysterious glowing lever vibrated on the wall.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Pull the vibrating mysterious wall lever without hesitation',
          flagToSet: 'controlRoomVisited',
          consequenceText: 'You pulled the lever and reversed gravity in the hallway.',
        },
        {
          id: 'B',
          text: 'Help the messenger save the glowing scroll from turning to cheese',
          flagToSet: 'trustedStranger',
          consequenceText: 'You befriended the goblin messenger and saved half a prophecy.',
        },
        {
          id: 'C',
          text: 'Attempt to ride the enchanted ceiling-sweeping broom',
          flagToSet: 'magicGlitched',
          consequenceText: 'You gained an erratic, flying broom transport.',
        },
      ],
    },
    {
      id: 'comedy_opening_2',
      title: 'Recipe for Chaos',
      contentTemplate: (hero, desc, setting) =>
        `A loud *POP* reverberated through ${setting}. ${hero}, ${desc}, blinked away purple smoke to reveal a glowing cauldron bubbling with sparkling lemonade.\n\nOn the counter sat a cookbook screaming advice in a high-pitched voice. A talking cat wearing a tiny top hat tapped its paw impatiently, while a shimmering portal sparkled inside the pantry.`,
      initialChoices: [
        {
          id: 'A',
          text: 'Consult the screaming cookbook for emergency spell instructions',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You learned an absurdly useful anti-curse recipe.',
        },
        {
          id: 'B',
          text: 'Negotiate passage with the top-hat cat',
          flagToSet: 'trustedStranger',
          consequenceText: 'You secured the cat as a snarky advisor.',
        },
        {
          id: 'C',
          text: 'Jump headfirst into the sparkling pantry portal',
          flagToSet: 'magicGlitched',
          consequenceText: 'You teleported straight into the heart of the chaos.',
        },
      ],
    },
  ],
};
