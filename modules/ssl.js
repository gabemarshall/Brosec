var exec = require('child_process').exec,
  fs = require('fs'),
  prompt = require('prompt');

module.exports = function(initSSL){
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
