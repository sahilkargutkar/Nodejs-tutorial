const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users");

mongoose.connect("mongodblink", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/users", function (req, res) {
  User.find().then((data) => {
    res.json(data);
  });
});

app.post("/user", function (req, res) {
  res.send("Hello api wil be here");
});
app.listen(3000);
