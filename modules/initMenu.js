var initMenu = function(title, menuOptions, payloadType){
	
	this.title = title
	this.menuOptions = menuOptions
	this.payloadType = payloadType
	this.topMenu = function(){
		console.log("\n\n\n\t"+title+"\n")
		for(i=0;i<menuOptions.length;i++){
			var pos = i+1;
			if(pos===menuOptions.length){
				console.log(pos+". "+menuOptions[i]+"\n")
			}
			else{
				console.log(pos+". "+menuOptions[i])
			}
			
		}
	}

}

module.exports = initMenu