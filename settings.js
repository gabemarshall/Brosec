var settings = {}

// ---[Db Storage Path]---
// Brosec stores variable values using the nodejs dirty module

settings.dbPath = '/var/tmp/bros.db'

// ---[netcat]--- 
// (ex: ncat, netcat, nc.traditional)

settings.netcat = "netcat"

settings.storagePath = "/var/tmp/"





module.exports = settings;