import pool from '@/hooks/utilis/db';

const getData = async (req, res) => {
  console.log(req.body.query)
  try {
    const result = await pool.query(req.body.query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing:', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default getData;
