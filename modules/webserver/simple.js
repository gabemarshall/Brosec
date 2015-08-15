exports.init = function(argv) {

  var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    hostname = process.env.HOSTNAME || 'localhost',
    ecstatic = require('ecstatic'),
    color = require('cli-color'),
    publicDir = process.cwd(),
    log = require('../log.js'),
    port;

  try {
      port = argv._[1];
      if (!port){
        port = 8000
      }
  } catch (err){
      port = 8000
  }

  app.use(morgan('combined'));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(ecstatic({
    root: publicDir
  }));

  log.status(" [*] An http server is serving "+publicDir+" on port "+port+" (ctrl c to stop)");
  app.listen(port, hostname);

}
