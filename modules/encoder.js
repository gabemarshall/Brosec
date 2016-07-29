var blessed = require("blessed"),
    output = require('./output'),
    htmlEncode = require('js-htmlencode').htmlEncode,
    htmlDecode = require('js-htmlencode').htmlDecode,
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
        keychanged = false;
        var a = encodeURIComponent(data);
        a = a.replace(/(')/g, "%27");
        a = a.replace(/(\()/g, "%28");
        a = a.replace(/(\))/g, "%29");
        return a;
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
            return new Buffer(data, 'hex').toString('ascii')
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
}]

function setTitle(title, mode) {
    //console.log(mode);
    var e = log.cyanBright("e");
    var a = log.cyanBright("a");
    var t = log.cyanBright("t");
    var ret = log.cyanBright("return");
    var instructions = "\n\nChange (E)ncoding type: " + log.blackBright("Ctrl + " + e + "") + "\n(A)pply Output value to Input: " + log.blackBright("Ctrl + " + a) + " \n(T)oggle Encoding/Decoding: " + log.blackBright("Ctrl + " + t) + "\n\nPress " + ret + " to exit.";
    var broTitle = "\nCurrent Mode: " + log.blackBright(mode) + " \nCurrent Encoding: " + log.blackBright(title) + instructions;
    return broTitle;
}
var modeTitle = setTitle(modes[counter]['title'], methodTitle);
var encode = modes[0][method];

exports.init = function(input) {

    var screen = blessed.screen({
        smartCSR: true
    });

    var inputBox = blessed.textbox({
        parent: screen,
        height: '15%',
        label: '[ Input ]',
        inputOnFocus: true,
        border: {
            type: 'line',
            fg: "#27ea09"
        },
        width: '80%',
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
        label: '[ Output ]',
        height: '15%',
        content: '',
        tags: true,
        border: {
            type: 'line',
            fg: "#27ea09"
        }
    });

    screen.append(box);

    setTimeout(function() {
        inputBox.focus();
        screen.render();
        if (input) {
            keychanged = true;
            inputBox.setValue(input);
        }
        setInterval(function() {
            if (keychanged) {
                outputValue = encode(inputBox.getContent());
                box.setContent(outputValue);
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
        inputBox.setValue(outputValue);
        outputValue = encode(inputBox.getContent());
        refreshScreen();
    }
    inputBox.focus();

    function eHandler() {
        this.init = inputBox.onceKey('C-e', function(ch, key) {
            inputBox.unkey('C-e');
            keypress = true;
            toggleEncoding();
            eHandler();
        })
    }

    function tHandler() {
        this.init = inputBox.onceKey('C-t', function(ch, key) {
            inputBox.unkey('C-t');
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
