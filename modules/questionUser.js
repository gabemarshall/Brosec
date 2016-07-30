var prompt = require('prompt'),
    os = require('os'),
    log = require('cli-color'),
    web = require("./webserver/webserver.js"),
    settings = require('./settings.js'),
    db = require('../db/db'),
    currentOS = os.type(),
    netcat = require('./nc'),
    finalAnswer = [];

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
                finalAnswer = JSON.stringify(finalAnswer);
                callback(finalAnswer);
            } else {
                finalAnswer = JSON.stringify(finalAnswer);
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }
    })
}

exports.ncat = function(callback) {
  var port = db.getConfig("LPORT")
  if (!port){
    console.log(log.red("[!] Missing required variable LPORT"));
    console.log("Have you tried the "+log.green("help")+" command?");
    return false;
  }
    prompt.message = "Should I start a tcp listener on port "+port+" for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase()
            if (result._ === "Y" || !result._) {
              finalAnswer = JSON.stringify(finalAnswer);
              callback(finalAnswer);
              console.log(log.blackBright("\n[*] TCP socket server listening on port " + port));
              netcat.listen(port);
            } else {
                finalAnswer = JSON.stringify(finalAnswer);
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }

    })

}

exports.ncatReceiveFile = function(callback) {
  var port = db.getConfig("LPORT");
  if (!port){
    console.log(log.red("[!] Missing required variable LPORT"));
    console.log("Have you tried the "+log.green("help")+" command or read the wiki?");
    return false;
  }
  var path = process.cwd()+"/";
  var localFile = finalAnswer[0].replace(/(\/)/g, "_")

    prompt.message = "Should I start a tcp listener on port "+port+" for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        try {
            result._ = result._.toUpperCase()
            if (result._ === "Y" || !result._) {
                    finalAnswer = JSON.stringify(finalAnswer);
                    callback(finalAnswer);
                    console.log(log.blackBright("\n[*] TCP socket server listening on port " + port + " (File will be saved as "+path+localFile+")\n"));

                    netcat.receiveFile(port, path, localFile);

            } else {
                finalAnswer = JSON.stringify(finalAnswer);
                callback(finalAnswer);
            }
        } catch (err) {
            console.log("\nLater bro!");
        }
    })

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
                    finalAnswer.push(result._);
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
                    finalAnswer = JSON.stringify(finalAnswer);
                    callback(finalAnswer);
                }
            }
        }
    }, 500)
}
