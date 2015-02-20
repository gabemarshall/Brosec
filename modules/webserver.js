var express = require('express')
var app = express()
var morgan = require('morgan')
var question = require('./questions.js')

app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

exports.init = function(callback){
	callback()
	var server = app.listen(3000, function () {

	  var host = server.address().address
	  var port = server.address().port
	  console.log("")
	  var q = question.new("", "༼ つ ◕_◕ ༽つ  :", server.close())
	  console.log('\n\nA web server is running at http://%s:%s (press return to stop)', host, port)

	})

	return server
}


