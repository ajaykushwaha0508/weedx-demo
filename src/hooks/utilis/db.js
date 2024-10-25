// lib/db.js
// import mysql from 'mysql2';
// // const pool = new Pool({
// //   connectionString: 'postgresql://postgres:Selnox123@latestweedx.cpq0om406j48.us-east-1.rds.amazonaws.com:5432/postgres',
// // });
// const connection = mysql.createConnection({
//   host: 'latestweedx.cpq0om406j48.us-east-1.rds.amazonaws.com',
//   user: 'postgres',
//   password: 'Selnox123',
//   database: 'postgres',
// });


// export default connection;


import { Pool } from 'pg';

const pool = new Pool({
  host: 'latestweedx.cpq0om406j48.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'Selnox123',
  database: 'postgres',
  port: 5432, // PostgreSQL default port
  ssl: { rejectUnauthorized: false }
});

export default pool;