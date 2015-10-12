var express = require("express"),
  app = express(),
  exec = require('child_process').exec,
  fs = require('fs'),
  https = require('https'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  hostname = process.env.HOSTNAME || 'localhost',
  ecstatic = require('ecstatic'),
  color = require('cli-color'),
  publicDir = process.cwd(),
  log = require('../log.js'),
  os = require('os'),
  prompt = require('prompt'),
  interfaces = os.networkInterfaces(),
  port;

app.use(morgan('combined'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(ecstatic({
  root: publicDir
}));

var serverIsReady = function(protocol){
  console.log(" [*] An "+protocol+" server is serving "+publicDir+" on port "+port+" (ctrl c to stop)");
  Object.keys(interfaces).forEach(function (key) {
    interfaces[key].forEach(function (details) {
      if (details.family == 'IPv4') {
        console.log(log.status("\t"+protocol+"://" + details.address + ":" + port));
      }
    });
  });
}

exports.http = function(argv) {

  try {
      port = argv._[1];
      if (!port){
        port = 8000;
      }
  } catch (err){
      port = 8000;
  }

var options = {};

  var server = app.listen(port, function () {
    serverIsReady("http");
  })
}

exports.https = function(argv){

if (typeof(argv._[1])!= "number"){
  port = 8443;
} else {
  try {
      port = argv._[1];
      if (!port){
        port = 8443;
      }
  } catch (err){
      port = 8443;
  }
}

var initSSL = function(cert, key){
  options = {
    cert: cert,
    key: key
  }

  https.createServer(options, app).listen(port, function(){
    serverIsReady("https");
  });
}

var cert, key;

  try {
    if (argv.cert && argv.key){
      cert = fs.readFileSync(argv.cert);
      key = fs.readFileSync(argv.key);
    } else {
      cert = fs.readFileSync("/var/tmp/bros.cert");
      key = fs.readFileSync("/var/tmp/bros.key");
    }

    initSSL(cert, key);

  } catch(err){
    console.log("No SSL key/cert found (use --cert=/path/to/cert --key=/path/to/key to import your own)");
    prompt.message = "Should a create a self-signed cert on the fly? (Y/n):"

    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase();
            if (result._ === "Y" || !result._) {
              console.log("Creating /var/tmp/bros.cert & /var/tmp/bros.key");
              exec('openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Broing/L=Bro/O=Dis/CN=bros.brosec.bro" -keyout /var/tmp/bros.key -out /var/tmp/bros.cert', function(){
                  initSSL(fs.readFileSync("/var/tmp/bros.cert"), fs.readFileSync("/var/tmp/bros.key"));
              });
            } else {
                console.log("\nLater bro!");
            }
        } catch (err) {
            console.log("\nLater bro!");
        }
    })
  }
}
