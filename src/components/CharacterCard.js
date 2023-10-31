import React from "react";
import CharacterSkills from "./CharacterSkills";
import "../CharacterCard.css";

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <div className="character-info">
        <p>Name: {character.charactername}</p>
        <p>Race: {character.race}</p>
        <p>Class: {character.charclass}</p>
        <p>Gender: {character.chargender}</p>
      </div>
      <CharacterSkills characterId={character.id} />
    </div>
  );
}

export default CharacterCard;
