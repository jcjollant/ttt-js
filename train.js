//var synaptic = require('./synaptic.js');
var synaptic = require('synaptic');
require('./perfect-player.js');
require('./random-player.js');
require('./ttt-board.js');

function Perceptron()
{
	// create the layers
	var inputLayer = new synaptic.Layer(9);
	var hiddenLayer1 = new synaptic.Layer(9);
	//var hiddenLayer2 = new synaptic.Layer(9);
	//var hiddenLayer3 = new synaptic.Layer(9);
	var outputLayer = new synaptic.Layer(9);

	// connect the layers
	inputLayer.project(hiddenLayer1);
	hiddenLayer1.project(outputLayer);
	//hiddenLayer2.project(hiddenLayer3);
	//hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer1],
		output: outputLayer
	});
	
	this.toString = function() {
		return 
	}
}

// extend the prototype chain
Perceptron.prototype = new synaptic.Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron();
var trainer = new synaptic.Trainer( myPerceptron);
var trainingSet = require('./training.data');
trainer.train(trainingSet);
trainingSet = [];

// console.log(JSON.stringify(myPerceptron));

for( var index = 0; index < 3; index++) {
	var board = new Board();
	var player1 = new RandomPlayer();
	var player2 = new PerfectPlayer();
	while( !(board.isWon() || board.isFull())) {
		board.set(player1.play(board, 1), 1);
		console.log( myPerceptron.activate( board.getValues()));
		board.set(player2.play(board, -1), -1);
		board.display();
	}
}