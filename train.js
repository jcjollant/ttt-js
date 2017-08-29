require('./synaptic.js');

function Perceptron(input, h1, h2, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer1 = new Layer(h1);
	var hiddenLayer2 = new Layer(h2);
	var outputLayer = new Layer(output);

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
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPeceptron = new Perceptron(10,8,8,9);
var trainer = new Trainer( myPerceptron);