import {
  searchUserbyId,
  addUser,
  allUserItems,
  updateUser,
  deleteUser as deleteUserModel
} from "../models/userModel.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
  if (!res.locals.user) {
    return res.sendStatus(401);
  }

  if (res.locals.user.role !== 'admin') {
    return res.sendStatus(403);
  }

  const users = await allUserItems();
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);

  res.json(usersWithoutPasswords);
};

const getUserById = async (req, res) => {
  if (!res.locals.user) return res.sendStatus(401);

  const currentUserId = Number(res.locals.user.user_id);
  const targetUserId = Number(req.params.id);

  if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
    return res.sendStatus(403);
  }

  const user = await searchUserbyId(targetUserId);

  if (!user) return res.sendStatus(404);

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await addUser(req.body);

  const { password, ...userWithoutPassword } = result;

  res.status(201).json({
    message: 'New User added.',
    result: userWithoutPassword
  });
};

const putUser = async (req, res) => {
  if (!res.locals.user) return res.sendStatus(401);

  const targetUserId = Number(req.params.id);
  const currentUserId = Number(res.locals.user.user_id);

  if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
    return res.sendStatus(403);
  }

  const updates = { ...req.body };

  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }

  const result = await updateUser(targetUserId, updates, res.locals.user);

  if (!result || result.affectedRows === 0) {
    return res.sendStatus(404);
  }

  res.json({ message: 'User item updated.' });
};

const deleteUser = async (req, res) => {
  if (!res.locals.user) return res.sendStatus(401);

  const targetUserId = Number(req.params.id);
  const currentUserId = Number(res.locals.user.user_id);

  if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
    return res.sendStatus(403);
  }

  const result = await deleteUserModel(targetUserId, res.locals.user);

  if (!result || result.affectedRows === 0) {
    return res.sendStatus(404);
  }

  res.json({ message: 'User item deleted.' });
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };