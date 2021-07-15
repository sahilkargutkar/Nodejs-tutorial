const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort({ name: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function run() {
  const course = await getCourses();
  console.log(course);
}

run();
