const subscriptionsBL = require("../models/subscriptionsBL");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const PRIVET_SECRET_KEY = "mySecret";
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, PRIVET_SECRET_KEY, async function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    let subscriptions = await subscriptionsBL.getSubscriptions();
    res.json(subscriptions);
  });
});

router.get("/:id", async (req, res) => {
  const PRIVET_SECRET_KEY = "mySecret";
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, PRIVET_SECRET_KEY, async function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    let subscription = await subscriptionsBL.getSubscriptionByID(req.params.id);
    res.json(subscription);
  });
});

router.post("/", async (req, res) => {
  const PRIVET_SECRET_KEY = "mySecret";
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, PRIVET_SECRET_KEY, async function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    let subscription = await subscriptionsBL.addSubscription(req.body);
    res.json(subscription);
  });
});

router.put("/:id", async (req, res) => {
  const PRIVET_SECRET_KEY = "mySecret";
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, PRIVET_SECRET_KEY, async function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    let subscription = await subscriptionsBL.updateSubscription(
      req.params.id,
      req.body
    );
    res.json(subscription);
  });
});

router.delete("/:id", async (req, res) => {
  const PRIVET_SECRET_KEY = "mySecret";
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, PRIVET_SECRET_KEY, async function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    let subscription = await subscriptionsBL.deleteSubscription(req.params.id);
    res.json(subscription);
  });
});

module.exports = router;
