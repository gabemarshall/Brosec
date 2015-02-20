var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.blue
var black = log.blackBright
var green = log.green
var red = log.red

// Payload Array
arrayWin = []
var addPayload = arrayWin.push

// title, description, payload, category, and callback (optional: used for additional options if needed)

// ############### DNS ######################

arrayWin.push({
	title: "DNS Zone XFER",
	payload: "dig @$$RHOST$$ $$PROMPT$$ -t AXFR",
	sample: "dig @"+yellow("<dns server>")+blue(" <domain>")+" -t AXFR",
	category: "DNS",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What domain would you like to use? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}

})



var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayWin,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayWin.length;i++){
			if (arrayWin[i].category === value){
				tempArray.push(arrayWin[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayWin.length;i++){
			if(unique[arrayWin[i].category]){

			}
			else {
				unique[arrayWin[i].category] = true;
				uniqueCategories.push(arrayWin[i].category)
			} 
		return uniqueCategories
		}
	}
}
