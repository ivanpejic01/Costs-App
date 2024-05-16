const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { username, expenceType, description, amount, date } = req.body;
    console.log("Expence type = ", expenceType);
    const expenceTypeIdObj = await pool.query(
      "SELECT id FROM expence_types WHERE name = $1",
      [expenceType]
    );

    const expenceTypeId = expenceTypeIdObj.rows[0].id;
    console.log("ExpenceTypeId = ", expenceTypeId);

    const userIdObj = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [username]
    );
    const userId = userIdObj.rows[0].id;
    console.log("UserID = ", userId);

    await pool.query(
      "INSERT INTO expences (amount, date, description, expence_type_id, user_id) VALUES ($1, $2, $3, $4, $5)",
      [amount, date, description, expenceTypeId, userId]
    );
  } catch (error) {
    console.log("Error ", error);
  }
});

module.exports = router;
