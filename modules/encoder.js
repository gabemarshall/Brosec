var blessed = require("blessed"),
    output = require('./output'),
    htmlEncode = require('js-htmlencode').htmlEncode,
    htmlDecode = require('js-htmlencode').htmlDecode,
    utilities = require('./utilities'),
    outputValue = '',
    counter = 0,
    keychanged = false;

var method = 'ENC',
    methodTitle = 'Encoding';

var modes = [{
    'DEC': function(data) {
        try {
            keychanged = false;
            return decodeURIComponent(data)
        } catch (err) {
            return data;
        }
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return utilities.urlencode(data);
        } catch (err){
            return data;
        }
    },
    'title': 'URL'
    
}, {
    'DEC': function(data) {
        try {
            return htmlDecode(data)
        } catch (err) {
            return data;
        }
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return htmlEncode(data);

        } catch (err) {
            console.log(err);
            return data;
        }
    },
    'title': 'HTML'
}, {
    'DEC': function(data) {
        try {

            keychanged = false;
            return new Buffer(data, 'base64').toString();
        } catch (err) {

            return data;
        }
    },
    'ENC': function(data) {
        try {

            keychanged = false;
            return new Buffer(data).toString('base64');
        } catch (err) {
            return data;
        }
    },
    'title': 'Base64'
}, {
    'DEC': function(data) {
        try {
            keychanged = false;
            return new Buffer(data, 'hex').toString('ascii');
        } catch (err) {
            return data;
        }
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return new Buffer(data).toString('hex');
        } catch (err) {
            return data;
        }
    },
    'title': 'Hex'
}, {
    'DEC': function(data) {
        return data;
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return utilities.md5(data);
        } catch (err) {
            return data;
        }
    },
    'title': 'MD5'
}, {
    'DEC': function(data) {
        return data;
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return utilities.sha1(data);
        } catch (err) {
            return data;
        }
    },
    'title': 'SHA1'
}, {
    'DEC': function(data) {
        return data;
    },
    'ENC': function(data) {
        try {
            keychanged = false;
            return utilities.sha256(data);
        } catch (err) {
            return data;
        }
    },
    'title': 'SHA256'
}
]

var borderSettings = {
    type: 'line',
    fg: "#27ea09"
}

if (utilities.isWindows()){
  borderSettings.type = 'bg';
  borderSettings.ch = '#';
}

function setTitle(title, mode) {
    //console.log(mode);
    var e = log.cyanBright("e");
    var f = log.cyanBright("f");
    var a = log.cyanBright("a");
    var t = log.cyanBright("t");
    var ret = log.cyanBright("return");
    var instructions = "\n\nChange Encoding (T)ype: " + log.normal("Ctrl + " + t + "") + "\n(A)pply Output value to Input: " + log.normal("Ctrl + " + a) + " \n(F)lip Between Encoding/Decoding: " + log.normal("Ctrl + " + f) + "\n\nPress " + ret + " to exit.";
    var broTitle = "\nCurrent Mode: " + log.normal(mode) + " \nCurrent Encoding: " + log.normal(title) + instructions;
    return broTitle;
}
var modeTitle = setTitle(modes[counter]['title'], methodTitle);
var encode = modes[0][method];

exports.init = function(input) {
    var inputLabel = "[ Input - 0 characters ]";
    var boxLabel = "[ Output - 0 characters ]";
    var screen = blessed.screen({
        smartCSR: true
    });

    var inputBox = blessed.textbox({
        parent: screen,
        height: '20%',
        label: inputLabel,
        inputOnFocus: true,
        border: borderSettings,
        width: '80%',
        keys : true,
        content: '',
        top: '65%',
        left: 'center',
    });

    var list = blessed.box({
        parent: inputBox,
        height: '45%',
        align: 'center',
        width: '80%',
        style: {
            fg: 'green'
        },
        top: '12%',
        left: 'center',
    })
    screen.append(list);
    var box = blessed.box({
        parent: screen,
        top: '45%',
        width: '80%',
        left: 'center',
        scrollable: true,
        autoPadding: true,
        label: boxLabel,
        height: '20%',
        content: '',
        tags: true,
        border: borderSettings
    });

    screen.append(box);

    function updateCounters(input, output){
        inputBox.setLabel("[ Input - "+input.length.toString()+" characters]");
        box.setLabel("[ Output - "+output.length.toString()+" characters]");
    }

    setTimeout(function() {
        inputBox.focus();
        screen.render();
        if (input) {
            keychanged = true;
            input = input.toString();
            inputBox.setValue(input);
        }
        setInterval(function() {
            if (keychanged) {
                var currentInput = inputBox.getContent();
                outputValue = encode(currentInput);
                box.setContent(outputValue);
                updateCounters(currentInput, outputValue);
            }
            list.setContent(modeTitle);
            
            screen.render();
        }, 5)

        list.setContent(modeTitle);
    }, 50)

    screen.render();

    function refreshScreen() {
        outputValue = encode(inputBox.getContent());
        box.setContent(outputValue);
        list.setContent(modeTitle);
        screen.render();
    }

    function toggleEncoding() {
        if (counter < (modes.length - 1)) {
            counter += 1;
        } else {
            counter = 0;
        }
        encode = modes[counter][method];
        modeTitle = setTitle(modes[counter]['title'], methodTitle);
        refreshScreen();
    }

    function toggleMode() {
        if (method === 'ENC') {
            method = 'DEC';
            encode = modes[counter][method];
            methodTitle = 'Decoding';
            modeTitle = setTitle(modes[counter]['title'], methodTitle);
        } else {
            method = 'ENC';
            encode = modes[counter][method];
            methodTitle = 'Encoding';
            modeTitle = setTitle(modes[counter]['title'], methodTitle);
        }
        refreshScreen();
    }

    function applyMode() {
        inputBox.setContent(outputValue);
        outputValue = encode(inputBox.getContent());
        refreshScreen();
    }
    inputBox.focus();

    function eHandler() {
        this.init = inputBox.onceKey('C-t', function(ch, key) {
            inputBox.unkey('C-t');
            keypress = true;
            toggleEncoding();
            eHandler();
        })
    }

    function tHandler() {
        this.init = inputBox.onceKey('C-f', function(ch, key) {
            inputBox.unkey('C-f');
            keypress = true;
            toggleMode();
            tHandler();
        })
    }

    function aHandler() {
        this.init = inputBox.onceKey('C-a', function(ch, key) {
            inputBox.unkey('C-a');
            keypress = true;
            applyMode();
            aHandler();
        })
    }
    var inputBoxFocusHandler = function() {

        inputBox.key('C-c', function() {
            return process.exit(0);
        })
        inputBox.on('keypress', function() {
            if (!keychanged) {
                refreshScreen();
                keychanged = true;
            }
        })

        eHandler();
        tHandler();
        aHandler();

        inputBox.key('enter', function(ch, key) {

            var command = inputBox.getValue();
            keychanged = true;
            outputValue = encode(inputBox.getValue());
            var lengthCheck = outputValue.length;
            if (lengthCheck === 0){
                outputValue = encode(inputBox.getContent());
            }
            box.hide();
            inputBox.hide();
            screen.destroy();

            setTimeout(function() {
                output.cmd(outputValue, true);
            }, 50)

            inputBox.unkey('enter');
            screen.render();

            inputBoxFocusHandler();
        });

    };
    inputBox.on('focus', inputBoxFocusHandler);

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    });
}
