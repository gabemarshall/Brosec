var prompt = require('prompt');

exports.new = function(question, description, server){
	prompt.message = question+" :"
	prompt.get([{name: '_', description: description}], function(err, result){
	
	})
	return
}