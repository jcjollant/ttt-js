RandomPlayer = function RandomPlayer( name) {
	this.name = name;
	this.play = function( board, value) {
		return board.getRandomMove();
	};
	this.toString = function() { return name;};
};
