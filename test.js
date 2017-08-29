require('./ttt-board.js');
require('./ttt-result.js');
require('./ttt-game.js');
require('./ttt-series.js');
require('./sequence-player.js');
require('./random-player.js');
require('./perfect-player.js');
require('./finisher-player.js');
require('./blocker-player.js');
require('./human-player.js');


var playerS1 = new SequencePlayer("Sam");
var playerS2 = new SequencePlayer("Sandy");
var playerR1 = new RandomPlayer("Randy");

var playerP1 = new PerfectPlayer("Perfect");
var playerP2 = new PerfectPlayer("90", 10);
var playerP3 = new PerfectPlayer("80", 20);
var playerP4 = new PerfectPlayer("70", 30);
var playerP5 = new PerfectPlayer("60", 40);
var playerP6 = new PerfectPlayer("50", 50);
var playerP7 = new PerfectPlayer("40", 60);
var playerP8 = new PerfectPlayer("30", 70);
var playerP9 = new PerfectPlayer("20", 80);
var playerP10 = new PerfectPlayer("10", 90);
var playerH1 = new HumanPlayer("Human");

var playerF1 = new FinisherPlayer("Finisher");
var playerB1 = new BlockerPlayer("Blocker");


var scenario = 1;
switch(scenario) {
	case 1:
		//var players = [playerS1, playerR1, playerP1, playerF1, playerB1, playerP2, playerP3, playerP4, playerP5, playerP6, playerP7, playerP8, playerP9, playerP10];
		var players = [playerB1, playerP1, playerP2, playerP3, playerP4, playerP5, playerP6, playerP7, playerR1];
		var series = new Series( 1000, players);
		series.play();
		break;
		
	case 2:
		var game = new Game( playerH1, playerP1);
		game.play();
		game.display_board();
		break;
	
	case 3:
		console.log( playerR1 + " vs " + playerH1);
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

