let usersModel = require("./usersModel");

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    usersModel.find({}, async function (err, data) {
      if (err) {
        reject(err);
      } 
        
        resolve(data);
    });
  });
};

const getUserByID = async (userID) => {
  return new Promise((resolve, reject) => {
    usersModel.findById(userID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const addUser = async (userData) => {
  return new Promise((resolve, reject) => {
    let user = new usersModel({ ...userData });

    user.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const updateUser = async (userID, userData) => {
  return new Promise((resolve, reject) => {
    console.log(userData);
    usersModel.findByIdAndUpdate(userID, userData, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const deleteUser = async (userID) => {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndDelete(userID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
};


