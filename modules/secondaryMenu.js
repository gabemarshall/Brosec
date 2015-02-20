var db = require('../db/db');
var log = require('cli-color');
var sleep = require('teddybear');
var prompt = require('prompt');
var pay = require('../payloads/')
var output = require('./output')
var check = require('./inputChecks')
var configOptions = ["SET LHOST", "SET RHOST", "SET LPORT", "SET RPORT, SET USER"]
var menu = require('./menu');

var payloads
var config
var LHOST
var LPORT
var RHOST
var RPORT
var USER



// Menu Generator
var Menu = function(title, menuOptions, payloadType) {

    var menuLength = menuOptions.length
    this.title = title
    this.menuOptions = menuOptions
    this.payloadType = payloadType

    this.grabSecondaryMenu = function(){
    	return secondaryMenu();
    }

    // Second level of menu system
    var secondaryMenu = function() {

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
                description: '(1-9) or enter "back" to return to the main menu'
            }], function(err, result) {

                try {
                    result.IGMenu = result.IGMenu.toUpperCase();

                    // Check if result contains valid commands
                    check.allInputChecks(result.IGMenu, secondaryMenu, menu.mainMenu)

                    // If result is within the valid range of menu options, proceed
                    if (parseInt(result.IGMenu) >= 1 && parseInt(result.IGMenu) <= menuLength) {
                        tertiaryMenu(menuOptions[result.IGMenu - 1])
                    }

                    // If result is numerical but isn't a valid command, reload menu and try again
                    else if (parseInt(result.IGMenu)) {
                        console.log("Sorry, please try again.")
                        this.secondaryMenu()
                    }

                } catch (err) {
                    console.log("\nLater bro!")
                }

            });
        }, 40)

		// Third level of menu system
        var tertiaryMenu = function(value) {
            console.log("\n\t---[ "+value+" ]---")
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
                        result.subIGMenu = result.subIGMenu.toUpperCase();

                        check.allInputChecks(result.subIGMenu, tertiaryMenu, secondaryMenu)

                        config = menu.getConfig()
                        var thisInput = result.subIGMenu.toUpperCase()

                        if (thisInput != "BACK" && thisInput != "HELP" && thisInput != "CONFIG" && parseInt(thisInput)) {
                            choice = parseInt(result.subIGMenu) - 1
                            if (choice === parseInt(choice) && choice >= 0) {
                                output.prepare(payloads[choice].payload, config.LHOST, config.LPORT, config.RHOST, config.RPORT, config.USER, payloads[choice].callback,tertiaryMenu)
                            } else {
                                console.log(log.red("\nError - invalid input, returning to main menu."))
                                sleep(250)
                                menu.mainMenu()
                            }
                        }
                    } catch (err) {
                        console.log("\nLater bro!")
                    }

                });
            }, 40)

        }

    }

}

var menus = {}
var infoGMenu = new Menu("## Information Gathering ##", ["DNS", "Port Scanning", "SMB", "SNMP"], pay.infog);
var attackMenu = new Menu("## Web ##",["XML"], pay.injection)
var postExploitMenu = new Menu('## Post Exploitation ##', ["Reverse Shells", "Exfiltration"], pay.postexploit)
var toolsMenu = new Menu('## Misc Tools ##', ["Bleh"], pay.tools)
var linuxMenu = new Menu('## Linux ##', ["System Info", "File System", "Networking", "Stealth"], pay.linux)
var windowsMenu = new Menu('## Windows ##', ["System Info", "File System", "Networking", "WMIC", "Powershell"], pay.windows)

menus.infoGathering = infoGMenu.grabSecondaryMenu
menus.injectionAttacks = attackMenu.grabSecondaryMenu
menus.postExploitation = postExploitMenu.grabSecondaryMenu
menus.miscTools = toolsMenu.grabSecondaryMenu
menus.linux = linuxMenu.grabSecondaryMenu
menus.windows =windowsMenu.grabSecondaryMenu


module.exports = menus
