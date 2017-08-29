Result = function Result(p) {
	var player = p;
	this.wins = 0;
	this.draws = 0;
	this.losses = 0;
	
	this.toString = function() {
		var totalGames = this.wins + this.draws + this.losses;
		return player + "\tW=" + formatValue(this.wins, totalGames) + "\tD=" + formatValue(this.draws, totalGames) + "\tL=" + formatValue(this.losses, totalGames);
	};
	
	function formatValue( value, total) {
		return value.toLocaleString() + " (" + (total == 0 ? 0 : Math.round( value / total * 100)) + "%)";
	}
}

	
