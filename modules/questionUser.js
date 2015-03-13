var prompt = require('prompt');

exports.ask = function(question, description, callback) {

    prompt.message = question + " :"

    prompt.get([{
        name: '_',
        description: description
    }], function(err, result) {
        try {
            callback(result._)
        } catch (err) {
            console.log("\nLater bro!")
        }
    })

}
