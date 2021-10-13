let membersDAL = require("../Dals/membersDAL");
let membersModel = require("./membersModel");

const getAllMembers = async () => {
  return new Promise((resolve, reject) => {
    membersModel.find({}, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.length == 0) {
          let resp = await membersDAL.getAllMembersFromRestApi();
          let members = resp.data.map((member) => {
            return {
              name: member.name,
              email: member.email,
              city: member.address.city,
            };
          });
          await membersModel.insertMany(members);
        }
        resolve(data);
      }
    });
  });
};

const getMemberByID = async (memberID) => {
  return new Promise((resolve, reject) => {
    membersModel.findById(memberID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const addMember = async (memberData) => {
  return new Promise((resolve, reject) => {
    let member = new membersModel({ ...memberData });

    member.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const updateMember = async (memberID, memberData) => {
  return new Promise((resolve, reject) => {
    console.log(memberData);
    membersModel.findByIdAndUpdate(memberID, memberData, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const deleteMember = async (memberID) => {
  return new Promise((resolve, reject) => {
    membersModel.findByIdAndDelete(memberID, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberByID,
  addMember,
  updateMember,
  deleteMember,
};
