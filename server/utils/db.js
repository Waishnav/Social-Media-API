// const { Client } = require('pg');

// // Connect to the database
// const connect = () => {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//   });
//   client.connect();
//   return client;
// };

// // Run a query and return the result
// const query = async (client, queryString, values = []) => {
//   try {
//     const result = await client.query(queryString, values);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };

// // Close the database connection
// const close = (client) => {
//   client.end();
// };

const Pool = require("pg").Pool;
const pool = new Pool({connectionString: process.env.DATABASE_URL});

module.exports = pool;


