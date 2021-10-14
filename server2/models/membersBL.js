const apiDAL = require("../Dals/apiDAL");

const getMembers = async () => {
  let resp = await apiDAL.getAllDocs("members");
  return resp.data;
};

const getMemberByID = async (id) => {
  let resp = await apiDAL.getDocByID("members", id);
  return resp.data;
};

const addMember = async (member) => {
  let resp = await apiDAL.addDoc("members", member);
  return resp.data;
};

const updateMember = async (memberID, member) => {
  let resp = await apiDAL.updateDoc("members", memberID, member);
  return resp.data;
};

const deleteMember = async (memberID) => {
  let resp = await apiDAL.deleteDoc("members", memberID);
  return resp.data;
};

module.exports = {
  getMembers,
  getMemberByID,
  addMember,
  updateMember,
  deleteMember,
};
