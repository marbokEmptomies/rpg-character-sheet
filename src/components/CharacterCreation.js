import { useState } from "react";

import { saveCharacter } from "./apiService";
import BackgroundStory from "./BackgroundStory";
import CharacterList from "./CharacterList";
import { generateRandomBackgroundStory } from "../utils/backgroundStoryGenerator";

// Define the options for races and classes
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

function CharacterCreation() {
  const [characterName, setCharacterName] = useState("Player");
  const [selectedGender, setSelectedGender] = useState("Other");
  const [selectedRace, setSelectedRace] = useState("Human");
  const [selectedClass, setSelectedClass] = useState("Fighter");
  const [backgroundStory, setBackgroundStory] = useState("");
  const [skills, setSkills] = useState({
    Strength: 0,
    Intelligence: 0,
    Agility: 0,
    Wisdom: 0,
    Charisma: 0,
    Barter: 0,
  });

  const [rollCounts, setRollCounts] = useState({
    Strength: 0,
    Intelligence: 0,
    Agility: 0,
    Wisdom: 0,
    Charisma: 0,
    Barter: 0,
  });

  const handleSaveCharacter = () => {
    // Create an array of skill objects
    const skillsArray = Object.keys(skills).map((skillName) => ({
      skill_name: skillName,
      skill_value: skills[skillName]
    }))
    const characterData = {
      charactername: characterName,
      race: selectedRace,
      charclass: selectedClass,
      chargender: selectedGender,
      skills: skillsArray,
    };

    saveCharacter(characterData)
      .then((response) => {
        console.log("Character saved: ", response.data);
      })
      .catch((error) => {
        console.error("Error saving character: ", error);
      });
  };

  const handleCharacterNameChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleCharacterGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const rollD20 = (skillName) => {
    if (rollCounts[skillName] < 3) {
      const roll = Math.floor(Math.random() * 20) + 1;
      setSkills({ ...skills, [skillName]: roll });
      setRollCounts({ ...rollCounts, [skillName]: rollCounts[skillName] + 1 });
    }
  };

  const character = {
    characterName: characterName,
    selectedGender: selectedGender,
    selectedRace: selectedRace,
    selectedClass: selectedClass,
  };

  const generateNewBackgroundStory = () => {
    console.log(character, selectedClass, selectedRace);
    const newStory = generateRandomBackgroundStory(
      character,
      selectedRace,
      selectedClass
    );
    setBackgroundStory(newStory);
  };

  return (
    <div>
      <CharacterList />
      <h1>Character Creation </h1>
      <label htmlFor="characterName">Name:</label>
      <input
        type="text"
        id="characterName"
        name="characterName"
        value={characterName}
        onChange={handleCharacterNameChange}
      />

      {/* Gender dropdown */}
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={selectedGender}
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
          value={selectedRace}
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
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classOptions.map((charClass) => (
            <option key={charClass} value={charClass}>
              {charClass}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(skills).map((skill) => (
        <div key={skill}>
          <label htmlFor={skill}>{skill}:</label>
          <input
            type="text"
            id={skill}
            name={skill}
            value={skills[skill]}
            readOnly
          />
          <button
            onClick={() => rollD20(skill)}
            disabled={rollCounts[skill] >= 3}
          >
            Roll ({3 - rollCounts[skill]})
          </button>
        </div>
      ))}
      <button type="button" onClick={handleSaveCharacter}>
        Save character
      </button>
      {/* Integrate the BackgroundStory component and pass character information as props */}
      <BackgroundStory
        character={character}
        backgroundStory={backgroundStory}
        generateNewBackgroundStory={generateNewBackgroundStory}
      />
    </div>
  );
}

export default CharacterCreation;
