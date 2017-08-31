//var synaptic = require('./synaptic.js');
var synaptic = require('synaptic');
require('./perfect-player.js');
require('./random-player.js');
require('./ttt-board.js');
var fs = require('fs');

function Perceptron()
{
	// create the layers
	var inputLayer = new synaptic.Layer(9);
	var hiddenLayer1 = new synaptic.Layer(100);
	var hiddenLayer2 = new synaptic.Layer(9);
	//var hiddenLayer3 = new synaptic.Layer(9);
	var outputLayer = new synaptic.Layer(9);

	// connect the layers
	inputLayer.project(hiddenLayer1);
	//hiddenLayer1.project(outputLayer);
	hiddenLayer1.project(hiddenLayer2);
	//hiddenLayer2.project(outputLayer);
	//hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer1, hiddenLayer2],
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
console.time('loading');
require('./training.data');
console.timeEnd('loading');
console.log( "Training set size " + trainingSet.length);
//console.log( "Pre training : " + JSON.stringify(myPerceptron));

console.time('training');

trainer.train(trainingSet,{
	rate:0.01,
	error:0.0005,
	iterations:200,
	cost:synaptic.Trainer.cost.ENTROPY,
	schedule: {
	every: 1, // repeat this task every xxx iterations
	do: function(data) {
		// custom log
		console.log("[", data.iterations ,"] error", data.error, "rate", data.rate);
	}
}
});

console.timeEnd('training');
//console.log( "Post training : " + JSON.stringify(myPerceptron));

fs.writeFile("network.json", JSON.stringify( myPerceptron.toJSON()), "utf-8", function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 


trainingSet = [];


	var board = new Board();
	var player1 = new RandomPlayer();
	var player2 = new PerfectPlayer();
	while( !(board.isWon() || board.isFull())) {
		board.set(player1.play(board, 1), 1);
		board.display();
		console.log( myPerceptron.activate( board.getValues()));
		board.set(player2.play(board, -1), -1);
	}
	
	
var series = new Series();



	