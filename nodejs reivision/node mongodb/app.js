const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const User = require("./models/users");

mongoose.connect(
  "mongodb+srv://sahil_sk:2BDHJ5D79CpChqw@cluster0.gfbru.mongodb.net/tutorial?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/users", function (req, res) {
  User.find().then((data) => {
    res.json(data);
  });
});

app.post("/user", jsonParser, function (req, res) {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => console.warn(error));
});

app.delete("/user/:id", function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/user/:id", jsonParser, function (req, res) {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
      },
    }
  )
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/search/:name", function (req, res) {
  var regex = new RegExp(req.params.name, "i");
  User.find({ name: regex }).then((result) => {
    res.status(200).json(result);
  });
});
app.listen(3000);
