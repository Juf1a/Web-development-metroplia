import pool from '../../utils/database.js';

const allUserItems = async () => {
  const [rows] = await pool.query('SELECT * FROM wsk_users');
  return rows;
};

const searchUserbyId = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;

  const [result] = await pool.query(
    'INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)',
    [name, username, email, role, password]
  );

  return {
    user_id: result.insertId,
    name,
    username,
    email,
    role,
    password,
  };
};

const deleteUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query('DELETE FROM wsk_cats WHERE owner = ?', [userId]);
    await conn.query('DELETE FROM wsk_users WHERE user_id = ?', [userId]);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export { allUserItems, searchUserbyId, addUser, deleteUser };