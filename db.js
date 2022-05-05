const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'cocolis0',
  database: 'tcitdb',
  host: 'localhost',
  port: 5432,
});

module.exports = pool
