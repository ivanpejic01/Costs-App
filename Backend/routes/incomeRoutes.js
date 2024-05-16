const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { username, incomeType, description, amount, date } = req.body;
    const incomeIdObj = await pool.query(
      "SELECT id FROM income_types WHERE name = $1",
      [incomeType]
    );
    const incomeId = incomeIdObj.rows[0].id;

    const userIdObj = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [username]
    );
    const userId = userIdObj.rows[0].id;

    await pool.query(
      "INSERT INTO incomes (amount, date, description, income_type_id, user_id) VALUES ($1, $2, $3, $4, $5)",
      [amount, date, description, incomeId, userId]
    );
    console.log(incomeId, " ", userId);
  } catch (error) {
    console.log("Error ", error);
  }
});

module.exports = router;
