let subscriptionsModel = require("./subscriptionsModel");

const getAllSubscriptions = async () => {
  return new Promise((resolve, reject) => {
    subscriptionsModel.find({}, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSubscriptionByID = async (subscriptionID) => {
  return new Promise((resolve, reject) => {
    subscriptionsModel.find({memberId: subscriptionID}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const addSubscription = async (subscriptionData) => {
  return new Promise((resolve, reject) => {
    let subscription = new subscriptionsModel({ ...subscriptionData });

    subscription.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const updateSubscription = async (memberID, subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionsModel.updateOne(
      {memberId: memberID},
      subscriptionData,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

const deleteSubscription = async (subscriptionID) => {
  return new Promise((resolve, reject) => {
    subscriptionsModel.deleteOne({memberId: subscriptionID}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionByID,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
