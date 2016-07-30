var log = require('cli-color');

exports.samples = function(sample){

    var doesSampleContainPrompt = sample.match(/((<(PROMPT)\s*?.*?>))/gi)
    var doesSampleContainRemote = sample.match(/((<(RHOST)\s*?.*?>))/)
    var doesSampleContainRemotePort = sample.match(/((<(RPORT)\s*?.*?>))/)
    var doesSampleContainLocal = sample.match(/((<(LHOST)\s*?.*?>))/)
    var doesSampleContainLocalPort = sample.match(/((<(LPORT)\s*?.*?>))/)
    var doesSampleContainUser = sample.match(/((<(USER)\s*?.*?>))/)
    var doesSampleContainPath = sample.match(/((<(PATH)\s*?.*?>))/)

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    function addSomeColor(val, color, debug){

          if (val.length > 1){
            for (b=0;b<val.length;b++){
                sample = sample.replace(val[b], color(val[b]));
                sample = replaceAll(sample, val[b], color(val[b]));
            }
          } else {
            sample = sample.replace(val[0], color(val[0]));
          }

          var final = sample;

        return final;
    }

    if (doesSampleContainPrompt){
        sample = addSomeColor(doesSampleContainPrompt, log.cyan, true)
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
    if (doesSampleContainPath){
        sample = addSomeColor(doesSampleContainPath, log.blackBright)
    }


    return sample

}
