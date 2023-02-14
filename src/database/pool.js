// Connect to the database
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "123",
  database: "chuumon_db",
});

module.exports = pool;