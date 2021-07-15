const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Could not connect to mongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    author: "sahil",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {}
//Remove Course
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  const result = await Course.deleteMany({ _id: id });

  console.log(result);
}

removeCourse("60c9d0ec97263b0e88068c15");
