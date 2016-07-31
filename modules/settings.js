var settings = {},
    os = require('os');

// ---[Db Storage Path]---
// Brosec stores variable values using the nodejs dirty module

var currentOS = os.type();

if (currentOS.match("Windows")){
    settings.dbPath = os.tmpdir()+'\\bros.db';
} else {
    settings.dbPath = '/var/tmp/bros.db'
}



module.exports = settings;
