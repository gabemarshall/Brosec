var prompt = require('prompt');
var web = require("./webserver/webserver.js")

exports.ask = function(question, callback, type) {

    // var test = function () {
    //     var x = 'works';
    //     return {
    //         testme: x
    //     }
    // }

    // var test2 = test();


    var init = 0
    var temp = 0

    var counter = question.length
    
    var test = function(q) {
        if (typeof question === "string") {
            prompt.message = q;
            prompt.get([{
                name: '_',
                description: ":"
            }], function(err, result) {

                if (err) {
                    console.log(err)
                } else {
                    console.log(result._)
                    temp += 1
                }

            })
        } else {
            q("hey")
        }

    }


    test(question[temp])



    var checkStatus = setInterval(function() {
        if (init === temp) {

        } else {
            if (temp < question.length) {
                test(question[temp])
                init += 1
            } else {
                clearInterval(checkStatus)
            }
        }
    }, 25)






    // prompt.message = question + " :"

    // prompt.get([{
    //     name: '_',
    //     description: ":"
    // }], function(err, result) {

    //     var returnValue = result._

    //     try {
    //         switch (type) {
    //             case "noexit":
    //                 callback(1);
    //                 break;
    //             case "web":

    //                 prompt.message = "Should I fire up a web server for you? (Y/n) :"
    //                 prompt.get([{
    //                     name: '_',
    //                     description: ":"
    //                 }], function(err, result) {

    //                     result._ = result._.toUpperCase()
    //                     if (result._ === "Y") {
    //                         var server = web.init()
    //                         callback(returnValue)
    //                     } else {
    //                         callback(returnValue)
    //                     }
    //                 })

    //                 break;

    //             default:
    //                 callback(result._);
    //                 break;
    //         }

    //     } catch (err) {
    //         console.log("\nLater bro!")
    //     }
    // })

}
