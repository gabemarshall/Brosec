
var assert = require('assert')

var M = require('./mstring')

var a_b = {
    a: M(function(){/***
a
b
***/}),
    b: M(function(){
/***
a
b
***/})
};

var _a_b_ = {
  a: M(function(){/***

a
b

***/}),
  b: M(function(){
/***

a
b

***/
})

}


var indent1 = M(function(){/***
                           hello
                           there
                           ***/})

var indent2 = M(function(){/***

                           new-lines

                           ***/})


var mystring = M(function(){
  /***
  Ontario
  Mining and
  Forestry
  Group
  ***/})



var mangled = M(function(){var $_a = "b";try{/***
  X
  Y
  Z
  ***/}catch(e){"eek!!"}})



for( var t in a_b ) {
  assert.equal("a\nb",a_b[t])
}

for( var t in _a_b_ ) {
  assert.equal("\na\nb\n",_a_b_[t])
}

assert.equal('hello\nthere',indent1)
assert.equal('\nnew-lines\n',indent2)

assert.equal("Ontario\nMining and\nForestry\nGroup",mystring)

assert.equal("X\nY\nZ",mangled)



try {
  var f = function(){}
  M(f)
  assert.fail()
}
catch(e) { 
  if( 'AssertionError'==e.name ) throw e; 
  assert.equal('Error: mstring: required format is function (){/*** ... ***/}, this is invalid: function (){}',e.toString())
}
