// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:Selnox123@latestweedx.cpq0om406j48.us-east-1.rds.amazonaws.com:5432/postgres',
});

export const query = async (text, params) => {
    console.log(res , "1221212121212121")
  const res = await pool.query(text, params);
  return res;
};
