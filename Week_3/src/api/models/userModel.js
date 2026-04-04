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

const updateUser = async (userId, user, authUser) => {
  const fields = [];
  const values = [];

  if (user.name !== undefined) {
    fields.push('name = ?');
    values.push(user.name);
  }

  if (user.username !== undefined) {
    fields.push('username = ?');
    values.push(user.username);
  }

  if (user.email !== undefined) {
    fields.push('email = ?');
    values.push(user.email);
  }

  if (user.password !== undefined) {
    fields.push('password = ?');
    values.push(user.password);
  }

  if (authUser.role === 'admin' && user.role !== undefined) {
    fields.push('role = ?');
    values.push(user.role);
  }

  if (fields.length === 0) {
    return { affectedRows: 0 };
  }

  let query = `UPDATE wsk_users SET ${fields.join(', ')} WHERE user_id = ?`;
  values.push(userId);

  if (authUser.role !== 'admin') {
    query += ' AND user_id = ?';
    values.push(authUser.user_id);
  }

  const [result] = await pool.query(query, values);
  return result;
};

const deleteUser = async (userId, authUser) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    if (authUser.role === 'admin') {
      await conn.query('DELETE FROM wsk_cats WHERE owner = ?', [userId]);
      const [result] = await conn.query('DELETE FROM wsk_users WHERE user_id = ?', [userId]);
      await conn.commit();
      return result;
    }

    await conn.query('DELETE FROM wsk_cats WHERE owner = ? AND owner = ?', [userId, authUser.user_id]);
    const [result] = await conn.query('DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?', [userId, authUser.user_id]);

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const findUserByUsername = async (username) => {
  const sql = `
    SELECT *
    FROM wsk_users
    WHERE username = ?;
  `;

  const [rows] = await pool.query(sql, [username]);
  return rows[0];
};

export { allUserItems, searchUserbyId, addUser, updateUser, deleteUser, findUserByUsername };