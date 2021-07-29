const dboperations = require("./dboperations");
var Db = require("./dboperations");
var Order = require("./order");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { request } = require("express");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.route("/orders").get((req, res) => {
  dboperations.getOrders().then((result) => {
    res.json(result[0]);
  });
});
router.route("/orders/:id").get((req, res) => {
  dboperations.getOrder(request.params.id).then((result) => {
    res.json(result[0]);
  });
});

router.route("/orders").post((req, res) => {
  let order = { ...request.body };

  dboperations.addOrder(order).then((result) => {
    res.status(201).json(result);
  });
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Order Api is running at" + port);
