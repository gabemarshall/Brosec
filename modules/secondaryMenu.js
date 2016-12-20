var db = require('../db/db'),
  log = require('cli-color'),
  prompt = require('prompt'),
  pay = require('../payloads/'),
  output = require('./output'),
  check = require('./inputChecks'),
  configOptions = ["SET LHOST", "SET RHOST", "SET LPORT", "SET RPORT, SET USER", "SET PATH"],
  menu = require('./menu'), payloads, config, LHOST ,LPORT, RHOST, RPORT, USER, PATH;


// Menu Generator
var Menu = function(title, menuOptions, payloadType) {

    var menuLength = menuOptions.length
    this.title = title
    this.menuOptions = menuOptions
    this.payloadType = payloadType

    this.grabSecondaryMenu = function(passthru, thirdArg){
    	return secondaryMenu(passthru, thirdArg);
    }

    // Second level of menu system
    var secondaryMenu = function(secondArg, thirdArg) {

        if (!secondArg){
            // Print the title for the menu as well as available options
            console.log("\n\n\n\t" + title + "\n")
            for (i = 0; i < menuOptions.length; i++) {
                var pos = i + 1;
                if (pos === menuOptions.length) {
                    console.log(pos + ". " + menuOptions[i] + "\n")
                } else {
                    console.log(pos + ". " + menuOptions[i])
                }
            }

            // Ugly hack to optimize output
            setTimeout(function() {
                prompt.message = "Choose a category"
                prompt.get([{
                    name: 'IGMenu',
                    description: '(1-'+menuOptions.length+') or enter "back" to return to the main menu'
                }], function(err, result) {

                    try {

                        // Check if input is a valid number, this can probably be removed at some point
                        // TODO: Investigate why input needed to be up cased originally.

                        if(!isNaN(parseInt(result.IGMenu || 0))){
                            result.IGMenu = result.IGMenu.toUpperCase();
                        }

                        // Check if result contains valid commands
                        var inputIsCommand = check.allInputChecks(result.IGMenu, secondaryMenu, menu.mainMenu)

                        // If result is within the valid range of menu options, proceed
                        if (parseInt(result.IGMenu) >= 1 && parseInt(result.IGMenu) <= menuLength) {
                            tertiaryMenu(menuOptions[result.IGMenu - 1])
                        }

                        // If result is numerical but isn't a valid command, reload menu and try again
                        else if (!inputIsCommand){

                            setTimeout(function(){
                                console.log(log.red("[*] Invalid input, please try again.\n"))
                            },15)

                          secondaryMenu()
                        }

                    } catch (err) {
                        console.log("\nLater bro!")
                    }

                });
            }, 40)
        }
        else {
            // Ugly hack, fix later
            setTimeout(function(){
                if(!thirdArg){
                    tertiaryMenu(menuOptions[secondArg-1])
                }
                else {
                    tertiaryMenu(menuOptions[secondArg-1], thirdArg)
                }

            },10)
        }


		// Third level of menu system
        var tertiaryMenu = function(value, thirdArg) {
            if(!value){
                value = db.getConfig("MENU")
            }

            if (!thirdArg){
                console.log("\n\t---[ "+value+" ]---")

                db.newConfig("MENU", value)

                if (value) {
                    payloads = payloadType.getAll(value)
                }

                menu.showAvailablePayloadTitles(payloads)

                console.log("")

                setTimeout(function() {
                    prompt.message = "Choose a payload"
                    prompt.get([{
                        name: 'subIGMenu',
                        description: '(1-' + payloads.length + ') or enter "back" to return to the main menu'
                    }], function(err, result) {

                        try {

                            // Check if input is a valid number, this can probably be removed at some point
                            // TODO: Investigate why input needed to be up cased originally.

                            var inputIsCommand = check.allInputChecks(result.subIGMenu, tertiaryMenu, secondaryMenu)

                            config = menu.getConfig()
                            var thisInput = result.subIGMenu.toUpperCase()

                            if (!inputIsCommand) {
                                choice = parseInt(result.subIGMenu) - 1
                                if (choice >= 0 && choice <= payloads.length) {
                                   output.prepare(payloads[choice].payload, config.LHOST, config.LPORT, config.RHOST, config.RPORT, config.USER, config.PATH, payloads[choice].callback,tertiaryMenu)
                                } else {
                                    setTimeout(function(){
                                        console.log(log.red("[*] Invalid input, please try again.\n"))
                                    },15)

                                    tertiaryMenu()
                                }
                            }
                        } catch (err) {
                            console.log("\nLater bro!")
                        }


                    });
                }, 40)
            }
            else {

                config = menu.getConfig()

                payloads = payloadType.getAll(value)

                try {
                    output.prepare(payloads[thirdArg-1].payload, config.LHOST, config.LPORT, config.RHOST, config.RPORT, config.USER, config.PATH, payloads[thirdArg-1].callback,tertiaryMenu)
                }
                catch (err){
                    setTimeout(function(){
                        console.log(log.red("\n[*] Payload not found, please try again.\n"))
                    },15)
                }


            }



        }

    }

}

var menus = {}
var infoGMenu = new Menu("--[ Information Gathering ]--", ["DNS", "Port Scanning", "SMB", "SNMP"], pay.infog);
var webMenu = new Menu("--[ Web ]--",["XML", "XSS", "SQLi"], pay.web)
var miscMenu = new Menu('--[ Miscellaneous ]--', ["Reverse Shells", "Exfiltration", "MSF Venom"], pay.misc)
var auxMenu = new Menu('--[ Brosec Auxiliary Modules ]--', ["Brosec Simple HTTP(s) Server", "Brosec Simple FTP Server", "Brosec Encoder Module"], pay.aux)
var linuxMenu = new Menu('--[ Linux ]--', ["System Info", "File System", "Networking", "Stealth", "Privesc"], pay.linux)
var windowsMenu = new Menu('--[ Windows ]--', ["System Info", "File System", "Networking", "WMIC", "Powershell", "Windows Registry"], pay.windows)

menus.infoGathering = infoGMenu.grabSecondaryMenu
menus.webAttacks = webMenu.grabSecondaryMenu
menus.misc = miscMenu.grabSecondaryMenu
menus.aux = auxMenu.grabSecondaryMenu
menus.linux = linuxMenu.grabSecondaryMenu
menus.windows = windowsMenu.grabSecondaryMenu


module.exports = menus
