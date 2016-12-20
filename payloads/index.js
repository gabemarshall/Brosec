var infog = require("./infogathering.js"),
	misc = require("./misc.js"),
	aux = require("./aux.js"),
	web = require("./web.js"),
	linux = require("./linux.js"),
	windows = require("./windows.js");

infog.getAll = function(value){
	return initializePayloads(infog, value);
}

misc.getAll = function(value){
	return initializePayloads(misc, value);
}

aux.getAll = function(value){
	return initializePayloads(aux, value);
}

web.getAll = function(value){
	return initializePayloads(web, value);
}

linux.getAll = function(value){
	return initializePayloads(linux, value);
}

windows.getAll = function(value){
	return initializePayloads(windows, value);
}


var initializePayloads = function(payloadArray, value){
	tempArray = []
	for(i=0;i<payloadArray.length;i++){
		if (payloadArray[i].category === value){
			tempArray.push(payloadArray[i]);
		}
	}

	return tempArray;
}

exports.infog = infog;
exports.misc = misc;
exports.aux = aux;
exports.web = web;
exports.linux = linux;
exports.windows = windows;