import React from "react";
import CharacterSkills from "./CharacterSkills";
import styles from "../CharacterCard.module.css";

function CharacterCard({ character, onDeleteCharacter }) {
    const handleDeleteClick = () => {
        onDeleteCharacter(character.id)
    };

  return (
    <div className={styles["character-card"]}>
      <div className={styles["character-details"]}>
        <h3>{character.charactername}</h3>
        Race: {character.race}<br />
        Class: {character.charclass}<br />
        Gender: {character.chargender}<br />
      </div>
      <CharacterSkills characterId={character.id} />
      <button className={styles["delete-button"]} onClick={handleDeleteClick}>Delete character</button>
    </div>
  );
}

export default CharacterCard;
