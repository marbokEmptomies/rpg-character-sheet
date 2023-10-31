const express = require("express");
const router = express.Router();
const db = require("../database/db");

//Define the API routes
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM characters");
    console.log("Character sheets: ", rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { charactername, race, charclass, chargender, skills } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO characters (charactername, race, charclass, chargender) VALUES ($1, $2, $3, $4) RETURNING id",
      [charactername, race, charclass, chargender]
    );

    const characterId = rows[0].id;

    //Insert the character skills into the character_skills table.
    for (const skill of skills) {
      await db.query(
        "INSERT INTO character_skills (character_id, skill_name, skill_value) VALUES ($1, $2, $3)",
        [characterId, skill.skill_name, skill.skill_value]
      );
    }

    res.json({characterId});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

router.delete("/:id", async (req, res) => {
  const characterId = req.params.id;

  try {
    const result = await db.query('DELETE FROM characters WHERE id = $1', [characterId]);

    if (result.rowCount === 1){
      res.json({message: "Character deleted successfully"});
    } else {
      res.status(404).json({error: "Character not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error")
  }
})

module.exports = router;
