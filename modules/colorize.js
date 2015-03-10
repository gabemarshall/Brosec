var log = require('cli-color');

exports.samples = function(sample){

    var doesSampleContainPrompt = sample.match(/((<(PROMPT)\s*?.*?>))/)
    var doesSampleContainRemote = sample.match(/((<(RHOST)\s*?.*?>))/)
    var doesSampleContainRemotePort = sample.match(/((<(RPORT)\s*?.*?>))/)
    var doesSampleContainLocal = sample.match(/((<(LHOST)\s*?.*?>))/)
    var doesSampleContainLocalPort = sample.match(/((<(LPORT)\s*?.*?>))/)
    var doesSampleContainUser = sample.match(/((<(USER)\s*?.*?>))/)

    function addSomeColor(val, color){
        var temp = sample.split(val[0])
        var final = temp[0]+color(val[0])+temp[1]
        return final;
    }

    if (doesSampleContainPrompt){
        sample = addSomeColor(doesSampleContainPrompt, log.blue) 
    }
    if (doesSampleContainRemote){
        sample = addSomeColor(doesSampleContainRemote, log.red)
    }
    if (doesSampleContainLocal){
        sample = addSomeColor(doesSampleContainLocal, log.yellow)
    }
    if (doesSampleContainUser){
        sample = addSomeColor(doesSampleContainUser, log.blackBright)
    }
    if (doesSampleContainRemotePort){
        sample = addSomeColor(doesSampleContainRemotePort, log.red)
    }
    if (doesSampleContainLocalPort){
        sample = addSomeColor(doesSampleContainLocalPort, log.yellow)
    }


    return sample

}