var file_to_load = './config.json';
var cfg = require(file_to_load);
console.log("Loading env from:",file_to_load);
module.exports = cfg;