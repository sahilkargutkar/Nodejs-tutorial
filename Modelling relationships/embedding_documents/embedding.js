const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    { $unset: { author: "" } }
  );
}

async function updateCourse(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  author.save();
  console.log(await course.save());
}

removeAuthor("60d061966d0ced1c48b7d408", "60d062c7af8939119c76851e");
// addAuthor("60d061966d0ced1c48b7d408", new Author({ name: "Sahil" }));

// updateAuthor("60d0393277171200c48f0e30");

// createCourse("Node Courses", new Author({ name: "Sahil" }));

// async function addAuthor(courseId, author) {
//   const course = await Course.findById(courseId);
//   course.authors.push(author);
//   console.log(await course.save());
// }

// removeAuthor("5b8d9c752af5cb7130206e55", "5b8d9d3412a2833fc45382d2");
// addAuthor('5b8d9c752af5cb7130206e55', new Author({ name: 'Amy' }))
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Josh" }),
// ]);
// updateCourse('5b8d857af88923ade835645c');
