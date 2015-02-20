var prompt = require('prompt');

exports.new = function(question, description, callback){
	prompt.message = question+" :"
	prompt.get([{name: '_', description: description}], function(err, result){
		callback
	})
	return
}