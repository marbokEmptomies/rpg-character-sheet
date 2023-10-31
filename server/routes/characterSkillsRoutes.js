const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/:characterId", async (req, res) => {
    const characterId = req.params.characterId;

    try {
        const { rows } = await db.query(
            "SELECT * FROM character_skills WHERE character_id = $1", [characterId]
        );
        console.log("Skill rows: ", rows)
        res.json(rows)
    } catch (error) {
        console.error("Error fetching character skills: ", error)
        res.status(500).send("Internal server error")
    }
});

module.exports = router;