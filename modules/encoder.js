var blessed = require("blessed"),
    output = require('./output'),
    htmlEncode = require('js-htmlencode').htmlEncode,
    htmlDecode = require('js-htmlencode').htmlDecode,
    outputValue = '',
    counter = 0;

var method = 'ENC',
    methodTitle = 'Encoding';

var modes = [{
    'DEC': function(data) {
        try {return decodeURIComponent(data)}catch(err){
					return data;
				}
    },
    'ENC': function(data) {
        return encodeURIComponent(data)
    },
    'title': 'URL'
}, {
    'DEC': function(data) {
        try {return htmlDecode(data)}catch(err){return data;}
    },
    'ENC': function(data) {
        try {return htmlEncode(data)}catch(err){return data;}
    },
    'title': 'HTML'
}, {
    'DEC': function(data) {
        try{return new Buffer(data, 'base64').toString('ascii')}catch(err){return data;}
    },
    'ENC': function(data) {
        try{return new Buffer(data).toString('base64');}catch(err){return data;}
    },
    'title': 'Base64'
},
{
    'DEC': function(data) {
        try{return new Buffer(data, 'hex').toString('ascii')}catch(err){return data;}
    },
    'ENC': function(data) {
        try{return new Buffer(data).toString('hex');}catch(err){return data;}
    },
    'title': 'Hex'
}]

function setTitle(title, mode) {
    //console.log(mode);
    var e = log.cyanBright("e");
    var a = log.cyanBright("a");
    var t = log.cyanBright("t");
    var ret = log.cyanBright("return");
    var instructions = "\n\nChange (E)ncoding: " + log.blackBright("Ctrl + "+e+"") + "\n(A)pply to input: " + log.blackBright("Ctrl + "+a) + " \n(T)oggle Mode: " + log.blackBright("Ctrl + "+t) + "\n\nPress " + ret + " to exit.";
    var broTitle = "\nCurrent Mode: " + log.blackBright(mode) + " \nCurrent Encoding: " + log.blackBright(title) + instructions;
    return broTitle;
}
var modeTitle = setTitle(modes[counter]['title'], methodTitle);
var encode = modes[0][method];

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
}

function toggleEncoding() {
    if (counter < (modes.length - 1)) {
        counter += 1;
    } else {
        counter = 0;
    }
    encode = modes[counter]['ENC'];
    modeTitle = setTitle(modes[counter]['title'], methodTitle);

}

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
        // border: {
        //     type: 'bg',
        //     ch: '_',
        //     fg: "#27ea09"
        // },
        left: 'center',
    })
    screen.append(list);
    var box = blessed.box({
        parent: screen,
        top: '45%',
        width: '80%',
        left: 'center',
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
            inputBox.setValue(input);
        }
        setInterval(function() {
            outputValue = encode(inputBox.getContent());
            box.setContent(outputValue);
            list.setContent(modeTitle);
            screen.render();
        }, 5)
    }, 100)

    screen.render();

    inputBox.focus();

    function eHandler() {
        this.init = inputBox.onceKey('C-e', function(ch, key) {
            inputBox.unkey('C-e');

            setTimeout(function() {
                toggleEncoding();
                eHandler();
            }, 100)
        })
    }

    function tHandler() {
        this.init = inputBox.onceKey('C-t', function(ch, key) {
            inputBox.unkey('C-t');
            setTimeout(function() {
                toggleMode();
                tHandler();
            }, 100)
        })
    }
    var inputBoxFocusHandler = function() {

        inputBox.key('C-c', function() {
            return process.exit(0);
        })

        eHandler();

        tHandler();

        inputBox.key('C-a', function(ch, key) {
            inputBox.setValue(outputValue);
        })

        inputBox.key('enter', function(ch, key) {

            var command = inputBox.getValue();

            box.hide();
            inputBox.hide();
            screen.destroy();

            setTimeout(function() {
                output.cmd(outputValue);
                return process.exit(0);
            }, 50)

            inputBox.unkey('enter');
            screen.render();

            inputBoxFocusHandler();
        });

    };
    inputBox.on('focus', inputBoxFocusHandler);

    setTimeout(function() {
        screen.render();
    }, 50)

    screen.key('tab', function(ch, key) {
        if (inputBox.focused) {
            list.focus();
        } else {
            inputBox.focus();
        }

        screen.render();
    });


    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    });
}
