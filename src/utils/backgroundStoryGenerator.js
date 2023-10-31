export function generateRandomBackgroundStory(character, selectedRace, selectedClass, selectedGender){
    console.log(character, selectedClass, selectedRace)
    const { characterName } = character;
    // Define background story templates based on race and class
    const raceTemplates = {
      Human: [
        "{name}, a righteous human, hails from the {village} village and is known for {achievement}.",
      ],
      Orc: [
        "{name}, a mighty orc, comes from the {tribe} tribe, where magic is highly regarded. {name} is known for {spell proficiency}.",
      ],
      Elf: [
        "{name}, a proud elf, emerges from the {tribe} tribe, where giant trees paint the worldscape. {name} is known for {achievement}.",
      ],
      Gnome: [
        "{name}, a cunning gnome, comes from the {tribe} tribe, where the ancient forest covers the homestead. {name} is well known for {spell proficiency}.",
      ], // Add more templates for other races
    };

    const classTemplates = {
      Fighter: [
        "{name} is a fearless warrior, admired for their {combat_skill}.",
      ],
      Wizard: [
        "{name} is a skilled spellcaster, specializing in using {magic_type} magic.",
      ],
      Barbarian: [
        "{name} is a brutal warrior, admired for their {combat_skill}.",
      ],
      Thief: [
        "{name} is a cunning master of dark arts, specializing in {combat_skill}."
      ],
      Merchant: [
        "{name}, a master in sales, highly admired for their ability to use {magic_type} magic.",
      ],
      Mage: [
        "{name} is a master of magic, admired around the village by their ability to use {magic_type} magic."
      ],
      Monk: [
        "{name} is a pious person of the gods. Specializing in {combat_skill}."
      ],
      Paladin: [
        "{name} is a virtuous warrior, admired for their {combat_skill}."
      ],
      // Add more templates for other classes
    };

    // Select a random template for the given race and class
    const selectedRaceTemplate = raceTemplates[selectedRace] || [];
    const selectedClassTemplate = classTemplates[selectedClass] || [];

    // Generate a random background story by filling in placeholders with random elements
    const randomRaceStory =
      selectedRaceTemplate[
        Math.floor(Math.random() * selectedRaceTemplate.length)
      ];
    const randomClassStory =
      selectedClassTemplate[
        Math.floor(Math.random() * selectedClassTemplate.length)
      ];

    function getRandomVillageName() {
      const villageNames = [
        "Oakfield",
        "Riverfall",
        "Driftwood",
        "Rendellgrove",
        "Meadowbrook",
        "Aysha",
        "Silverfish Creek",
        "Yzerhill",
        "Windbluff",
        "Pinecrest",
        "Copperhaven",
      ];

      //Generate a random index to select a village name
      const randomIndex = Math.floor(Math.random() * villageNames.length);

      //Return randomly selected village name
      return villageNames[randomIndex];
    }

    function getRandomAchievement() {
      const achieveNames = [
        "chef mastery",
        "fishing",
        "carpentry",
        "hunting",
        "skinning",
        "tannery",
        "jewelery making",
        "bow making",
        "martial arts",
        "procrastinating",
        "innkeeping",
      ];

      const randomIndex = Math.floor(Math.random() * achieveNames.length);

      return achieveNames[randomIndex];
    }

    function getRandomTribeName() {
      const tribeNames = [
        "Fluffyfoot",
        "Greyskin",
        "Golon",
        "Saltyear",
        "Thundereye",
        "Catfish",
        "Silvercrest",
        "Knave",
        "Shieldbearer",
        "Goatshin",
        "Copperbeard",
      ];

      const randomIndex = Math.floor(Math.random() * tribeNames.length);

      return tribeNames[randomIndex];
    }

    function getRandomSpellProficiency() {
      const spellNames = [
        "fireball",
        "healing",
        "lighting",
        "lockpicking",
        "confusing",
        "stun",
        "telekinesis",
        "raise dead",
        "create food",
        "alchemy",
        "invisibility",
      ];

      const randomIndex = Math.floor(Math.random() * spellNames.length);

      return spellNames[randomIndex];
    }

    function getRandomCombatSkill() {
      const combatSkillNames = [
        "pugilism",
        "martial arts",
        "bowmastery",
        "swordsmanship",
        "polearm mastery",
        "slingmastery",
        "horseback combat mastery",
        "battleground healing",
        "siege mastery",
        "explosives",
        "stealth combat mastery",
      ];

      const randomIndex = Math.floor(Math.random() * combatSkillNames.length);

      return combatSkillNames[randomIndex];
    }

    function getRandomMagicType() {
      const magicTypeNames = [
        "pyromancy",
        "necromancy",
        "arcane",
        "hydromancy",
        "telemancy",
        "psychomancy",
      ];

      const randomIndex = Math.floor(Math.random() * magicTypeNames.length);

      return magicTypeNames[randomIndex];
    }

    return `${randomRaceStory} ${randomClassStory}`
      .replace(/{name}/g, characterName)
      .replace(/{village}/g, getRandomVillageName()) // Implement a function to get random village names
      .replace(/{achievement}/g, getRandomAchievement()) // Implement a function to get random achievements
      .replace(/{tribe}/g, getRandomTribeName())
      .replace(/{spell proficiency}/g, getRandomSpellProficiency())
      .replace(/{combat_skill}/g, getRandomCombatSkill())
      .replace(/{magic_type}/g, getRandomMagicType());
  };