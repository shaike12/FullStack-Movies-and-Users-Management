const membersBL = require("../models/membersBL");
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
    let members = await membersBL.getMembers();

    res.json(members);
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
    let member = await membersBL.getMemberByID(req.params.id);

    res.json(member);
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
    let member = await membersBL.addMember(req.body);
    res.json(member);
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
    let member = await membersBL.updateMember(req.params.id, req.body);
    res.json(member);
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
    let member = await membersBL.deleteMember(req.params.id);
    res.json(member);
  });
});

module.exports = router;
