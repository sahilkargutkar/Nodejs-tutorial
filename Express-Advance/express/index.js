const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const logger = require("./logger");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating....");
  next();
});

//Configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail password:" + config.get("mail.password"));

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

app.get("/api/posts/:year/:date", (req, res) => {
  res.send(req.query);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.string().validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port : ${port}`);
});

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
