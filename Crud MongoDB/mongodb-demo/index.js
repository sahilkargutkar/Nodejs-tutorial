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

async function getCourse() {
  //Comparison Query Operators

  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  // lt (less than)
  //lte (less than or equal to)
  //in
  //nin (not in)
  const course = await Course.find({ author: "sahil", isPublished: true })
    //.find({price:{$gte:10 ,$lte:20}})
    // .find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    .sort({ name: 1 }) // 1 means in asc and -1 means desc
    .select({ name: 1, tags: 1 }); //only give specific values
  console.log(course);

  //Logical operators

  //or
  //and
  const course = await Course.find()
    .or([{ author: "sahil" }, { isPublished: true }])
    // .find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    .sort({ name: 1 }) // 1 means in asc and -1 means desc
    .select({ name: 1, tags: 1 }); //only give specific values
  console.log(course);

  //REGEX
  const course = await Course

    //ends with kargutkar
    .find({ author: /Kargutkar$/i }) //i represents case insensitive
    //starts with sahil
    .find({ author: /^Sahil/ })
    //Contains sahil
    .find({ author: /.*sahil.*/i })

    .limit(10)
    .sort({ name: 1 }) // 1 means in asc and -1 means desc
    .select({ name: 1, tags: 1 }); //only give specific values
  console.log(course);
}
// createCourse();
getCourse();
