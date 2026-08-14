import { EventTemplate, GenreId } from './types';

export const EVENTS: Record<GenreId, EventTemplate[]> = {
  Fantasy: [
    {
      id: 'fantasy_event_1',
      title: 'The Whispering Sanctum',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.discoveredArtifact
          ? `With the luminescent crystal glowing in ${hero}’s hands, the ambient magical fields in ${setting} began to hum.`
          : flags.trustedStranger
          ? `Guided by the silver key from the stranger, ${hero} navigated deep into ${setting}.`
          : `Proceeding carefully through ${setting}, ${hero} crossed an expansive vaulted chamber.`;
        return `${prefix}\n\nBefore you lies the Hall of Echoes. Ancient statues line the gallery, their stone eyes following your movement. A massive locked obsidian door guards the central inner sanctum, while an ornate spell altar shimmers on a raised dais. To the right, a dark staircase descends into echoing caverns.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Channel your energy into the spell altar on the raised dais',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You disarmed the guardian ward on the inner chamber.',
        },
        {
          id: 'B',
          text: 'Use your items to unlock the obsidian vault door',
          flagToSet: 'foundKey',
          consequenceText: 'You gained direct entry into the high sanctum.',
        },
        {
          id: 'C',
          text: 'Descend the dark staircase into the subterranean caverns',
          flagToSet: 'stealthApproach',
          consequenceText: 'You explored the hidden lower subterranean levels.',
        },
      ],
    },
    {
      id: 'fantasy_event_2',
      title: 'Trial of the Archmages',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.foundKey
          ? `Having unlocked the subterranean vault entrance, ${hero} entered the Trial Chamber.`
          : flags.stealthApproach
          ? `Slipping unseen past the outer sentinels of ${setting}, ${hero} reached the Trial Chamber.`
          : `${hero} pushed forward into the heart of ${setting}.`;
        return `${prefix}\n\nThree elemental braziers ignite with blue, gold, and crimson flame. A phantom guardian manifests, demanding proof of wisdom before allowing passage to the core power realm.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Offer the blue flame a portion of your magical resonance',
          flagToSet: 'decodedSignal',
          consequenceText: 'You absorbed the ancient elemental insight.',
        },
        {
          id: 'B',
          text: 'Challenge the phantom guardian in direct magical combat',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You defeated the phantom guardian by force.',
        },
        {
          id: 'C',
          text: 'Decipher the elven runes etched around the crimson brazier',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You solved the trial cipher using old lore.',
        },
      ],
    },
  ],

  'Science Fiction': [
    {
      id: 'scifi_event_1',
      title: 'Sub-Deck Anomaly',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.controlRoomVisited
          ? `With control room telemetry active, ${hero} tracked the power drain directly into ${setting}’s core processing node.`
          : flags.trustedStranger
          ? `Accompanied by the rescued engineer, ${hero} reached the central conduit array.`
          : `${hero} made their way down into the maintenance decks of ${setting}.`;
        return `${prefix}\n\nA massive quantum reactor pulses irregularly behind reinforced blast glass. System diagnostics report corrupted AI protocols overriding environmental controls. An unencrypted console blinks near the coolant pipes.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Manual override: vent coolant lines to stabilize the reactor',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You stabilized core reactor temperatures.',
        },
        {
          id: 'B',
          text: 'Interface directly with the AI core to purge corrupted data',
          flagToSet: 'decodedSignal',
          consequenceText: 'You cleansed the core AI routines.',
        },
        {
          id: 'C',
          text: 'Reroute auxiliary power through emergency conduits',
          flagToSet: 'foundKey',
          consequenceText: 'You bypassed corrupt AI controls completely.',
        },
      ],
    },
    {
      id: 'scifi_event_2',
      title: 'Signal Intercept',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.discoveredArtifact
          ? `Armed with the decrypted telemetry, ${hero} pinpointed the origin of the anomalous signal.`
          : flags.stealthApproach
          ? `Moving quietly through unlit corridors of ${setting}, ${hero} avoided automated security sweeps.`
          : `${hero} reached the main communications hub of ${setting}.`;
        return `${prefix}\n\nHolographic displays flicker with real-time mapping of an approaching unknown craft. High-frequency transmissions flood the frequencies. A manual transmission lever stands ready beside the dish controls.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Broadcast a broad spectrum peace frequency signal',
          flagToSet: 'trustedStranger',
          consequenceText: 'You opened communication lines with the mystery craft.',
        },
        {
          id: 'B',
          text: 'Raise emergency defensive shielding around the station',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You reinforced station hull defenses against impact.',
        },
        {
          id: 'C',
          text: 'Trace the signal source to identify the secret sender',
          flagToSet: 'decodedSignal',
          consequenceText: 'You unmasked the origin coordinates of the transmission.',
        },
      ],
    },
  ],

  Mystery: [
    {
      id: 'mystery_event_1',
      title: 'The Hidden Study',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.discoveredArtifact
          ? `Using the cipher recovered from the burned letter, ${hero} unlocked a hidden bookcase door inside ${setting}.`
          : flags.trustedStranger
          ? `The butler’s brass key unlocked the private library wing of ${setting} for ${hero}.`
          : `${hero} investigated the secluded study rooms of ${setting}.`;
        return `${prefix}\n\nBehind a revolving bookcase lies a secret study lit by candlelight. On a leather chair rests a locked iron cashbox. A ledger open on the desk lists suspicious financial transfers to an unknown shadowy syndicate.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Use lockpicks to open the mysterious iron cashbox',
          flagToSet: 'foundKey',
          consequenceText: 'You uncovered incriminating syndicate documents.',
        },
        {
          id: 'B',
          text: 'Photograph the open ledger pages for formal evidence',
          flagToSet: 'decodedSignal',
          consequenceText: 'You secured documented proof of the syndicate conspiracy.',
        },
        {
          id: 'C',
          text: 'Search behind the oil painting hanging above the desk',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You located a secret vault dial behind the painting.',
        },
      ],
    },
    {
      id: 'mystery_event_2',
      title: 'The Shadow Confrontation',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.stealthApproach
          ? `Tailoring your footsteps to match the storm, ${hero} cornered the suspect in ${setting}.`
          : `${hero} pursued the lead deep into the lower quarters of ${setting}.`;
        return `${prefix}\n\nA masked figure stands beside an open window, holding a leather briefcase tightly. Wind howls through the frame. The figure pauses, offering a quiet bargain in exchange for your silence.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Demand the briefcase and refuse any negotiation',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You disarmed the suspect and seized the evidence.',
        },
        {
          id: 'B',
          text: 'Listen to the suspect’s explanation before taking action',
          flagToSet: 'trustedStranger',
          consequenceText: 'You uncovered a surprising secondary conspiracy.',
        },
        {
          id: 'C',
          text: 'Block the exit door to prevent escape',
          flagToSet: 'foundKey',
          consequenceText: 'You trapped the suspect inside the room.',
        },
      ],
    },
  ],

  Adventure: [
    {
      id: 'adventure_event_1',
      title: 'The Flooded Grotto',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.discoveredArtifact
          ? `Guided by the golden solar artifact, ${hero} illuminated the cavernous depths of ${setting}.`
          : flags.foundKey
          ? `Unlocking the iron gate allowed ${hero} swift access to the central grotto.`
          : `${hero} pressed forward into the interior of ${setting}.`;
        return `${prefix}\n\nWater rushes through an ancient carved subterranean waterway. Stone stepping pillars stretch across a churning pool filled with ancient carved totems. On the far bank sits a pristine golden sarcophagus.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Leap across the wet stone pillars to reach the sarcophagus',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You acrobatically crossed the treacherous pool.',
        },
        {
          id: 'B',
          text: 'Divert the water flow using ancient sluice levers',
          flagToSet: 'controlRoomVisited',
          consequenceText: 'You drained the pool safely using ancient engineering.',
        },
        {
          id: 'C',
          text: 'Inspect the carved totems for hidden trap mechanisms',
          flagToSet: 'decodedSignal',
          consequenceText: 'You disarmed the hidden darts built into the totems.',
        },
      ],
    },
    {
      id: 'adventure_event_2',
      title: 'Chamber of Trials',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.trustedStranger
          ? `Working alongside your expedition companion, ${hero} entered the grand hall of ${setting}.`
          : `${hero} reached the grand inner hall of ${setting}.`;
        return `${prefix}\n\nA massive stone balance scale rests before a closed granite door. Weight stones inscribed with glyphs lie scattered across the mosaic floor. Dust devils swirl as the room seals itself.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Balance the weights based on the sun symbol glyphs',
          flagToSet: 'decodedSignal',
          consequenceText: 'You solved the balance puzzle perfectly.',
        },
        {
          id: 'B',
          text: 'Use your climbing gear to scale the granite door arch',
          flagToSet: 'foundKey',
          consequenceText: 'You bypassed the floor trap by climbing.',
        },
        {
          id: 'C',
          text: 'Search the perimeter walls for a manual override switch',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You triggered the concealed emergency release.',
        },
      ],
    },
  ],

  Horror: [
    {
      id: 'horror_event_1',
      title: 'The Ritual Chamber',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.foundKey
          ? `Unlocking the lower catacombs gate, ${hero} stumbled into a hidden subterranean chapel in ${setting}.`
          : flags.trustedStranger
          ? `Following the caretaker’s warnings, ${hero} discovered a sealed sanctuary in ${setting}.`
          : `${hero} descended further into the oppressive darkness of ${setting}.`;
        return `${prefix}\n\nBlack candles burn with motionless green flames around a stone altar carved with eldritch runes. Chanted whispers echo from the stone walls without any visible source. An unholy tome floats inches above the altar.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Disrupt the candle circle to break the lingering ritual',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You severed the dark ritual aura.',
        },
        {
          id: 'B',
          text: 'Seize the floating unholy tome to study its banishment spells',
          flagToSet: 'discoveredArtifact',
          consequenceText: 'You claimed the eldritch tome of warding.',
        },
        {
          id: 'C',
          text: 'Recite protective prayers to ward off the haunting whispers',
          flagToSet: 'decodedSignal',
          consequenceText: 'You shielded your mind from spectral corruption.',
        },
      ],
    },
    {
      id: 'horror_event_2',
      title: 'The Shadow Stalker',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.stealthApproach
          ? `Keeping quietly in the shadow corners of ${setting}, ${hero} observed a towering spectral shape.`
          : `${hero} felt a sudden freezing breeze envelop the hall of ${setting}.`;
        return `${prefix}\n\nA grotesque shadow entity glides across the doorway, blocking your only immediate escape route. Its red eyes burn with ancient malice. Beside you, an ancient silver mirror hangs covered in cloth.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Uncover the silver mirror to reflect the shadow’s gaze',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You banished the entity with silver reflection light.',
        },
        {
          id: 'B',
          text: 'Use holy salt to create a protective barrier ring',
          flagToSet: 'foundKey',
          consequenceText: 'You built a sanctuary circle holding back the darkness.',
        },
        {
          id: 'C',
          text: 'Sprint past the entity into the secondary chapel door',
          flagToSet: 'stealthApproach',
          consequenceText: 'You narrowly outran the entity into the inner hall.',
        },
      ],
    },
  ],

  Comedy: [
    {
      id: 'comedy_event_1',
      title: 'The Spell Gone Wrong',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.magicGlitched
          ? `Riding the ceiling broom through ${setting}, ${hero} crash-landed right into the High Wizard’s private pantry.`
          : flags.trustedStranger
          ? `Accompanied by your snarky cat ally, ${hero} entered the chaotic core of ${setting}.`
          : `${hero} wandered deeper into the madness of ${setting}.`;
        return `${prefix}\n\nA giant frog wearing a royal crown is currently arguing with a self-knitting sweater over who gets to govern the kingdom. Meanwhile, a fountain of sparkling grape soda is rapidly filling the room!`;
      },
      choices: [
        {
          id: 'A',
          text: 'Crank the emergency soda fountain shut-off valve',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You plugged the grape soda tsunami.',
        },
        {
          id: 'B',
          text: 'Appoint the frog as official Prime Minister to settle the debate',
          flagToSet: 'trustedStranger',
          consequenceText: 'You forged a hilarious political compromise.',
        },
        {
          id: 'C',
          text: 'Cast a wild reversal spell from your pocket scroll',
          flagToSet: 'magicGlitched',
          consequenceText: 'You turned all the soda into harmless bubbles.',
        },
      ],
    },
    {
      id: 'comedy_event_2',
      title: 'The Banquet Brawl',
      contentTemplate: (hero, _desc, setting, flags) => {
        let prefix = flags.controlRoomVisited
          ? `Gravity in ${setting} flickered back on just in time for ${hero} to drop onto a velvet banquet table.`
          : `${hero} tumbled into the main hall of ${setting}.`;
        return `${prefix}\n\nA legendary food fight is underway between rival wizard factions! Flying pies, enchanted gelatin cubes, and soaring turkey legs fill the air with delicious peril.`;
      },
      choices: [
        {
          id: 'A',
          text: 'Use a silver serving tray as a shield against flying pies',
          flagToSet: 'disarmedTrap',
          consequenceText: 'You masterfully deflected all incoming desserts.',
        },
        {
          id: 'B',
          text: 'Rally the kitchen staff to launch a counter-assault with soup',
          flagToSet: 'trustedStranger',
          consequenceText: 'You commanded the kitchen brigade to victory.',
        },
        {
          id: 'C',
          text: 'Eat your way out through the giant gelatin barrier',
          flagToSet: 'foundKey',
          consequenceText: 'You heroically ate through the barrier to freedom.',
        },
      ],
    },
  ],
};
