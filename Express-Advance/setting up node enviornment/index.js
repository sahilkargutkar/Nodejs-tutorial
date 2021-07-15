const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/courses", courses);
app.use("/", home);

app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating....");
  next();
});

//Configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail password:" + config.get("mail.password"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port : ${port}`);
});

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
