var blessed = require("blessed"),
	output = require('./output'),
	outputValue = '';
var screen = blessed.screen({
  smartCSR: true
});
screen.title = 'Brosec Encoder';
exports.init = function(input){

	// box at bottom for chat input
	inputBox = blessed.textbox({
		parent: screen,
		height: '15%',
		label: '[ Input ]',
		
		border: {
			type: 'line', fg: "#27ea09"
		},
		width: '80%',
		top: 'center',
		left: 'center',
	});
	 
	var box = blessed.box({
	  parent: screen,
	  top: '20%',
	  width: '80%',
	  left: 'center',
	  autoPadding: true,
	  label: '[ Output ]',
	  height: '15%',
	  content: "",
	  tags: true,
	    border: {
	    type: 'line', fg: "#27ea09"
	  }
	});

	screen.append(box);

	setTimeout(function(){
	  inputBox.focus();
	  screen.render();
	  if(input){
		inputBox.setContent(input);
	  }
	  setInterval(function(){
	  	outputValue = encodeURIComponent(inputBox.getContent());
	    box.setContent(outputValue);
	    screen.title = 'hello'
	    screen.render();
	  }, 5)
	}, 100)

	screen.render();

	inputBox.focus();


	var inputBoxFocusHandler = function() {

		inputBox.readInput(function(data) {

	  	});
		inputBox.key('C-c', function(){
			return process.exit(0);
		})
		inputBox.key('enter', function(ch, key) {






			var command = inputBox.getValue();
	      
			box.hide();
			inputBox.hide();
			screen.destroy();
			//outputBox.addItem(command);
			output.cmd(outputValue);

			setTimeout(function(){
				return process.exit(0);
			}, 50)
			//return process.exit(0);
			
			inputBox.unkey('enter');
			screen.render();

			inputBoxFocusHandler();
		});

		inputBox.key('tab', function(ch, key) {
			inputBox.unkey('enter');
		});
	};
	inputBox.on('focus', inputBoxFocusHandler);








	setTimeout(function(){
		//inputBox.focus();
		//shells.getSessionsForBox();
		screen.render();

	}, 50)


	screen.key('tab', function(ch, key) {
		if (inputBox.focused) {
			box.focus();
		} else {
			inputBox.focus();
		}

		screen.render();
	});


	screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	  return process.exit(0);
	});

}


