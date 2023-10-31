import React, { useEffect, useState } from "react";
import { getCharacters} from "./apiService";
import CharacterCard from "./CharacterCard";
import "../CharacterList.css"

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching character data: ", error);
      });
  }, []);

  return (
    <div>
        <h1>List of characters</h1>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
    </div>
  );
}

export default CharacterList;
