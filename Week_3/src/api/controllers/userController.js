import {searchUserbyId, addUser, allUserItems } from "../models/userModel.js";

const getAllUsers = (req, res) => {
    res.json(allUserItems())
};

const getUserById = (req, res) => {
  const User = searchUserbyId(req.params.id);
  if (User) {
    res.json(User);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: 'New User added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
    res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
    res.json({ message: 'User item deleted.' });
};

export {getAllUsers, getUserById, postUser, putUser, deleteUser};