var os = require('os');
var config = {}
var currentOS = os.type()

// Brosec stores variable values using the nodejs dirty module
// By default the storage location is /var/tmp/bros.db

config.dbPath = '/var/tmp/bros.db'

// netcat binary to use (ex: ncat, netcat, nc.traditional)
config.netcat = "netcat"

module.exports = config;