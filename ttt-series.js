require('./ttt-result.js');
require('./ttt-game.js');

Series = function(c, p){
	gamesCount = c;
	players = p;
	this.play = function() {
		console.log( "Players:" + players);
		console.time('elapsed');
		playersCount = players.length;
		results = [];
		for( var index = 0; index < players.length; index++) {
			results.push( new Result( players[index]));
		}
		scores = Array.apply(null, Array(players.length)).map(Number.prototype.valueOf, 0);
		for( var p1index = 0; p1index < playersCount - 1; p1index++) {
			for( var p2index = p1index + 1; p2index < playersCount; p2index++) {
				var p1 = players[p1index];
				var p2 = players[p2index];
				var gamesResults = [0,0,0];
				for( var gameIndex = 0; gameIndex < gamesCount; gameIndex+=2) {
					result = new Game( p1, p2).play(true);
					gamesResults[result+1]++;
					result = new Game( p2, p1).play(true) * -1;
					gamesResults[result+1]++;
				}
				results[p1index].wins += gamesResults[2];
				results[p1index].draws += gamesResults[1];
				results[p1index].losses += gamesResults[0];
				results[p2index].wins += gamesResults[0];
				results[p2index].draws += gamesResults[1];
				results[p2index].losses += gamesResults[2];
				console.log( "Game " + p1 + " vs " + p2 + ", results:(" + p1 + "="+ gamesResults[2] + "/" + p2 + "=" + gamesResults[0] + "/Draw=" + gamesResults[1] + ")");
			}
		}
		
		//console.log( "Playing " + count + " games");
		var totalGamesPlayed = players.length * (players.length - 1) / 2 * gamesCount;
		console.log("==========\nStats\nGames played " + totalGamesPlayed.toLocaleString());
		console.timeEnd('elapsed');
		console.log("=======\nResults\n=======");
		results.sort( compareResults);
		results.forEach( function(result) {
			console.log( result.toString());
		});
	};
	
	function compareResults(r1, r2) {
		return r1.wins < r2.wins ? 1 : (r1.wins > r2.wins ? -1 : 0);
	};
	
};
