var express = require("express"),
    path = require('path'),
    basicAuth = require('basic-auth'),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    upload = multer({ storage: storage }),
    app = express(),
    exec = require('child_process').exec,
    fs = require('fs'),
    https = require('https'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    hostname = process.env.HOSTNAME || 'localhost',
    ecstatic = require('ecstatic'),
    color = require('cli-color'),
    publicDir = process.cwd(),
    log = require('../log.js'),
    askToGenerateSSL = require('../ssl.js'),
    os = require('os'),
    prompt = require('prompt'),
    interfaces = os.networkInterfaces(),
    port;

function serverInit(argv) {

    if (argv.username && argv.password) {
        var auth = function(req, res, next) {
            function unauthorized(res) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.status(401);
                return res.send("Unauthorized");
            };

            var user = basicAuth(req);

            if (!user || !user.name || !user.pass) {
                return unauthorized(res);
            };

            if (user.name === argv.username && user.pass === argv.password) {
                return next();
            } else {
                return unauthorized(res);
            };
        };
        app.use(auth);
    }

    app.use(morgan('combined'));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(ecstatic({
        root: publicDir
    }));

    return app;
}


var serverIsReady = function(protocol) {
    console.log(" [*] An " + protocol + " server is serving " + publicDir + " on port " + port + " (ctrl c to stop)");
    Object.keys(interfaces).forEach(function(key) {
        interfaces[key].forEach(function(details) {
            if (details.family == 'IPv4') {
                console.log(log.status("\t" + protocol + "://" + details.address + ":" + port));
            }
        });
    });
}

initUpload = function() {
    app.post('/upload', upload.single('f'), function(req, res, next) {
        res.status(201);
        res.send("Done!").end();
    })

    app.get('/upload', function(req, res, next) {
        res.status(200);
        res.send('<!DOCTYPE html><html><body><form action="/upload" method="post" enctype="multipart/form-data">Select file to upload:<br><input type="file" name="f" id="f"><br><br><input type="submit" value="Upload" name="submit"></form></body></html>')
    })
}

exports.http = function(argv) {

    var app = serverInit(argv);
    try {
        port = argv._[1];
        if (!port) {
            port = 8000;
        }
    } catch (err) {
        port = 8000;
    }

    var options = {};
    if (argv.upload){
        initUpload();    
    }

    var server = app.listen(port, function() {
        serverIsReady("http");
    })
}

exports.https = function(argv) {
    var app = serverInit(argv);
    if (typeof(argv._[1]) != "number") {
        port = 8443;
    } else {
        try {
            port = argv._[1];
            if (!port) {
                port = 8443;
            }
        } catch (err) {
            port = 8443;
        }
    }

    var initSSL = function(cert, key) {
        options = {
            cert: cert,
            key: key
        }

        if (argv.upload){
            initUpload();
        }

        https.createServer(options, app).listen(port, function() {
            serverIsReady("https");
        });
    }

    var cert, key;

    try {
        if (argv.cert && argv.key) {
            cert = fs.readFileSync(argv.cert);
            key = fs.readFileSync(argv.key);
        } else {
            cert = fs.readFileSync("/var/tmp/bros.cert");
            key = fs.readFileSync("/var/tmp/bros.key");
        }

        initSSL(cert, key);

    } catch (err) {
        console.log("No SSL key/cert found (use --cert=/path/to/cert --key=/path/to/key to import your own)");
        askToGenerateSSL(initSSL);
    }
}
