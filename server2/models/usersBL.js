let usersModel = require("./usersModel");
let jsonDAL = require("../Dals/jsonDAL");

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    usersModel.find({}, async (err, data) => {
      if (err) {
        reject(err);
      }
      // Gethering All Users Data From All Data Sources And Shape It To Full User Data
      let users = Promise.all(
        data.map(async (item) => {
          let json = await jsonDAL.readJsonFile("users.json");
          let user = json.users.find((user) => user._id == item._id);

          let json2 = await jsonDAL.readJsonFile("permissions.json");
          let userPermissions = json2.permissions.find(
            (permission) => item._id == permission._id
          );
            console.log(json2)
          let userData = {
            ...user,
            ...item._doc,
            permissions: userPermissions.permissions,
          };
          return userData;
        })
      );

      resolve(users);
    });
  });
};

const getUserByID = async (userID) => {
  return new Promise((resolve, reject) => {
    usersModel.findById(userID, async (err, data) => {
      if (err) {
        reject(err);
      }
      // Gethering All User Data From All Data Sources And Shape It To Full User Data
      let json = await jsonDAL.readJsonFile("users.json");
      let user = json.users.find((user) => user._id == data._id);

      let json2 = await jsonDAL.readJsonFile("permissions.json");
      let userPermissions = json2.permissions.find(
        (permission) => userID == permission._id
      );

      userData = {
        ...user,
        ...data._doc,
        permissions: userPermissions.permissions,
      };
      resolve(userData);
    });
  });
};

const addUser = async (userData) => {
  return new Promise((resolve, reject) => {
    let user = new usersModel({
      username: userData.username,
      password: userData.password,
    });

    // Write Username To DataBase
    user.save(async (err, data) => {
      if (err) {
        reject(err);
      }

      // Write User Info To Users.json File
      let allUsers = await jsonDAL.readJsonFile("users.json");
      allUsers.users.push({
        _id: data._id.toString(),
        first_name: userData.first_name,
        last_name: userData.last_name,
        created_date: new Date().toISOString().substring(0, 10),
        session_timeout: userData.session_timeout,
      });
      await jsonDAL.writeJsonFile("users.json", allUsers);

      // Write User's Permissions To permissions.json File
      let allUsers2 = await jsonDAL.readJsonFile("permissions.json");
      allUsers2.permissions.push({
        _id: data._id.toString(),
        permissions: userData.permissions,
      });
      await jsonDAL.writeJsonFile("permissions.json", allUsers2);

      // Returning The New User Data With New ID
      resolve({ _id: data._id.toString(), ...userData });
    });
  });
};

const updateUser = async (userID, userData) => {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndUpdate(userID, userData, async (err, data) => {
      if (err) {
        reject(err);
      }

      // Update User Info in Users.json File

      let allUsers = await jsonDAL.readJsonFile("users.json");
      let index = allUsers.users.findIndex((user) => user._id == userID);
      allUsers.users[index] = {
        _id: userID,
        first_name: userData.first_name,
        last_name: userData.last_name,
        created_data: userData.created_date,
        session_timeout: userData.session_timeout,
      };
      await jsonDAL.writeJsonFile("users.json", allUsers);

      // Update User's Permissions in permissions.json File
      let allPermissions = await jsonDAL.readJsonFile("permissions.json");
      let index2 = allPermissions.permissions.findIndex(
        (item) => item._id == userID
      );
      allPermissions.permissions[index2] = {
        _id: userID,
        permissions: userData.permissions,
      };
      await jsonDAL.writeJsonFile("permissions.json", allPermissions);

      // Returning The Updated User Data
      resolve({ _id: userID, ...userData });
    });
  });
};

const deleteUser = async (userID) => {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndDelete(userID, async (err, data) => {
      if (err) {
        reject(err);
      }

      let allUsers = await jsonDAL.readJsonFile("users.json");
      allUsers = allUsers.users.filter((user) => user._id !== userID);
      await jsonDAL.writeJsonFile("users.json", { users: allUsers });

      let allPermissions = await jsonDAL.readJsonFile("permissions.json");
      allPermissions = allPermissions.permissions.filter(
        (item) => item._id !== userID
      );
      await jsonDAL.writeJsonFile("permissions.json", {
        permissions: allPermissions,
      });

      // Returning Username Of Deleted User
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
