const getCharacterSkills = async (req, res) => {
    const characterId = req.params.characterId;
    try {
        const skills = await characterSkillsService.getCharacterSkills(characterId);
        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
}

module.exports = {
    getCharacterSkills,
}