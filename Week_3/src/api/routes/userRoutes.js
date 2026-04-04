import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
} from '../controllers/userController.js';
import { authenticateToken } from '../../middlewares/authentication.js';
const userRouter = express.Router();

userRouter.route('/').get(authenticateToken, getAllUsers).post(postUser);
userRouter.route('/:id').get(authenticateToken, getUserById).put(authenticateToken, putUser).delete(authenticateToken, deleteUser);

export default userRouter;