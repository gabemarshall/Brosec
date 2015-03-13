var prompt = require('prompt');
var web = require("./webserver.js")

exports.ask = function(question, callback, type) {

    prompt.message = question + " :"

    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {
        try {
        	switch (type){
        		case "noexit":
        			callback(1);
        			break;
        		case "web":
        			console.log("Debug web")
					result._ = result._.toUpperCase()
					if (result._ === "Y"){
						var server = web.init(callback)
					}
					else {
						callback(result._)
					}
					break;
				case "ncat":
					console.log("Debug netcat");
					break;
                case "multiple":
                    console.log("Debug multiple");
				default:
					callback(result._);
					break;
        	}
      
        } catch (err) {
            console.log("\nLater bro!")
        }
    })

}
