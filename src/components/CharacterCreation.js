import { useState } from "react";
import { getCharacters, saveCharacter } from "./apiService";
import BackgroundStory from "./BackgroundStory";
import CharacterList from "./CharacterList";
import { generateRandomBackgroundStory } from "../utils/backgroundStoryGenerator";

const raceOptions = ["Human", "Orc", "Elf", "Gnome"];
const genderOptions = ["Male", "Female", "Other"];
const classOptions = [
  "Fighter",
  "Barbarian",
  "Wizard",
  "Thief",
  "Merchant",
  "Mage",
  "Monk",
  "Paladin",
];

const initialCharacterState = {
  characterName: "Player",
  selectedGender: "Other",
  selectedRace: "Human",
  selectedClass: "Fighter",
  backgroundStory: "",
  skills: {
    Strength: 0,
    Intelligence: 0,
    Agility: 0,
    Wisdom: 0,
    Charisma: 0,
    Barter: 0,
  },
  rollCounts: {
    Strength: 0,
    Intelligence: 0,
    Agility: 0,
    Wisdom: 0,
    Charisma: 0,
    Barter: 0,
  },
};

function CharacterCreation() {
  const [character, setCharacter] = useState(initialCharacterState);
  const [isCharacterSaved, setIsCharacterSaved] = useState(false);
  const [characterList, setCharacterList] = useState([])

  const handleSaveCharacter = () => {
    // Create an array of skill objects
    const skillsArray = Object.keys(character.skills).map((skillName) => ({
      skill_name: skillName,
      skill_value: character.skills[skillName],
    }));
    const characterData = {
      charactername: character.characterName,
      race: character.selectedRace,
      charclass: character.selectedClass,
      chargender: character.selectedGender,
      skills: skillsArray,
    };

    saveCharacter(characterData)
      .then((response) => {
        console.log("Character saved: ", response.data);
        setIsCharacterSaved(true);
        // Clear the form values after saving
        setCharacter(initialCharacterState);

        //Update the character list
        getCharacters()
          .then((response) => {
            setCharacterList(response.data);
            setIsCharacterSaved(false)
          })
      })
      .catch((error) => {
        console.error("Error saving character: ", error);
      });
  };

  const handleCharacterNameChange = (e) => {
    setCharacter({
      ...character,
      characterName: e.target.value,
    });
  };

  const handleCharacterGenderChange = (e) => {
    setCharacter({
      ...character,
      selectedGender: e.target.value,
    });
  };

  const handleRaceChange = (e) => {
    setCharacter({
      ...character,
      selectedRace: e.target.value,
    });
  };

  const handleClassChange = (e) => {
    setCharacter({
      ...character,
      selectedClass: e.target.value,
    });
  };

  const rollD20 = (skillName) => {
    if (character.rollCounts[skillName] < 3) {
      const roll = Math.floor(Math.random() * 20) + 1;
      setCharacter({
        ...character,
        skills: {
          ...character.skills,
          [skillName]: roll,
        },
        rollCounts: {
          ...character.rollCounts,
          [skillName]: character.rollCounts[skillName] + 1,
        },
      });
    }
  };

  const generateNewBackgroundStory = () => {
    const newStory = generateRandomBackgroundStory(
      character,
      character.selectedRace,
      character.selectedClass
    );
    setCharacter({
      ...character,
      backgroundStory: newStory,
    });
  };

  return (
    <div>
      <h1>Character Creation </h1>
      <label htmlFor="characterName">Name:</label>
      <input
        type="text"
        id="characterName"
        name="characterName"
        value={character.characterName}
        onChange={handleCharacterNameChange}
      />

      {/* Gender dropdown */}
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={character.selectedGender}
          onChange={handleCharacterGenderChange}
        >
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Race Dropdown */}
      <div>
        <label htmlFor="race">Race:</label>
        <select
          id="race"
          name="race"
          value={character.selectedRace}
          onChange={handleRaceChange}
        >
          {raceOptions.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      {/* Class Dropdown */}
      <div>
        <label htmlFor="class">Class:</label>
        <select
          id="class"
          name="class"
          value={character.selectedClass}
          onChange={handleClassChange}
        >
          {classOptions.map((charClass) => (
            <option key={charClass} value={charClass}>
              {charClass}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(character.skills).map((skill) => (
        <div key={skill}>
          <label htmlFor={skill}>{skill}:</label>
          <input
            type="text"
            id={skill}
            name={skill}
            value={character.skills[skill]}
            readOnly
          />
          <button
            onClick={() => rollD20(skill)}
            disabled={character.rollCounts[skill] >= 3}
          >
            Roll ({3 - character.rollCounts[skill]})
          </button>
        </div>
      ))}
      <button type="button" onClick={handleSaveCharacter}>
        Save character
      </button>
      <BackgroundStory
        character={character}
        backgroundStory={character.backgroundStory}
        generateNewBackgroundStory={generateNewBackgroundStory}
      />
      <CharacterList characters={characterList} isCharacterSaved={isCharacterSaved} />
    </div>
  );
}

export default CharacterCreation;
