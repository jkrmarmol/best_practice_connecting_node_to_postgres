const Pool = require('pg').Pool;
// const pool = new Pool({
//     user: 'postgres',
//     hostname: 'localhost',
//     database: 'best_practice',
//     password: 'postgres',
//     port: 5432
// });

const pool = new Pool({ // create connection to database
    connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
  });

module.exports = pool;