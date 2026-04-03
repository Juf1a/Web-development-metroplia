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