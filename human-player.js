HumanPlayer = function HumanPlayer( name) {
	this.name = name;
	var readlineSync = require('readline-sync');	
	this.play = function( board, value) {
		board.display();
		var key = readlineSync.question("Please enter " + (value == 1 ? "X" : "O") + " move [1-9]");
		switch( key) {
			case '7': return 0;
			case '8': return 1;
			case '9': return 2;
			case '4': return 3;
			case '5': return 4;
			case '6': return 5;
			case '1': return 6;
			case '2': return 7; 
			case '3': return 8; 
			case '0': return board.getRandomMove();
		}
		return -1;
	};
	this.toString = function() { return name;};
};
