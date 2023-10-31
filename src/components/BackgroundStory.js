import React from "react";

function BackgroundStory({ /* character, */ backgroundStory, generateNewBackgroundStory }) {
  /* const { characterName, selectedRace, selectedClass } = character; */

  return (
    <div>
      <h2>Background Story</h2>
      <button onClick={generateNewBackgroundStory}>Generate a background story.</button>
      <p>{backgroundStory}</p>
    </div>
  );
}

export default BackgroundStory;
