var utilities = require('./utilities'),
    output = require('./output'),
    htmlEncode = require('js-htmlencode').htmlEncode,
    htmlDecode = require('js-htmlencode').htmlDecode,
    log = require('./log');

module.exports = function(args) {
    var m = args[0].toLowerCase();
    if (m === "enc"){
    	m = "encode";
    } else if (m === "dec"){
    	m = "decode";
    }
    var payload = args[1];
    var mod1 = args[2];

    var mod2 = args[3];
    var method;

    if (parseInt(mod1[mod1.length-1]) && mod1 != "base64" && mod1 != "md5" && mod1 != "sha1" && mod1 != "sha256"){
    	mod2 = mod1[mod1.length-1];
    	mod1 = mod1[0];
    }
    
    if (!mod2) {
        mod2 = 1;
    }
    switch (mod1) {
        case "u": case "url":
        	if (m === "encode"){
        		method = utilities.urlencode;	
        	} else {
        		method = decodeURIComponent;
        	}
            break;
        case "h": case "html":
            if (m === "encode"){
            	method = htmlEncode;
            } else {
            	method = htmlDecode;
            }
            break;
        case "b": case "b64": case "base64":
        	if (m === "encode"){
        		method = utilities.base64Encode;
        	} else {
        		method = utilities.base64Decode;
        	}
            break;
        case "hex":
            if (m === "encode"){
                method = utilities.ascii2hex;
            } else {
                method = utilities.hex2ascii;
            }
            break;
        case "m": case "md5":
            method = utilities.md5;
            break;
        case "sha1":
            method = utilities.sha1;
            break;
        case "sha256":
            method = utilities.sha256;
            break;
        default:
            log.error("Invalid argument passed to encoder, please try again.");
            break;
    }

    try {
        for (i = 0; i < mod2; i++) {
            payload = method(payload)
        }
        output.cmd(payload, true);
    } catch (err) {
        log.error("Invalid argument passed to encoder, please try again.");
    }


}
