const moviesBL = require("../models/moviesBL");
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
    let movies = await moviesBL.getMovies();
    res.json(movies);
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
    let movie = await moviesBL.getMovieByID(req.params.id);
    res.json(movie);
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
    let movie = await moviesBL.addMovie(req.body);
    res.json(movie);
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
    let movie = await moviesBL.updateMovie(req.params.id, req.body);
    res.json(movie);
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
    let movie = await moviesBL.deleteMovie(req.params.id);
    res.json(movie);
  });
});

module.exports = router;
