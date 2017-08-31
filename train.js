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
//	var hiddenLayer2 = new synaptic.Layer(9);
//	var hiddenLayer3 = new synaptic.Layer(9);
	var outputLayer = new synaptic.Layer(9);

	// connect the layers
	inputLayer.project(hiddenLayer1);
	hiddenLayer1.project(outputLayer);
	//hiddenLayer1.project(hiddenLayer2);
	//hiddenLayer2.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer1],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new synaptic.Network();
Perceptron.prototype.constructor = Perceptron;

/* var myPerceptron = new Perceptron();
console.time('loading');
require('./training.data');
console.timeEnd('loading');
console.log( "Training set size " + trainingSet.length);
//console.log( "Pre training : " + JSON.stringify(myPerceptron));

console.time('training');
var trainer = new synaptic.Trainer( myPerceptron);
trainer.train(trainingSet,{
	rate:0.01,
	error:0.0005,
	iterations:200,
	cost:synaptic.Trainer.cost.CROSS_ENTROPY,
	schedule: {
	every: 1, // repeat this task every xxx iterations
	do: function(data) {
		// custom log
		console.log("[", data.iterations ,"] error", data.error, "rate", data.rate);
	}
}
});
console.timeEnd('training');
 */
 require('./perceptron-player.js');
 require('./ttt-series.js');
var players = [];
for( var index = 0; index < 10; index++) {
	players.push( new PerceptronPlayer( new Perceptron(), index));
}
var series = new Series( 100, players);
series.play();

/* fs.writeFile("network.json", JSON.stringify( myPerceptron.toJSON()), "utf-8", function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
 */
/*
	var board = new Board();
	var player1 = new RandomPlayer();
	var player2 = new PerfectPlayer();
	while( !(board.isWon() || board.isFull())) {
		board.set(player1.play(board, 1), 1);
		board.display();
		console.log( myPerceptron.activate( board.getValues()));
		board.set(player2.play(board, -1), -1);
	}
*/


	