var os = require('os'),
	interfaces = os.networkInterfaces(),
    prompt = require('prompt'),
    db = require('../db/db'),
    log = require('./log');
    menu = require('./menu'),
  	secondaryMenu = require("./secondaryMenu"),
  	check = require('./inputChecks');

exports.getAllInterfaces = function(){
    var ipArray = [];
    Object.keys(interfaces).forEach(function(key) {
        interfaces[key].forEach(function(details) {
            if (details.family == 'IPv4') {
                ipArray.push(details.address);
            }
        });
    });
    return ipArray;
}

exports.setlhost = function(bool) {

	var ipArray = exports.getAllInterfaces();

    console.log(log.yellow("\nThe following interfaces are currently available:\n"));
    for (i=0;i<ipArray.length;i++){
    	console.log(i+1+". "+ipArray[i]);
    }

    prompt.message = "\nWhich would you like to set as LHOST? :"

    prompt.get([{
        name: '_',
        description: '(1-' + ipArray.length + ')'
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase();
            var choice = parseInt(result._) - 1
            if (bool){
            	console.log("Damn")
            } else {
            	check.allInputChecks("SET LHOST "+ipArray[choice], console.log, menu.mainMenu);
            }

        } catch (err) {
            console.log("\nLater bro!");
        }
    })
}
