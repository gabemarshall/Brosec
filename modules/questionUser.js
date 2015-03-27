var prompt = require('prompt');
var web = require("./webserver/webserver.js")

exports.ask = function(question, callback, type) {

    prompt.message = question + " :"

    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {

        var returnValue = result._

        try {
            switch (type) {
                case "noexit":
                    callback(1);
                    break;
                case "web":
                    
                    prompt.message = "Should I fire up a web server for you? (Y/n) :"
                    prompt.get([{
                        name: '_',
                        description: ":"
                    }], function(err, result) {

                        result._ = result._.toUpperCase()
                        if (result._ === "Y") {
                            var server = web.init()
                            callback(returnValue)
                        } else {
                            callback(returnValue)
                        }
                    })

                    break;
                    
                default:
                    callback(result._);
                    break;
            }

        } catch (err) {
            console.log("\nLater bro!")
        }
    })

}
