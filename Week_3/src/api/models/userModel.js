const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Anna Virtanen',
    username: 'annav',
    email: 'anna@metropolia.fi',
    role: 'admin',
    password: 'password',
  },
  {
    user_id: 3611,
    name: 'Mikko Korhonen',
    username: 'mikkoK',
    email: 'mikko@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3612,
    name: 'Laura Nieminen',
    username: 'lauran',
    email: 'laura@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3613,
    name: 'Janne Laine',
    username: 'jannel',
    email: 'janne@metropolia.fi',
    role: 'moderator',
    password: 'password',
  },
  {
    user_id: 3614,
    name: 'Sara Lehtinen',
    username: 'saral',
    email: 'sara@metropolia.fi',
    role: 'user',
    password: 'password',
  }
];

const allUserItems = () => {
    return userItems;
}

const searchUserbyId = (id) => {
    return userItems.find(user => user.user_id == id)
}

const addUser = (user) => {
  const { name, username, email, role, password } = user;

  const newId = Math.max(...userItems.map(user => user.user_id)) + 1;

  const newUser = {
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  };

  userItems.push(newUser);

  return newUser;
};

export {allUserItems, searchUserbyId, addUser}