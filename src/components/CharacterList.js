import React, { useEffect, useState } from "react";
import { getCharacters, deleteCharacter} from "./apiService";
import CharacterCard from "./CharacterCard";
import styles from "../CharacterList.module.css";

function CharacterList({isCharacterSaved}) {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacterData(response.data);
        /* onDataLoad(); */
      })
      .catch((error) => {
        console.error("Error fetching character data: ", error);
      });
  }, []);

  useEffect(() => {
    if (isCharacterSaved) {
      //Fetch characters when a new character is saved
      getCharacters()
        .then((response) => {
          setCharacterData(response.data)
        })
        .catch((error) => {
          console.error("Error fetching character data: ", error)
        });
    }
  }, [isCharacterSaved])

  const handleDeleteCharacter = (characterId) => {
    deleteCharacter(characterId)
    .then((response) => {
      console.log("Character deleted: ", response.data);
      setCharacterData((prevCharacters) => 
        prevCharacters.filter((char) => char.id !== characterId)
      );
    })
    .catch((error) => {
      console.error("Error deleting character: ", error);
    });
  };

  return (
    <div>
        <h1>List of characters</h1>
        {characterData.length > 0 ? (
          <div className={styles["character-list"]}>
            {characterData.map((character) => (
              <CharacterCard 
                key={character.id} 
                character={character} 
                onDeleteCharacter={handleDeleteCharacter} 
              />
            ))}
          </div>
        ) : (
          <p>No characters found.</p>
        )}
    </div>
  );
}

export default CharacterList;
