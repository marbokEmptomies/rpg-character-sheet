const getCharacterSkills = async (characterId) => {
  const query = `SELECT c.characterName, cs.skill_name, cs.skill_value
                FROM characters AS c
                LEFT JOIN character_skills AS cs ON c.id = cs.character_id
                WHERE c.id = $1`;

  const result = await pool.query(query, [characterId]);

  return result.rows;
};

module.exports = {
  getCharacterSkills,
};
