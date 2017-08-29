//var synaptic = require('./synaptic.js');
var synaptic = require('synaptic');

function Perceptron(input, h1, h2, output)
{
	// create the layers
	var inputLayer = new synaptic.Layer(input);
	var hiddenLayer1 = new synaptic.Layer(h1);
	var hiddenLayer2 = new synaptic.Layer(h2);
	var outputLayer = new synaptic.Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer1);
	hiddenLayer1.project(hiddenLayer2);
	hiddenLayer2.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer1, hiddenLayer2],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new synaptic.Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron(10,8,8,9);
var trainer = new synaptic.Trainer( myPerceptron);