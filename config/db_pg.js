require("dotenv").config();
const { Pool } = require("pg");

// Create a reusable pool. Do NOT run any test/close logic on import.
const pool = new Pool({
    user: 'postgres',
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD || 'NONO042004',
    port: process.env.PG_PORT,
});

// Export the pool for application use. Consumers can create their own
// connection/test helper if they want to verify connectivity.
module.exports = pool;

// Optional: helper to test connection manually. Not executed on import.
async function testConnexion() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT current_database() as dbname, NOW() as current_time');
    console.log(`Connected to DB: ${res.rows[0].dbname}, server time: ${res.rows[0].current_time}`);
  } finally {
    client.release();
  }
}

module.exports.testConnexion = testConnexion;