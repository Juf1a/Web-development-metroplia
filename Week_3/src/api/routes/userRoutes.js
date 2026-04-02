import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser)
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);


export default userRouter;