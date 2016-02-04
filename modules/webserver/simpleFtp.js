var ftpd = require('ftpd');
var fs = require('fs');
var path = require('path');
var log = require('../log.js');
var keyFile;
var certFile;
var server;
var options = {
  host: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 7002,
  tls: null,
};

// if (process.env.KEY_FILE && process.env.CERT_FILE) {
//   console.log('Running as FTPS server');
//   if (process.env.KEY_FILE.charAt(0) !== '/') {
//     keyFile = path.join(__dirname, process.env.KEY_FILE);
//   }
//   if (process.env.CERT_FILE.charAt(0) !== '/') {
//     certFile = path.join(__dirname, process.env.CERT_FILE);
//   }
//   options.tls = {
//     key: fs.readFileSync(keyFile),
//     cert: fs.readFileSync(certFile),
//     ca: !process.env.CA_FILES ? null : process.env.CA_FILES
//       .split(':')
//       .map(function(f) {
//         return fs.readFileSync(f);
//       }),
//   };
// } else {
//   console.log();
//   console.log('*** To run as FTPS server,                 ***');
//   console.log('***  set "KEY_FILE", "CERT_FILE"           ***');
//   console.log('***  and (optionally) "CA_FILES" env vars. ***');
//   console.log();
// }

var startFtpServer = function(protocol){
  server = new ftpd.FtpServer(options.host, {

    getInitialCwd: function() {
      return '/';
    },
    getRoot: function() {
      return process.cwd();
    },
    pasvPortRangeStart: 1025,
    pasvPortRangeEnd: 1050,
    tlsOptions: options.tls,
    allowUnauthorizedTls: true,
    useWriteFile: false,
    useReadFile: false,
    uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
  });

  server.on('error', function(error) {
    console.log('FTP Server error:', error);
  });

  server.on('client:connected', function(connection) {
    var username = null;
    console.log('client connected: ' + connection.remoteAddress);
    connection.on('command:user', function(user, success, failure) {
      if (user) {
        username = user;
        success();
      } else {
        failure();
      }
    });

    connection.on('command:pass', function(pass, success, failure) {
      if (pass) {
        success(username);
      } else {
        failure();
      }
    });
  });

  server.debugging = 4;
  server.listen(options.port);
  console.log(" [*] An "+log.status("anonymous")+" "+protocol+" server is serving "+process.cwd()+" on port "+options.port+" (ctrl c to stop)");

}

exports.ftp = function(argv) {

  try {
      options.port = argv._[1];
      if (!port){
        options.port = 2121;
      }
  } catch (err){
      options.port = 2121;
  }

  startFtpServer("ftp");

}
