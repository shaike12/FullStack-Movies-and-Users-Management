const apiDAL = require("../Dals/apiDAL");

const getSubscriptions = async () => {
  let resp = await apiDAL.getAllDocs("subscriptions");
  return resp.data;
};

const getSubscriptionByID = async (id) => {
  let resp = await apiDAL.getDocByID("subscriptions", id);
  return resp.data;
};

const addSubscription = async (subscription) => {
  let resp = await apiDAL.addDoc("subscriptions", subscription);
  return resp.data;
};

const updateSubscription = async (subscriptionID, subscription) => {
  let resp = await apiDAL.updateDoc(
    "subscriptions",
    subscriptionID,
    subscription
  );
  return resp.data;
};

const deleteSubscription = async (subscriptionID) => {
  let resp = await apiDAL.deleteDoc("subscriptions", subscriptionID);
  return resp.data;
};

module.exports = {
  getSubscriptions,
  getSubscriptionByID,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
