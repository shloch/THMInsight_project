const { Pool } = require('pg');
const chalk = require('chalk');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.on('error', (err) => {
  console.log(chalk.hex('#34ace0').bold(err));
});

module.exports = pool;
