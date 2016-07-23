var net = require('net'),
    fs = require('fs');

exports.listen = function(port){
  var server = net.createServer({maxConnections: 1},function (socket) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
      socket.write(chunk);
    });

    socket.on('data', function (data) {
      process.stdout.write(data);
    });

    socket.on('end', function () {
      process.exit(1);
    });
  }).listen(port, '0.0.0.0');
  server.maxConnections = 1;
}

exports.receiveFile = function(port, path, file){

  var server = net.createServer({maxConnections: 1},function (socket) {

  var wstream = fs.createWriteStream(path+file);
  socket.on('data', function (data) {
    wstream.write(data);
  });

  socket.on('end', function () {
    wstream.end();
  });

  wstream.on('finish', function () {

  console.log('[+] File successfully saved to '+path+file);
  process.exit(1);
  });
}).listen(port, '0.0.0.0');

server.maxConnections = 1;
}
