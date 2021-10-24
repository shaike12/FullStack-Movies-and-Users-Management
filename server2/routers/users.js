const usersBL = require("../models/usersBL");
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
    let users = await usersBL.getUsers();
    res.json(users);
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
    let user = await usersBL.getUserByID(req.params.id);
    res.json(user);
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
    let user = await usersBL.addUser(req.body);
    res.json(user);
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
    let user = await usersBL.updateUser(req.params.id, req.body);
    res.json(user);
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
    let user = await usersBL.deleteUser(req.params.id);
    res.json(user);
  });
});

module.exports = router;
