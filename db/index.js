const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    hostname: 'localhost',
    database: 'best_practice',
    password: 'postgres',
    port: 5432
});

module.exports = pool;