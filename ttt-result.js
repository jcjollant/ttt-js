Result = function Result(p) {
	var player = p;
	this.wins = 0;
	this.draws = 0;
	this.losses = 0;
	
	this.toString = function() {
		return player + " W=" + this.wins + " D=" + this.draws + " L=" + this.losses;
	};
}

	
