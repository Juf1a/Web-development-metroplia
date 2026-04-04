import pool from '../../utils/database.js';

export const getAllCats = async () => {
  const [rows] = await pool.query(`
  SELECT wsk_cats.*, wsk_users.name AS owner_name
  FROM wsk_cats
  JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);
  return rows;
};

export const getCatById = async (id) => {
  const [rows] = await pool.query(
    `SELECT wsk_cats.*, wsk_users.name AS owner_name
     FROM wsk_cats
     JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
     WHERE wsk_cats.cat_id = ?`,
    [id]
  );

  return rows[0];
};

export const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const [result] = await pool.query(
    'INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)',
    [cat_name, weight, owner, filename, birthdate]
  );

  return result.insertId;
};

export const updateCat = async (catId, cat, authUser) => {
  const fields = [];
  const values = [];

  if (cat.cat_name !== undefined) {
    fields.push('cat_name = ?');
    values.push(cat.cat_name);
  }

  if (cat.weight !== undefined) {
    fields.push('weight = ?');
    values.push(cat.weight);
  }

  if (cat.birthdate !== undefined) {
    fields.push('birthdate = ?');
    values.push(cat.birthdate);
  }

  if (cat.filename !== undefined) {
    fields.push('filename = ?');
    values.push(cat.filename);
  }

  if (fields.length === 0) {
    return { affectedRows: 0 };
  }

  let query = `UPDATE wsk_cats SET ${fields.join(', ')} WHERE cat_id = ?`;
  values.push(catId);

  if (authUser.role !== 'admin') {
    query += ' AND owner = ?';
    values.push(authUser.user_id);
  }

  const [result] = await pool.query(query, values);
  return result;
};

export const deleteCat = async (catId, authUser) => {
  if (authUser.role === 'admin') {
    const [result] = await pool.query('DELETE FROM wsk_cats WHERE cat_id = ?', [catId]);
    return result;
  }

  const [result] = await pool.query('DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?', [catId, authUser.user_id]);
  return result;
};

export const getCatsByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT wsk_cats.*, wsk_users.name AS owner_name
     FROM wsk_cats
     JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
     WHERE owner = ?`,
    [userId]
  );
  return rows;
};