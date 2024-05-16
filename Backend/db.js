const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //ssl: true,
});

module.exports = pool;
