import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
} from '../controllers/userController.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validateUser, handleValidationErrors } from '../../middlewares/validation.js';
const userRouter = express.Router();

userRouter.route('/').get(authenticateToken, getAllUsers).post(validateUser, handleValidationErrors, postUser);
userRouter.route('/:id').get(authenticateToken, getUserById).put(authenticateToken, validateUser, handleValidationErrors, putUser).delete(authenticateToken, deleteUser);

export default userRouter;