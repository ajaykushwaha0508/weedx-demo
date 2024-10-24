import { query } from '../../hooks/utilis/db';

export default async function handler(req, res) {
  try {
    console.log(query)
    // const { rows } = await query('SELECT * FROM users');
    // res.status(200).json({ users: rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}