exports.kexec = function(){
  try {
    var kexec = require('kexec');
    return true
  } catch (err){
    return false
  }
}
