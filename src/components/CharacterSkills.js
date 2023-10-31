import { useState, useEffect } from 'react';
import { getCharacterSkills } from './apiService';
import "../CharacterCard.css"

function CharacterSkills({characterId}) {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getCharacterSkills(characterId)
        .then((response) => {
            setSkills(response.data);
        })
        .catch((error) => {
            console.error("Error fetching skills: ", error)
        })
    }, [characterId])

    console.log(skills)

    return (
        <div>
            <h3>Skills:</h3>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        {skill.skill_name}: {skill.skill_value}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CharacterSkills;