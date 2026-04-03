import {
  searchUserbyId,
  addUser,
  allUserItems,
  deleteUser as deleteUserModel
} from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  const users = await allUserItems();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await searchUserbyId(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);

  res.status(201).json({
    message: 'New User added.',
    result
  });
};

const putUser = async (req, res) => {
  res.json({ message: 'User item updated.' });
};

const deleteUser = async (req, res) => {
  await deleteUserModel(req.params.id);
  res.json({ message: 'User item deleted.' });
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };