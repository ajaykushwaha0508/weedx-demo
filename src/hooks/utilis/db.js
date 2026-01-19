
import { Pool } from 'pg';

const pool = new Pool({
  host: 'latestweedx.cpq0om406j48.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'Selnox123',
  database: 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

export default pool;