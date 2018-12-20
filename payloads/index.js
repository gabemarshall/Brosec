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

exports.arrayPayloads = function(){
	rawArray = [];
	for (i=0;i<infog.length;i++){
		rawArray.push(infog[i].payload);
	}

	for (i=0;i<misc.length;i++){
		rawArray.push(misc[i].payload);	
	}

	for (i=0;i<aux.length;i++){
		rawArray.push(aux[i].payload);	
	}
		for (i=0;i<web.length;i++){
		rawArray.push(web[i].payload);	
	}
		for (i=0;i<linux.length;i++){
		rawArray.push(linux[i].payload);	
	}
		for (i=0;i<windows.length;i++){
		rawArray.push(windows[i].payload);	
	}	

	return rawArray
}
exports.rawPayloads = function(){
	rawArray = [];
	for (i=0;i<infog.length;i++){
		rawArray.push(infog[i]);
	}
	for (i=0;i<misc.length;i++){
		rawArray.push(misc[i]);	
	}

	for (i=0;i<aux.length;i++){
		rawArray.push(aux[i]);	
	}
		for (i=0;i<web.length;i++){
		rawArray.push(web[i]);	
	}
		for (i=0;i<linux.length;i++){
		rawArray.push(linux[i]);	
	}
		for (i=0;i<windows.length;i++){
		rawArray.push(windows[i]);	
	}		
	return rawArray
}
  