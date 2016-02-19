var child_process = require('child_process'),
	log = require('./log.js'),
	brosDir = require.resolve('cli-color');

// Get install path
brosDir = brosDir.split("node_modules");
brosDir = brosDir[0];

exports.update = function(){
  console.log("Checking for updates...")

  require('simple-git')(brosDir)
       .pull(function(err, update) {
          if(update && update.summary.changes) {
            if(update.summary.changes > 0){
              require('child_process').exec('npm restart && npm install');
              console.log(log.okay("Done, you're now up to date!"));
            } else {
              console.log(log.okay("No updates were found, you're up to date!"));
            }
          } else {
            console.log(log.okay("No updates were found, you're up to date!"));
          }
       })

}
