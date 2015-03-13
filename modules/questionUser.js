var prompt = require('prompt');

exports.ask = function(question, callback, noexit) {

    prompt.message = question + " :"

    prompt.get([{
        name: '_',
        description: ":"
    }], function(err, result) {
        try {
        	if (noexit){
        		// In some payloads we don't want to exit the menu system
        		callback(1)
        	}
        	else {
        		callback(result._)
        	}
        } catch (err) {
            console.log("\nLater bro!")
        }
    })

}
