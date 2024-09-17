const usersdata = require("./usersdata.js");
let userArray = Array.isArray(usersdata) ? [...usersdata] : [];
let nextId =
  userArray.length > 0 ? Math.max(...userArray.map((user) => user.id)) + 1 : 1;
const getAll = () => {
  return userArray;
};

function createUser(userData) {
  const { first_name, last_name, email, City, Street_name, Password } =
    userData;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !City ||
    !Street_name ||
    !Password
  ) {
    return false;
  }

  const newUser = {
    id: nextId++,
    ...userData,
  };

  userArray.push(newUser);
  return newUser;
}

function findUserById(id) {
  const numericId = Number(id);
  const user = userArray.find((user) => user.id === numericId);
  return user || false;
}

function updateUserById(id, updatedData) {
  const user = findUserById(id);
  if (user) {
    Object.assign(user, updatedData);
    return user;
  }
  return false;
}

function deleteUserById(id) {
  const user = findUserById(id);
  if (user) {
    const initialLength = userArray.length;
    userArray = userArray.filter((user) => user.id !== Number(id));
    return userArray.length < initialLength;
  }
  return false;
}

const User = {
  getAll,
  createUser,
  findUserById,
  updateUserById,
  deleteUserById,
};

module.exports = User;
