PerceptronPlayer = function PerceptronPlayer( perceptron, name) {
	this.name = name;
	var perceptron = perceptron;
	this.play = function( board, value) {
		var moves = perceptron.activate( board.getValues());
		var bestMove = -1, bestValue = 0;
		for( var index = 0; index < moves.length; index++) {
			if( moves[index] > bestValue) {
				bestMove = index;
				bestValue = moves[index];
			}
		}
		return bestMove;
	};
	this.toString = function() { return this.name;};
}
