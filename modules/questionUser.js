var prompt = require('prompt'),
    os = require('os'),
    log = require('cli-color'),
    web = require("./webserver/webserver.js"),
    settings = require('../settings.js'),
    db = require('../db/db'),
    currentOS = os.type(),
    checkModule = require('./checkModule.js'),
    finalAnswer

if (checkModule.kexec()) {
    var kexec = require('kexec');
}

exports.http = function(callback) {
    prompt.message = "Should I fire up a web server for you? (Y/n) :"

    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase();
            if (result._ === "Y" || !result._) {
                var server = web.init();
                callback(finalAnswer);
            } else {
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }
    })
}

exports.ncat = function(callback) {
  var port = db.getConfig("LPORT")
  if (kexec){
    prompt.message = "Should I start a netcat listener for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase()
            if (result._ === "Y" || !result._) {
              console.log(log.blackBright("\n[*] Initializing hacking sequence (" + settings.netcat + " -lnp " + port + " -vv)"));
              callback(finalAnswer);
              kexec(settings.netcat + " -lnp " + port + " -vv");
            } else {
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }

    })
  } else {
    console.log("");
    console.log(log.blackBright("[*] To start a netcat listener, run the following => " + settings.netcat + " -lnp " + port + " -vv"));
    callback(finalAnswer);
  }
}

exports.ncatReceiveFile = function(callback) {
  var port = db.getConfig("LPORT");
  var path = db.getConfig("PATH");
  var localFile = finalAnswer.replace(/(\/)/g, "_")

  if (!kexec){
    prompt.message = "Should I start a netcat listener for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase()
            if (result._ === "Y" || !result._) {


                if (!path || path.length <= 0) {
                    log.yellow("Warning: Path variable is not set, defaulting to /var/tmp/")
                }
                path = "/var/tmp/"

                    // if kexec isn't installed, notify the user
                    callback(finalAnswer);

                    console.log(log.blackBright("\n[*] Initializing hacking sequence (File will be saved as " + path + "/bros" + localFile + ")\n"))
                    kexec(settings.netcat + " -lnp " + port + " > " + path + "/bros" + localFile + " -vv");

            } else {
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }
    })

  } else {
    callback(finalAnswer);
    console.log("");
    console.log(log.blackBright("[*] To start a netcat listener, run the following => " + settings.netcat + " -lnp " + port + " > " + path + "/bros" + localFile));
  }
}

exports.some = function(question, callback, type) {

    var init = 0;
    var temp = 0;

    var counter = question.length;

    var ask = function(q) {
        if (typeof q === "string") {
            prompt.message = q;
            prompt.get([{
                name: '_',
                description: ":"
            }], function(err, result) {

                if (err) {
                    console.log(err);
                } else {
                    finalAnswer = result._;
                    temp += 1;
                }

            })
        } else {
            temp += 1;
            q(callback);
        }

    }

    ask(question[temp])

    var checkStatus = setInterval(function() {
        if (init === temp) {

        } else {
            if (temp < question.length) {
                ask(question[temp]);
                init += 1;
            } else {
                clearInterval(checkStatus);
                // If the last question is a string, send output to final parsing
                if (typeof(question[temp - 1]) === "string") {
                    callback(finalAnswer);
                }
            }
        }
    }, 500)
}
