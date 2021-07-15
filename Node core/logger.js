var url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

module.exports.log = log;
// module.exports.endPoint = url;
//or you can write it like this
//module.exports = log;
