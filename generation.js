// Generate a training set based on perfect player move
require('./perfect-player.js')
require('./ttt-board.js')
var player = new PerfectPlayer("Pete");

var board = new Board();
var boards = 0;

function playAll( board, value) {
	// record the perfect move for this board
	//console.log( boards + " : " + board.getValues() + " : " + value + "@" + player.play(board, value));
	var output = [0,0,0,0,0,0,0,0,0]
	output[player.play(board, value)] = 1;
	console.log( "{input:[" + board.getValues() + "],output:[" + output+"]},");
	boards++;
	for( var move = 0; move < 9; move++) {
		if( board.isFree(move)) {
			board.set(move, value);
			if( !board.isWon() && !board.isFull()) {
				playAll( board, -value);
			}
			board.reset(move);
		}
	}
}

playAll( board, 1);