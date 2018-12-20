var inquirer = require('inquirer');
var _ = require('lodash');
var fuzzy = require('fuzzy');
var Promise = require('promise');
var output = require('./output');
var pay = require('../payloads/index');
var menu = require('./menu')

payloads = pay.rawPayloads()
payloadz = pay.arrayPayloads()


inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));


function searchPayloads(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, payloadz);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, _.random(30, 500));
  });
}  

exports.search = function(){

inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'payload',
      message: 'Search for a payload',
      source: searchPayloads,
    },
    ]).then(function(answers) {
      config = menu.getConfig()
      thePayload = payloads[payloads.findIndex(x => x.payload === answers.payload)]
      output.prepare(thePayload.payload, config.LHOST, config.LPORT, config.RHOST, config.RPORT, config.USER, config.PATH, thePayload.callback,null)
      
    });
}
  
