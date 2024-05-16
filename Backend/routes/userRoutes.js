const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  async function getUsers() {
    const users = await pool.query("SELECT * FROM users");
    console.log(users.rows);
    res.send(users.rows);
  }

  getUsers();
});

router.get("/balance", (req, res) => {
  async function getAccountBalance() {
    const username = req.query.username;
    console.log(username);
    const userIdObj = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [username]
    );
    const userId = userIdObj.rows[0].id;
    const incomesResult = await pool.query(
      "SELECT SUM(amount) FROM incomes WHERE user_id = $1",
      [userId]
    );
    console.log(incomesResult);
    var incomes = 0;
    if (incomesResult.rows[0].sum != null) {
      incomes = incomesResult.rows[0].sum;
    }

    const expencesResult = await pool.query(
      "SELECT SUM(amount) FROM expences WHERE user_id = $1",
      [userId]
    );

    var expences = 0;
    if (expencesResult.rows[0].sum != null) {
      expences = expencesResult.rows[0].sum;
    }
    const balance = incomes - expences;
    res.json({ balance: balance, incomes: incomes, expences: expences });
  }
  getAccountBalance();
});

router.get("/incomes", (req, res) => {
  async function getIncomes() {
    const username = req.query.username;
    const userIdObj = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [username]
    );
    const userId = userIdObj.rows[0].id;
    const incomesGrouped = await pool.query(
      `SELECT income_types.name, income_types.id, COALESCE(SUM(amount), 0) 
      FROM incomes RIGHT JOIN income_types ON incomes.income_type_id = income_types.id AND user_id = $1 
      GROUP BY income_types.name, income_types.id 
      ORDER BY income_types.id`,
      [userId]
    );
    console.log(incomesGrouped.rows);
    res.json({ incomesGrouped: incomesGrouped.rows });
  }

  getIncomes();
});

router.get("/expences", (req, res) => {
  async function getExpences() {
    const username = req.query.username;
    const userIdObj = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [username]
    );
    const userId = userIdObj.rows[0].id;
    const expencesGrouped = await pool.query(
      `SELECT expence_types.name, expence_types.id, 
      COALESCE(SUM(amount), 0) 
      FROM expences RIGHT JOIN expence_types ON expences.expence_type_id = expence_types.id 
      AND user_id = $1 GROUP BY expence_types.name, expence_types.id 
      ORDER BY expence_types.id`,
      [userId]
    );
    console.log(expencesGrouped.rows);
    res.json({ expencesGrouped: expencesGrouped.rows });
  }

  getExpences();
});

router.get("/incomes/:month/:year", (req, res) => {
  const month = req.params.month;
  const year = req.params.year;
  //DOVRŠITI DOHVAT PRIHODA U OVOM MJESECU!!!
});

module.exports = router;
