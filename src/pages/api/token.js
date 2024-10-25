import pool from '@/hooks/utilis/db';

const getData = async (req, res) => {
  try {
    const result = await pool.query('select *  TABLE public."DeliveryBoy_employee"');
    console.log("Query result:", result);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
};

export default getData;
