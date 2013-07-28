/*jshint: laxcomma:true */

var fs = require('fs');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var hostname = require('os').hostname();
var express = require('express');
var routes = require('./routes');
var path = require('path');
var cfg = require(path.join(__dirname, 'configuration', "config"));
var app = express();
var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
var Logger = require('winston');
var npid = require('npid');


if (cluster.isMaster) {
  Logger.log("Master is forking workers");
  for (var i=0; i<numCPUs; ++i) {
    cluster.fork();
  }
  return;
}

npid.create(path.join(__dirname, "pids", ("pid." + process.pid) ));

Logger.log("Initiating worker, pid:" + process.pid);


app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


subcategory_ids = [  ];

app.get('/ping', routes.ping);

app.listen(app.get('port'), function(){
  Logger.log("Express".green.bold + " server listening on port " + (app.get('port')+ "").green.bold);
});

Logger.log("Started.");
