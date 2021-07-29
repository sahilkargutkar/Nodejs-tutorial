const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
jwtKey = "jwt";

mongoose
  .connect("mongodblink", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.warn("connected");
  });

app.get("/", function (req, res) {
  res.end("Hello");
});

app.post("/register", jsonParser, function (req, res) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // console.log(hash);
    const data = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    data
      .save()
      .then((response) => {
        jwt.sign({ response }, jwtKey, { expiresIn: "300s" }, (err, token) => {
          res.status(201).json({ token });
        });

        // res.status(201).json({
        //   message: "User successfully created!",
        //   result: response,
        // });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});

app.post("/login", jsonParser, async function (req, res) {
  // User.findOne({ email: req.body.email }).then((data) => {
  //   res.json(data);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      jwt.sign({ response }, jwtKey, { expiresIn: "300s" }, (err, token) => {
        res.status(201).json({ token });
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

app.get("/users", verifyToken, function (req, res) {
  User.find().then((result) => {
    res.status(200).json(result);
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    console.log(bearer[1]);
    req.token = bearer[1];

    jwt.verify(req.token, jwtKey, (err, data) => {
      if (err) {
        res.json({ result: err });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Token is not provided" });
  }
}

app.listen(3000);
