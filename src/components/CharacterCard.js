import React from "react";
import CharacterSkills from "./CharacterSkills";
import "../CharacterCard.css";

function CharacterCard({ character, onDeleteCharacter }) {
    const handleDeleteClick = () => {
        onDeleteCharacter(character.id)
    };

  return (
    <div className="character-card">
      <div className="character-info">
        <h3>General stats:</h3>
        <p>Name: {character.charactername}</p>
        <p>Race: {character.race}</p>
        <p>Class: {character.charclass}</p>
        <p>Gender: {character.chargender}</p>
      </div>
      <CharacterSkills characterId={character.id} />
      <button onClick={handleDeleteClick}>Delete character</button>
    </div>
  );
}

export default CharacterCard;
