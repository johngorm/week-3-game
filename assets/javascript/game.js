
var game = {
	solutionBank : ["mario", "sonic", "link", "ness", "samus", "jigglypuff", "yoshi", "zelda", "pokeball", "marth", 
		"ganon", "pikachu" , "bowser", "fox", "wario" ],
	displayedSolution : [],
	
	pickSolution : function() {
		var index = Math.floor(Math.random()*(this.solutionBank.length) - 1);
		this.solution = this.solutionBank[index];
	},
	guessedLetters: [],
	solution: [],
	incorrectGuesses: [],
	wins: 0,
	guessRemain: 10,
	isDone : false
};

game.pickSolution();


function updateScreen(){
	document.getElementById("incorrect_letters").innerHTML =  game.incorrectGuesses.toString() ;
	document.getElementById("remaining_guesses").innerHTML =  game.guessRemain ;
	document.getElementById("win_counter").innerHTML = "Wins: " + game.wins; 
	document.getElementById("solution").innerHTML = game.displayedSolution.join('');
}


function resetGame () {
	console.log("foo");
	game.guessRemain = 10;
	game.wins = 0;
	game.pickSolution();
	game.guessedLetters = [];
	game.incorrectGuesses = [];
	game.displayedSolution = [];
	for(var i = 0; i < solution.length; i++)
	{
		game.displayedSolution[i] = "-";
	}
	updateScreen();


};

function getNewSolution(){
	game.guessRemain = 10;
	game.guessedLetters = [];
	game.incorrectGuesses = [];
	game.pickSolution();
	game.displayedSolution = [];
	for(var i = 0; i < game.solution.length; i++)
	{
		game.displayedSolution[i] = "-";
	}
	updateScreen();
}


for(var i = 0; i < game.solution.length; i++)
{
	game.displayedSolution[i] = "-";
}

updateScreen();



document.onkeyup = function(){

	var userguess = event.key;
	var char_position;
	var isGuessInSol = false; 
	var isOldGuess = false;
	/*test keystroke to see if it already was pressed*/
	if(game.isDone){
		getNewSolution();
		game.isDone = false;
		
	}
	else{
		for(var ii = 0; ii < game.guessedLetters.length; ii++){

			if(game.guessedLetters[ii] == userguess){
				isOldGuess= true;
				break;

			}

		}
		if(!isOldGuess){


			for(var jj = 0; jj < game.solution.length; jj++){
			
				if(game.solution[jj] == userguess)
				{
					isGuessInSol = true;
					game.displayedSolution[jj] = userguess;
					console.log(game.displayedSolution);
				}
			}

			if(isGuessInSol){
				game.displayedSolution[char_position] = userguess;
				
				/*check to see if word is complete*/
				
				if(game.displayedSolution.join('') === game.solution.toString()){
					/*win state*/
					console.log("Win");
					game.wins++;
					game.isDone = true;
					updateScreen();
					//getNewSolution();
					
					return;
				}
			}
			else{
				console.log("Wrong guess");
				game.incorrectGuesses.push(userguess);
				game.guessRemain--;
				if(game.guessRemain == 0){

					console.log("You lose");
					game.wins--;
					game.isDone = true;
					updateScreen();
					//getNewSolution();
					return;
				}
				
				console.log("Update guessed letters");
				
			}
			game.guessedLetters.push(userguess);
			updateScreen();
				
		}
	}
};