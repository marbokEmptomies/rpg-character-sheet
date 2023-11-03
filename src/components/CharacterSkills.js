import { useState, useEffect } from 'react';
import { getCharacterSkills } from './apiService';
import styles from "../CharacterSkills.module.css";

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
        <div className={styles["character-skills"]}>
            <h4>Skills:</h4>
            <ul className={styles["skill-list"]}>
                {skills.map((skill, index) => (
                    <div className={styles.skill} key={index}>
                        {skill.skill_name}: {skill.skill_value}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default CharacterSkills;