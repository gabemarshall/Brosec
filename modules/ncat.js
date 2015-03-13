var sys = require('sys');
var kexec = require('kexec');
var log = require('cli-color');
var os = require('os');
var prompt = require('prompt');
var db = require('../db/db');
var log = require('cli-color');
var black = log.blackBright;
var config = require('../config.js')

var currentOS = os.type()


exports.shell = function(callback, a1) {
    
    callback(a1)

    var port = db.getConfig("LPORT")

    // kexec currently does not support windows
    // if user is using windows, send them a nice error msg :/
    if (currentOS != 'Darwin' && currentOS != 'Linux'){
        console.log("Sorry, currently this feature is unavailable in Windows. You'll have to manually start netcat: (Ex: netcat -lnp %s -vv", port);
    }
    else {
        console.log('\n'+black('[*]')+' Initializing a netcat listener.. (ctrl c to stop)\n');
        kexec(config.netcat+" -lnp "+port+" -vv");

    } 



}

exports.file = function(callback, a1) {
    
    callback(a1)
    
    var filename = a1
    
    try {
	    filename = a1.split("/")
	    filename = filename.pop()	
    }
    catch (err)
    {
    	// Do nothing
    }


    var port = db.getConfig("LPORT")

    console.log(black('\n[*] Waiting to receive "'+filename+'"'))
    kexec(config.netcat+" -lnp "+port+" > "+filename+" -vv");
    
    

    


}


exports.Init = function(returnToPrepare, msg, type){
    
    if (msg){
       
        prompt.message = msg
        prompt.get([{name: '_', description: ':'}], function(err, result){
            var a1 = result._
            prompt.message = "Should I start a netcat listener for you? (Y/n)"

            prompt.get([{name: '_', description: ':'}], function(err, result){
                result._ = result._.toUpperCase()
                if (result._ === "Y"){
                    if (type === "shell"){
                        var server = exports.shell(returnToPrepare,a1)
                    }
                    else {
                        var server = exports.file(returnToPrepare,a1)
                    }
                    
                }
                else {
                    returnToPrepare(a1)
                }
                
            })
        })  
    }
    else {

        prompt.message = "Should I start a netcat listener for you? (Y/n)"

        prompt.get([{name: '_', description: ':'}], function(err, result){
            result._ = result._.toUpperCase()
            if (result._ === "Y"){
                var server = exports.shell(returnToPrepare)
            }
            else {
                returnToPrepare()
            }
            
        })
    }

}


