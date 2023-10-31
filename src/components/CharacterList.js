import React, { useEffect, useState } from "react";
import { getCharacters, deleteCharacter} from "./apiService";
import CharacterCard from "./CharacterCard";
import "../CharacterList.css"

function CharacterList({newCharacterSaved, onDataLoad}) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacters(response.data);
        onDataLoad();
      })
      .catch((error) => {
        console.error("Error fetching character data: ", error);
      });
  }, [newCharacterSaved, onDataLoad]);

  const handleDeleteCharacter = (characterId) => {
    deleteCharacter(characterId)
    .then((response) => {
      console.log("Character deleted: ", response.data);
      setCharacters((prevCharacters) => 
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
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              onDeleteCharacter={handleDeleteCharacter} 
            />
          ))}
        </div>
    </div>
  );
}

export default CharacterList;
