PerfectPlayer = function PerfectPlayer( name, t) {
	
	this.name = name;
	var threshold = typeof t !== 'undefined' ? t : 0;
	
	function getWinMove(value, board) {
		var index1, index2, index3;
		// check all rows
		for( var index = 0; index < 3; index++) {
			index1 = index * 3;
			index2 = index1 + 1;
			index3 = index2 + 1;
			var move = board.getWinMove( value, index1, index2, index3);
			if( move != -1) return move;
			index1 = index;
			index2 = index1 + 3;
			index3 = index2 + 3;
			move = board.getWinMove( value, index1, index2, index3);
			if( move != -1) return move;
		}
		index1 = 0; index2 = 4; index3 = 8;
		move = board.getWinMove( value, index1, index2, index3);
		if( move != -1) return move;
		index1 = 2; index2 = 4; index3 = 6;
		move = board.getWinMove( value, index1, index2, index3);
		if( move != -1) return move;
		return -1;
	}
	
	this.play = function( board, value) {
		if( threshold > 0) {
			if( Math.random() * 100 < threshold) return board.getRandomMove();
		}
		
		// 1 Win
		var move = board.getWinMove(value);
		if(move != -1) return move;
		
		// 2 Block
		move = board.getWinMove(-value);
		if(move != -1) {
			//console.log( "blocking at " + move);
			return move;
		}
		
		// 3 Fork
		var moves = board.getForkMoves(value);
		if( moves.length > 0) {
			return moves[0];
		}
		
		// 4 Block Fork
		moves = board.getForkMoves(-value);
		// console.log( "Counter Fork moves = " + moves);
		if( moves.length > 0) {
			// console.log("Fork danger(s) at " + moves);
			// finds offensive move that does favor the fork
			offMoves = board.getOffensiveMoves(value);
			// console.log( "Counter offensive moves at " + offMoves);
			
			for( var indexOff = offMoves.length - 1; indexOff >= 0; indexOff--) {
				var offMove = offMoves[ indexOff];
				for( var indexMoves = 0; indexMoves < moves.length; indexMoves++) {
					if( board.isSymetrical( offMove, moves[indexMoves])) {
						// console.log("Removing dangerous offensive move at " + offMove);
						offMoves.splice(indexOff, 1);
					}
				}
			}
			
			if( offMoves.length > 0) {
				// console.log( "Counter attack at " + offMoves[0]);
				return offMoves[0];
			}
			
			//console.log( "Blocking fork at " + moves[0]);
			return moves[0];
		}
		
		// 5 Center
		if( board.get(4) == 0) return 4;
		
		// 6 Opposite Corner
		if( board.get(0) == -value && board.get(8) == 0) return 8;
		if( board.get(2) == -value && board.get(6) == 0) return 6;
		if( board.get(6) == -value && board.get(2) == 0) return 2;
		if( board.get(8) == -value && board.get(0) == 0) return 0;
		
		// 7 Empty Corner
		if( board.get(0) == 0) return 0;
		if( board.get(2) == 0) return 2;
		if( board.get(6) == 0) return 6;
		if( board.get(8) == 0) return 8;
		
		// 8 Empty Side
		if( board.get(1) == 0) return 1;
		if( board.get(3) == 0) return 3;
		if( board.get(5) == 0) return 5;
		if( board.get(7) == 0) return 7;
		
		move = board.getRandomMove();
		//console.log("Random move at " + move);
		return move;
	};
	this.toString = function() { return name;};
};
