Game = function( p1, p2){
	board = new Board();
	player1 = p1;
	player2 = p2;
	moves = [];
	this.display_board = function(){ 
		board.display();
		console.log( "Moves:" + moves);
	};
	this.play = function(quiet) {
		quiet = typeof quiet !== 'undefined' ? quiet : false;
		//board.debug();
		if( !quiet) console.log( "Playing " + player1 + "[X] vs " + player2 + "[O]");
		nextPlayer = player1;
		playerValue = 1;
		winner = 0;
		while( !(board.isFull() || board.isWon()) && winner == 0) {
			move = nextPlayer.play( board, playerValue);
			if( move == -1) {
				if( !quiet) console.log( "Player " + nextPlayer + " cannot move");
				winner = -playerValue;
				break;
			}
			//console.log( "Player " + nextPlayer + " moving at " + move);
			if( board.set( move, playerValue) == -1) {
				if( !quiet) console.log( "Player " + nextPlayer + " made invalid move at " + move);
				winner = -playerValue;
				break;
			} else {
				moves.push(move);
			}
			nextPlayer = (nextPlayer === player1 ? player2 : player1);
			playerValue = playerValue * -1;
		}
		
		if( winner == 0) {
			//board.display();
			winner = board.getWinner();
		}
		if( winner == 0) {
			status = "Draw";
		} else {
			status = "Won by ";
			if( winner == 1) status += player1;
			else if (winner == -1) status += player2;
			else status += "?";
		}
		if( !quiet) console.log( "Game completed : " + status);
		return winner;
	};
};

