var sys = require('util');
var exec = require('child_process').exec;
var log = require('cli-color');
var os = require('os');
var menu = require('./menu');
var ncp = require("./copy-paste");
var red = log.red

var warn = function(){
    setTimeout(function(){
      console.log(red("\nError: Missing required variable. See \"help\" for more information."));
    },50)
}

exports.cmd = function(input, encoder){
  try {
    ncp.copy(input, function () {
        console.log(log.yellow('\n'+input+'\n'));
        if (encoder){
          process.exit(1);
        }
    })
  } catch(err){
    console.log(log.red(err));
    process.exit(1);
  }
}

exports.prepare = function(payload, lhost, lport, rhost, rport, user, path, callback, tmenu){

    if(callback){
        callback(prepPayload, lhost, lport, rhost, rport, user, path)
    }
    else {
        prepPayload()
    }

    function prepPayload(userResponse){
        if(userResponse){
            if(typeof(userResponse) === "string"){
                try {
                  var t = JSON.parse(userResponse)
                  if (t.length > 1){
                    for (i=0;i<t.length;i++){
                        payload = eval("payload.replace(/((<(PROMPT)\\s*?.*?>))/i, t["+i+"])");
                    }
                  } else {
                    payload = payload.replace(/((<(PROMPT)\s*?.*?>))/gi, t[0]);
                  }
                } catch (err){
                  console.log(userResponse);
                  payload = payload.replace(/((<(PROMPT)\s*?.*?>))/gi, userResponse);
                }


            } else if (typeof(userResponse) === "object"){

            } else {
                //tmenu()
                //return
            }

        }

        payload = payload.replace(/((<(LHOST)\s*?.*?>))/gi, lhost)
        payload = payload.replace(/((<(LPORT)\s*?.*?>))/gi, lport)
        payload = payload.replace(/((<(RHOST)\s*?.*?>))/gi, rhost)
        payload = payload.replace(/((<(RPORT)\s*?.*?>))/gi, rport)
        payload = payload.replace(/((<(USER)\s*?.*?>))/gi, user)
        payload = payload.replace(/((<(PATH)\s*?.*?>))/gi, path)

        if(payload.match(/undefined/)){
            warn()
            return false;
        }
        exports.cmd(payload)
    }



}

function print(error, stdout, stderr) {
  console.log(stdout)
}
