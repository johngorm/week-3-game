
var solutionBank = ["mario", "sonic", "link", "ness", "samus", "jigglypuff", "yoshi", "zelda", "pokeball", "marth", 
		"ganondorf", "pikachu" , "bowser", "fox", "wario", "olimar"];


var game = {

	displayedSolution : [],
	
	pickSolution : function() {
		var index = Math.floor(Math.random()*(solutionBank.length));
		this.solution = solutionBank[index];
	},
	gameSolution : solutionBank[Math.floor(Math.random())],
	guessedLetters: [],
	solution:[],
	incorrectGuesses: [],
	wins: 0,
	losses:0,
	guessRemain: 10,
	isDone : false
};



function updateScreen(){
	document.getElementById("incorrect_letters").innerHTML =  game.incorrectGuesses.toString() ;
	document.getElementById("remaining_guesses").innerHTML =  "Guesses Remaining: " + game.guessRemain ;
	document.getElementById("win_counter").innerHTML = "Wins: " + game.wins; 
	document.getElementById("loss_counter").innerHTML = "Losses: " + game.losses;
	document.getElementById("solution").innerHTML = (game.displayedSolution.join('')).toUpperCase();
}


function resetGame () {
	game.guessRemain = 10;
	game.wins = 0;
	game.losses = 0;
	game.pickSolution();
	game.guessedLetters = [];
	game.incorrectGuesses = [];
	game.displayedSolution = [];
	for(var i = 0; i < game.solution.length; i++)
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
	document.getElementById("incorrect_letters").innerHTML =  game.incorrectGuesses.toString() ;
	document.getElementById("remaining_guesses").innerHTML =  "Guesses Remaining: " + game.guessRemain ;
	document.getElementById("solution").innerHTML = (game.displayedSolution.join('')).toUpperCase();
}

game.pickSolution();

for(var i = 0; i < game.solution.length; i++)
{
	game.displayedSolution[i] = "-";
}

updateScreen();



document.onkeyup = function(event){
	if(event.which >= 65 && event.which <= 90){
		alert(event.which)
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
					}
				}

				if(isGuessInSol){
					game.displayedSolution[char_position] = userguess;
					
					/*check to see if word is complete*/
					
					if(game.displayedSolution.join('') === game.solution.toString()){
						/*win state*/
						game.wins++;
						game.isDone = true;
						document.getElementById("win_counter").innerHTML = "Wins: " + game.wins;
						document.getElementById("solution").innerHTML = (game.displayedSolution.join('')).toUpperCase();
						return;
					}
				}
				else{ 
					
					game.incorrectGuesses.push(userguess);
					game.guessRemain--;
					if(game.guessRemain == 0){
						/*Lose state*/
						
						game.losses++;
						game.isDone = true;
						document.getElementById("remaining_guesses").innerHTML =  "Guesses Remaining: " + game.guessRemain ;
						document.getElementById("loss_counter").innerHTML = "Losses: " + game.losses;
						return;
					}
					
					
				}
				game.guessedLetters.push(userguess);
				updateScreen();
					
			}
		}
	}
};