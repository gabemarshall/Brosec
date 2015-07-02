var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	db = require('../../db/db'),
	log = require('cli-color'),
	path = require('path'),
	blue = log.cyan,
	black = log.blackBright,
	os = require('os'),
	exec = require('child_process').exec;


app.use(morgan('combined'));
app.use(express.static(__dirname + '/pubs'));
app.set('views', path.join(__dirname, '/priv'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Come at me bro!');
})

app.get('/send.dtd', function(req, res){
	res.setHeader('content-type', 'application/xml-dtd');
	res.render('send.ejs', {
		lhost:lhost,
		lport:lport
	})
})

app.get('/inline.dtd', function(req, res){
	res.setHeader('content-type', 'application/xml-dtd');
	res.render('inline.ejs', {
		lhost:lhost,
		lport:lport
	})
})

exports.init = function(callback, a1){
	

	// refactor this into a module at some point
	lhost = db.getConfig("LHOST");
	lport = db.getConfig("LPORT");

    // var currentOS = os.type()

    // if (currentOS === "Darwin"){
    //    exec("sed -i '' 's/\\([0-9]\\{1,3\\}\\.\\)\\{3\\}[0-9]\\{1,3\\}\\(\\:[0-9]\\{1,5\\}\\)/"+lhost+":"+lport+"/g' " + __dirname + '/pub/send.dtd'); 
    // }
    // else if (currentOS === "Linux"){
    //     exec("sed -i '' 's/\\([0-9]\\{1,3\\}\\.\\)\\{3\\}[0-9]\\{1,3\\}\\(\\:[0-9]\\{1,5\\}\\)/"+lhost+":"+lport+"/g' " + __dirname + '/pub/send.dtd'); 
    // }
    // else {
    //     console.log("Brosec alters DTD files on the fly, but this feature isn't available on Windows at the moment ;(");
    // }


	
	var server = app.listen(lport, function () {
	  console.log('\n'+black('[*]')+' A web server is running on port %s (ctrl c to stop)', lport);
	})

}


