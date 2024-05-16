const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  async function getIncomesTypes() {
    const incomeTypes = await pool.query("SELECT * FROM income_types");
    console.log(incomeTypes.rows);
    res.send(incomeTypes.rows);
  }

  getIncomesTypes();
});

module.exports = router;
