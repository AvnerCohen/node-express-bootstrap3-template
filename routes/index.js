var path = require("path");
var cfg = require(path.join(__dirname, '..' , 'configuration', "config"));

exports.index = function(req, res){
  res.render('index', { title: cfg.application.title});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};