SequencePlayer = function SequencePlayer( name) {
	this.name = name;
	this.play = function( board, value) {
		//console.log( "playing as " + value)
		for( index = 0; index < 9; index++) {
			//console.log( this.name + " attempting " + index);
			if( board.get(index) == 0) return index;
		}
		// no free cell
		return -1;
	};
	this.toString = function() { return name;};
}
