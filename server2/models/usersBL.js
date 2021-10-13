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
      // Gethering All User Data From All Data Sources And Shape It To Full User Data
      let json = await jsonDAL.readJsonFile("users.json");
      let user = json.users.find((user) => user._id == data._id);

      let json2 = await jsonDAL.readJsonFile("permissions.json");
      let userPermissions = json2.permissions.find(
        (permission) => permission._id == permission._id
      );

      user = {
        ...user,
        ...data._doc,
        permissions: userPermissions.permissions,
      };
      console.log(user);
      resolve(user);
    });
  });
};

const addUser = async (userData) => {
  return new Promise((resolve, reject) => {
    let user = new usersModel({ username: userData.username, password: userData.password });

    // Write Username To DataBase 
    user.save(async (err, data) => {
        if (err) {
            reject(err);
        }
        
        // Write User Info To Users.json File
        let obj = await jsonDAL.readJsonFile("users.json");
        obj.users.push({
            _id: data._id.toString(),
            first_name: userData.first_name,
            last_name: userData.last_name,
            created_date: "12/04/21",
            session_timeout: userData.session_timeout,
        });
        await jsonDAL.writeJsonFile("users.json", obj)

        // Write User's Permissions Data To permissions.json File
        let json2 = await jsonDAL.readJsonFile("permissions.json");
        json2.permissions.push({
            _id: data._id.toString(),
            permissions: userData.permissions,
        })
        await jsonDAL.writeJsonFile("permissions.json", json2)

        
      resolve({ _id: data._id.toString(), ...userData});
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
