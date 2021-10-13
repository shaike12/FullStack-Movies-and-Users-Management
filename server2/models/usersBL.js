let usersModel = require("./usersModel");
let jsonDAL = require("../Dals/jsonDAL");

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    usersModel.find({}, (err, data) => {
      if (err) {
        reject(err);
      } 
        // let users = await jsonDAL.readJsonFile('users.json')
        resolve(data);
    });
  });
};

const getUserByID = async (userID) => {
  return new Promise((resolve, reject) => {
    usersModel.findById(userID, async (err, data) => {
      if (err) {
        reject(err);
      }
        let resp = await jsonDAL.readJsonFile('users.json')
        let user = resp.users.find(user => user._id == data._id)
        
        let resp2 = await jsonDAL.readJsonFile('permissions.json')
        let userPermissions = resp2.permissions.find(permission => permission._id == permission._id)
        console.log(userPermissions);
        user = {...data._doc, ...user, permissions: userPermissions.permissions}
        console.log(user);

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


