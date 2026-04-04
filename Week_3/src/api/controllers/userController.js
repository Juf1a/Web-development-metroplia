import {
  searchUserbyId,
  addUser,
  allUserItems,
  updateUser,
  deleteUser as deleteUserModel
} from "../models/userModel.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res, next) => {
  try {
    if (!res.locals.user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    if (res.locals.user.role !== 'admin') {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const users = await allUserItems();
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!res.locals.user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const currentUserId = Number(res.locals.user.user_id);
    const targetUserId = Number(req.params.id);

    if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const user = await searchUserbyId(targetUserId);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const result = await addUser(req.body);

    const { password, ...userWithoutPassword } = result;

    res.status(201).json({
      message: 'New User added.',
      result: userWithoutPassword
    });
  } catch (err) {
    next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    if (!res.locals.user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const targetUserId = Number(req.params.id);
    const currentUserId = Number(res.locals.user.user_id);

    if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const updates = { ...req.body };

    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    const result = await updateUser(targetUserId, updates, res.locals.user);

    if (!result || result.affectedRows === 0) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    res.json({ message: 'User item updated.' });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!res.locals.user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const targetUserId = Number(req.params.id);
    const currentUserId = Number(res.locals.user.user_id);

    if (res.locals.user.role !== 'admin' && currentUserId !== targetUserId) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const result = await deleteUserModel(targetUserId, res.locals.user);

    if (!result || result.affectedRows === 0) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    res.json({ message: 'User item deleted.' });
  } catch (err) {
    next(err);
  }
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };