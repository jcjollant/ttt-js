require('./ttt-board.js');
require('./ttt-result.js');
require('./sequence-player.js');
require('./random-player.js');
require('./perfect-player.js');
require('./finisher-player.js');
require('./blocker-player.js');

(Game = function( p1, p2){
	board = new Board();
	player1 = p1;
	player2 = p2;
	moves = [];
}).prototype = {
	display_board: function(){ 
		board.display();
		console.log( "Moves:" + moves);
	},
	play: function(quiet=false) {
		//board.debug();
		if( !quiet) console.log( "Playing " + player1 + "[X] vs " + player2 + "[O]");
		nextPlayer = player1;
		playerValue = 1;
		while( !board.isFull() && !board.isWon()) {
			move = nextPlayer.play( board, playerValue);
			if( move == -1) {
				console.log( "Player " + nextPlayer + " cannot move");
				break;
			}
			moves.push(move);
			//console.log( "Player " + nextPlayer + " moving at " + move);
			board.set( move, playerValue);
			nextPlayer = (nextPlayer === player1 ? player2 : player1);
			playerValue = playerValue * -1;
			
		}
		//board.display();
		winner = board.getWinner();
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
	}
};

(Series = function(c, p){
	gamesCount = c;
	players = p;
}).prototype = {
	play : function() {
		console.log( "Players:" + players);
		console.time('elapsed');
		playersCount = players.length;
		results = [];
		for( var index = 0; index < players.length; index++) {
			results.push( new Result( players[index]));
		}
		scores = Array.apply(null, Array(players.length)).map(Number.prototype.valueOf, 0);
		for( var p1index = 0; p1index < playersCount - 1; p1index++) {
			for( var p2index = p1index + 1; p2index < playersCount; p2index++) {
				var p1 = players[p1index];
				var p2 = players[p2index];
				var gamesResults = [0,0,0];
				for( var gameIndex = 0; gameIndex < gamesCount; gameIndex++) {
					result = new Game( p1, p2).play(true);
					gamesResults[result+1]++;
					result = new Game( p2, p1).play(true) * -1;
					gamesResults[result+1]++;
				}
				results[p1index].wins += gamesResults[2];
				results[p1index].draws += gamesResults[1];
				results[p1index].losses += gamesResults[0];
				results[p2index].wins += gamesResults[0];
				results[p2index].draws += gamesResults[1];
				results[p2index].losses += gamesResults[2];
				console.log( "Game " + p1 + " vs " + p2 + ", results:(" + p1 + "="+ gamesResults[2] + "/" + p2 + "=" + gamesResults[0] + "/Draw=" + gamesResults[1] + ")");
			}
		}
		
		//console.log( "Playing " + count + " games");
		console.timeEnd('elapsed');
		results.sort( compareResults);
		console.log("Results:");
		results.forEach( function(result) {
			console.log( result.toString());
		});
	}
};

function compareResults(r1, r2) {
	return r1.wins < r2.wins ? 1 : (r1.wins > r2.wins ? -1 : 0);
};
	


var playerS1 = new SequencePlayer("Sam");
var playerS2 = new SequencePlayer("Sandy");
var playerR1 = new RandomPlayer("Randy");

var playerP1 = new PerfectPlayer("Perfect");
var playerP2 = new PerfectPlayer("95", 5);
var playerP3 = new PerfectPlayer("90", 10);
var playerP4 = new PerfectPlayer("25", 75);
var playerP5 = new PerfectPlayer("75", 25);
var playerP6 = new PerfectPlayer("50", 50);
var playerP7 = new PerfectPlayer("P7");

var playerF1 = new FinisherPlayer("Finisher");
var playerB1 = new BlockerPlayer("Blocker");

//var players = [playerS1, playerR1, playerP1, playerF1, playerB1, playerP2, playerP3, playerP4, playerP5, playerP6];
var players = [playerP1, playerP7];

var scenario = 1;
switch(scenario) {
	case 1:
		var series = new Series( 5000, players);
		series.play();
		break;
		
	case 2:
		var game = new Game( playerF1, playerP1);
		game.play();
		game.display_board();
		break;
	
	case 3:
		console.log( playerF1 + " vs " + playerP1);
		do {
		var game = new Game( playerF1, playerP1);
		} while( game.play(true) != 1);
		game.display_board();
		break;
	case 4:
		var board = new Board();
		board.set(7,1);
		board.set(4,-1);
		board.set(5,1);
		board.display();
		console.log( "ForkMove=" + board.getForkMove(1));
		break;

}

