var sys = require('sys');
var exec = require('child_process').exec;
var log = require('cli-color');
var os = require('os');
var menu = require('./menu');
var red = log.red

var warn = function(){
    console.log(red("\nError: Missing required variable. See \"help\" for more information."))
    menu.mainMenu()
}

exports.cmd = function(input){

    //input = input.replace(/(\\)/gi,"")
    // Hack to include payloads with lots of forward slashes
    // input = input.replace(/(@@)/gi,"\\")
    
    if (input.match(/(\\)/gi)){
        console.log(log.yellow('\n'+input+'\n'))
        input = input.replace(/(\\)/gi,"\\\\")
    }
    else {
        console.log(log.yellow('\n'+input+'\n'))
    }
    input = input.replace(/(\$)/gi,"\\\$")
    input = input.replace(/(")/gi,"\\\"")

    var currentOS = os.type()

    if (currentOS === "Darwin"){
       exec("printf \"%s\" \""+input+"\"| pbcopy", print); 
    }
    else if (currentOS === "Linux"){
        exec("printf \"%s\" \""+input+"\"| xclip -selection clipboard", print);
    }
    else {
        exec("echo \""+input+"\" | clip", print);
    }

    console.log(log.green('Output copied to clipboard!'));
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
                payload = payload.replace(/((<(PROMPT)\s*?.*?>))/gi, userResponse)
                //payload = payload.replace(/(\\)/gi,"@@")
            } else {
                tmenu()
                return
            }
            
        }

        payload = payload.replace(/((<(LHOST)\s*?.*?>))/gi, lhost)
        payload = payload.replace(/((<(LPORT)\s*?.*?>))/gi, lport)
        payload = payload.replace(/((<(RHOST)\s*?.*?>))/gi, rhost)
        payload = payload.replace(/((<(RPORT)\s*?.*?>))/gi, rhost)
        payload = payload.replace(/((<(USER)\s*?.*?>))/gi, user)
        payload = payload.replace(/((<(PATH)\s*?.*?>))/gi, path)

        payload = payload.replace(/(')/gi, "\\'")
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

