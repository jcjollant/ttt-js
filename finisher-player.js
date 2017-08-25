FinisherPlayer = function FinisherPlayer( name) {
	this.name = name;
	
	this.play = function( board, value) {
		// 1 Win
		var move = board.getWinMove(value);
		if(move != -1) return move;
		
		return board.getRandomMove();
	};
	this.toString = function() { return name;};
};
