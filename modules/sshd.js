var fs = require('fs'),
  exec = require('child_process').exec,
  prompt = require('prompt'),
  path = '/var/tmp/bros.rsa';

function generateRSA(){
  prompt.message = "Should Brosec generate some generic SSH keys? (Y/n):"

  prompt.get([{
      name: '_',
      description: ":"
  }], function(err, result) {

      try {
          result._ = result._.toUpperCase();
          if (result._ === "Y" || !result._) {
            console.log("Creating /var/tmp/bros.rsa & /var/tmp/bros.rsa.pub");
            exec('ssh-keygen -f /var/tmp/bros.rsa -t rsa -N ""', function(){
                
            });

          } else {
              console.log("\nLater bro!");
          }
      } catch (err) {
          console.log("\nLater bro!");
      }
  })
}


exports.logger = function(args) {
var ssh2 = require('ssh2');
var port;
    try {
        port = args.port;
    } catch (err) {
        port = 2121;
    }
    if (args.path){
      path = args.path;
    }
    try {
      new ssh2.Server({
          hostKeys: [fs.readFileSync(path)]
      }, function(client) {
          console.log('Client connected from '+client._sock._peername.address);

          client.on('authentication', function(ctx) {
              if (ctx.method === 'password') {
                  console.log("USER: " + ctx.username);
                  console.log("PASS: " + ctx.password);
                  fs.appendFile('ssh_log.txt', "USER: " + ctx.username + "\nPASS: " + ctx.password + "\n", function(err) {

                  });
              }
              ctx.reject();
          }).on('end', function() {});
      }).listen(port, '0.0.0.0', function() {
          console.log('SSH connection logger listening on port ' + this.address().port);
      });
    } catch (err){
      console.log("Brosec checks for an ssh key in /var/tmp/bros.rsa. You can also specify a custom path (--path=/to/key)");
      console.log("Ex: bros sshd --port=2222 --path=/home/user/.ssh/id_rsa");
      generateRSA();
    }


}