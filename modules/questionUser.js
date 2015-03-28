var prompt = require('prompt');
var web = require("./webserver/webserver.js")
var finalAnswer;

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
                callback(finalAnswer);
            }
        }
    }, 25)
}
