import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/userModel.js';
import 'dotenv/config';

const postLogin = async (req, res, next) => {
  try {
    const user = await findUserByUsername(req.body.username);

    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const userWithoutPassword = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      userWithoutPassword,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    if (res.locals.user) {
      res.json({
        message: 'token ok',
        user: res.locals.user
      });
    } else {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
};

export { postLogin, getMe };