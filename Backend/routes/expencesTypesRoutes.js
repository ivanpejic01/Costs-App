const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  async function getExpencesTypes() {
    const expenceTypes = await pool.query("SELECT * FROM expence_types");
    console.log(expenceTypes.rows);
    res.send(expenceTypes.rows);
  }

  getExpencesTypes();
});

module.exports = router;
