const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersBL = require("../models/usersBL");

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let users = await usersBL.getUsers();
  let user = users.find((user) => user.username === username);

  if (user) {
    if (user.password !== password) {
      res.json({ auth: false, message: "Password is Incorrect" });
    }
    let token = jwt.sign({ id: user._id }, "mySecret", { expiresIn: 7200 });
    res.json({ auth: true, token: token, user: user });
  } else {
    res.json({ auth: false, message: "Username is Incorrect" });
  }
});

module.exports = router;
