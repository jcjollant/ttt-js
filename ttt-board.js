Board = function() {
	values = [0,0,0,0,0,0,0,0,0];
	board_to_screen = function ( value) {
		switch( value) {
			case 1 : return "X";
			case -1: return "O";
			case 0: return " ";
			default: return "?";
		}
	};
	this.debug = function() { console.log( values); };
	this.display = function () {
		console.log("");
		for( index = 0; index < 9; index += 3) {
			if( index > 0) console.log( "-+-+-");
			a = board_to_screen( values[index]);
			b = board_to_screen( values[index+1]);
			c = board_to_screen( values[index+2]);
			console.log( a + "|" + b + "|" + c);
		}
		console.log("");
	};
	// Get the value at a given position on the board
	// @param index is the position between 0 and 8
	// @return the value at the given position or -1 if the position is invalid
	this.get = function(index) {
		if( index >= 0 && index < 9) return values[index];
		return -1;
	};
	
	// Get the winner of a given column
	// @param index Column index between 0 and 2. Left column is 0
	this.getColWinner = function(index) {
		if( index < 0 || index >= 3) return 0;
		return getWinnerAtIndex(index, index+3, index+6);
	};
	
	// Get the winner of a Diagonal
	// @param index Diagonal index between 0 and 1. Top left to bottom right is 0
	// @return 1 or -1 if there is a winner, 0 otherwise
	this.getDiagWinner = function(index) {
		var index1, index2, index3;
		if( index == 0) {
			index1 = 0;
			index2 = 4;
			index3 = 8;
		} else if( index == 1) {
			index1 = 2;
			index2 = 4;
			index3 = 6;
		}
		return getWinnerAtIndex(index1, index2, index3);
	};
	
	// Scans the board for a fork
	// @param value of the concerned payer
	// @return an array of positions which could be empty
	this.getForkMoves = function(value) {
		var candidates = 0;
		var moves = [];
		// test center
		if(values[4] == 0) {
			if(values[0] + values[8] == value) candidates++;
			if(values[2] + values[6] == value) candidates++;
			if(values[3] + values[5] == value) candidates++;
			if(values[1] + values[7] == value) candidates++;
		}
		if(candidates >= 2) moves.push(4);
		
		rotValues = values;
		for( var indexRot = 0; indexRot < 4; indexRot++) {
			if( indexRot != 0) rotValues = rotate( rotValues);
			// test corner
			candidates = 0;
			if(rotValues[0] == 0) {
				if(rotValues[1] + rotValues[2] == value) candidates++;
				if(rotValues[4] + rotValues[8] == value) candidates++;
				if(rotValues[3] + rotValues[6] == value) candidates++;
				if(candidates >= 2) moves.push( restorePosition(0, indexRot));
			}
			// test side
			candidates = 0;
			if(rotValues[1] == 0) {
				if(rotValues[0] + rotValues[2] == value) candidates++;
				if(rotValues[4] + rotValues[7] == value) candidates++;
				if(candidates >= 2) moves.push( restorePosition(1, indexRot));
			}
			
			//console.log("Rot=" + indexRot + " values=" + rotValues);
		}
		return moves;
	}

	// Finds a move that requires immediate defense from the opponent
	// @return an array of possible moves.
	this.getOffensiveMoves = function(value) {
		// this.display();
		// console.log( "Get offensive moves for " + value);
		var moves = [];
		var move;
		if( values[4] == 0) {
			if( values[3] + values[5] == value || values[1] + values[7] == value) moves.push(4);
		}
		var rValues = values;
		for( var indexRot = 0; indexRot < 4; indexRot++) {
			if( indexRot != 0) rValues = rotate( rValues);
			if(rValues[0] == 0) {
				if( rValues[1] + rValues[2] == value 
					|| rValues[3] + rValues[6] == value 
					|| rValues[4] + rValues[8] == value) moves.push( restorePosition( 0, indexRot));
			}
			if(rValues[1] == 0) {
				if(rValues[0] + rValues[2] == value 
					|| rValues[4] + rValues[7] == value) {
						move = restorePosition(1, indexRot);
						// console.log( "Offensive move found at " + move);
						moves.push( move);
					}
			}
		}
		return moves;
	}
	
	// Finds a random free position in the board
	// @return the available position or -1 if nothing is available
	this.getRandomMove = function() {
		var attempt = Math.floor( Math.random() * 9);
		//console.log( this.name + " attempting " + attempt);
		for( index = 0; index < 9; index++) {
			if( this.isFree(attempt)) return attempt;
			attempt = (++attempt) % 9;
			//console.log( "Now attempting " + attempt);
		}
		// eveything failed
		return -1;
	};
	
	// Finds if there is a win move for a given value on the entire board
	// @param value we are testing for win move
	// @return index of the winning position or -1 if no move is winning
	this.getWinMove = function(value) {
		var index1, index2, index3;
		// check all rows
		for( var index = 0; index < 3; index++) {
			index1 = index * 3;
			index2 = index1 + 1;
			index3 = index2 + 1;
			var move = getWinMove3( value, index1, index2, index3);
			if( move != -1) return move;
			index1 = index;
			index2 = index1 + 3;
			index3 = index2 + 3;
			move = getWinMove3( value, index1, index2, index3);
			if( move != -1) return move;
		}
		index1 = 0; index2 = 4; index3 = 8;
		move = getWinMove3( value, index1, index2, index3);
		if( move != -1) return move;
		index1 = 2; index2 = 4; index3 = 6;
		move = getWinMove3( value, index1, index2, index3);
		if( move != -1) return move;
		return -1;
	}
	
	
	// Finds if there is a win move for a given value within three positions
	// @param value to be tested
	// @param index1 index of the first position to be tested
	// @param index2 index of the first position to be tested
	// @param index3 index of the first position to be tested
	// @result winning position or -1 if no position is winning
	function getWinMove3( value, index1, index2, index3) {
		if( index1 < 0 || index1 > 8 || index2 < 0 || index2 > 8 || index3 < 0 || index3 > 8) return -1;
		var count = (values[index1] == value ? 1 : 0) + (values[index2] == value ? 1 : 0) + (values[index3] == value ? 1 : 0);
		if( count == 2) {
			if( values[index1] == 0) return index1;
			if( values[index2] == 0) return index2;
			if( values[index3] == 0) return index3;
		}
		return -1;
	}
	
	// Get the winner of a given row
	// @param index Row index between 0 and 2. Top row is 0
	this.getRowWinner = function(index) {
		if( index < 0 || index >= 3) return 0;
		index *= 3;
		return getWinnerAtIndex(index, index+1, index+2);
	};
	// Finds out if there is a winner and returns it
	// @return value of the winner 0 for none, 1 or -1 for first and second players
	this.getWinner = function() {
		winner = 0;
		output = []; // will store all 8 possible combination
		for(index = 0; index < 3; index++) {
			winner = this.getRowWinner(index);
			if( winner != 0) return winner;
			winner = this.getColWinner(index);
			if( winner != 0) return winner;
			if(index != 2) {
				winner = this.getDiagWinner(index);
				if( winner != 0) return winner;
			}
		}
		return winner;
	};
	// Finds out of the three values at the given indexes are identical
	// @return 1 or -1 if there is a winner, 0 otherwise
	function getWinnerAtIndex( index1, index2, index3) {
		if( values[index1] == values[index2] && values[index1] == values[index3]) {
			return values[index1];
		}
		return 0;
	}
	// Finds out if the board is full
	// @return true if the board is full
	this.isFull = function() {
		var count = 0;
		for( index = 0; index < 9; index++) {
			if(values[index] != 0) count++;
		}
		return count >= 9;
	};
	// Finds out if a position is available
	// @param index position to be tested between 0 and 8
	// @return true if the position is available, false if the position is taken or the index is invalid
	this.isFree = function (index) {
		return this.get(index) === 0;
	};
	// find out if two positions are symetrical
	// @return true if both positions are symetrical from the center
	this.isSymetrical = function(pos1, pos2) {
		return pos1 + pos2 == 8;
	}
	// Finds out if a player has won the current board
	// @return true if there is a winning player, false otherwise
	this.isWon = function() {
		winner = this.getWinner();
		//console.log( "Winner : " + winner);
		return winner != 0;
	};

	function restorePosition( position, rotationCount) {
		var p = position;
		if( rotationCount != 0) {
			for( rc = rotationCount; rc > 0; rc--) {
				switch( p) {
					case 0: p = 2; break;
					case 2: p = 8; break;
					case 8: p = 6; break;
					case 6: p = 0; break;
					case 1: p = 5; break;
					case 5: p = 7; break;
					case 7: p = 3; break;
					case 3: p = 1; break;
				}
			}
		}
		//console.log("Position  pos=" + position + " rot=" + rotationCount + " restored=" + p);
		
		return p;
	}
	
	// Creates a set of values with rotated position by 90 clockwise
	// 0 => 2, 1 =>5, 2 => 8 ...
	function rotate(v) {
		var rv = [];
		rv[0] = v[2];
		rv[1] = v[5];
		rv[2] = v[8];
		rv[3] = v[1];
		rv[4] = v[4];
		rv[5] = v[7];
		rv[6] = v[0];
		rv[7] = v[3];
		rv[8] = v[6];
		return rv;
	}
	
	// Records a move in the board
	// @param position a value between 0 and 8
	// @param value the player either 1 or -1
	// @return The position on success or -1 if the any parameter is invalid
	this.set = function( position, value) {
		// forbids invalid parameters
		if( position < 0 || position >=9 || (value != 1 && value != -1)) return -1;
		// forbids occupied position
		if( values[position] != 0) return -1;
		
		values[position] = value;
		return position;
	};
};


