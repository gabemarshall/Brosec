var prompt = require('prompt'),
    os = require('os'),
    log = require('cli-color'),
    web = require("./webserver/webserver.js"),
    settings = require('../settings.js'),
    db = require('../db/db'),
    currentOS = os.type(),
    finalAnswer

if (currentOS !== 'Darwin' && currentOS !== 'Linux'){
    console.log("The Brosec netcat initializer is currently not supported in Windows, sorry bro.")
} else {
   var kexec = require('kexec');
}

exports.http = function(callback) {
    prompt.message = "Should I fire up a web server for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        result._ = result._.toUpperCase()
        if (result._ === "Y") {
            var server = web.init();
            callback(finalAnswer);
        } else {
            callback(finalAnswer);
        }
    })
}

exports.ncat = function(callback) {
    prompt.message = "Should I start a netcat listener for you? (Y/n) :"
    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        result._ = result._.toUpperCase()
        if (result._ === "Y") {
            var port = db.getConfig("LPORT")

            // kexec currently does not support windows
            // if user is using windows, send them a nice error msg :/
            if (currentOS !== 'Darwin' && currentOS !== 'Linux'){
                console.log("Sorry, currently this feature is unavailable in Windows. You'll have to manually start netcat: (Ex: netcat -lnp %s -vv", port);
            } else {

                console.log(log.blackBright("\n[*] Initializing hacking sequence\n"))
                callback(finalAnswer);
                kexec(settings.netcat+" -lnp "+port+" -vv");

            } 
            
        } else {
            callback(finalAnswer);
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
                if(typeof(question[temp - 1]) === "string"){
                    callback(finalAnswer);
                }
            }
        }
    }, 500)
}
