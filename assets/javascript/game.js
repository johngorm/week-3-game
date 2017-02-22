
function pickSolution() {
	var index = Math.floor(Math.random()*(solutionBank.length) - 1);
	return solutionBank[index];
}

var solutionBank = ["mario", "sonic", "link", "ness", "samus", "jigglypuff", "yoshi", "zelda", "pokeball", "marth", 
		"ganon", "pikachu" , "bowser", "fox", "wario" ];
var displayedSolution = []; /*array of blanks that is same size as solution,
						will reveal letters with correct guesses*/ 
var solution;
var guessedLetters = []; /*array*/
var incorrectGuesses = [];
var wins = 0;
var guessRemain = 10;

solution = pickSolution();

var split_solution = solution.split("");
for(var i = 0; i < solution.length; i++)
{
	displayedSolution[i] = "-";
}

updateScreen();
/*var solution_space = document.getElementById("solution");

solution_space.innerHTML = displayedSolution.join('');

document.getElementById("remaining_guesses").innerHTML = guessRemain;*/

function updateScreen(){
	document.getElementById("incorrect_letters").innerHTML =  incorrectGuesses.toString() ;
	document.getElementById("remaining_guesses").innerHTML =  guessRemain ;
	document.getElementById("win_counter").innerHTML = "Wins: " + wins; 
	document.getElementById("solution").innerHTML = displayedSolution.join('');
}


function resetGame () {
	console.log("foo");
	guessRemain = 10;
	wins = 0;
	solution = pickSolution();
	guessedLetters = [];
	incorrectGuesses = [];
	displayedSolution = [];
	for(var i = 0; i < solution.length; i++)
	{
		displayedSolution[i] = "-";
	}
	updateScreen();

	split_solution = solution.split("");

};



document.onkeyup = function(){

	var userguess = event.key;
	var char_position;
	var isGuessInSol = false; 
	var isOldGuess = false;
	/*test keystroke to see if it already was pressed*/

	for(var ii = 0; ii < guessedLetters.length; ii++){

		if(guessedLetters[ii] == userguess){
			isOldGuess= true;
			break;

		}

	}
	if(!isOldGuess){


		for(var jj = 0; jj < split_solution.length; jj++){
		
			if(split_solution[jj] == userguess)
			{

				isGuessInSol = true;
				displayedSolution[jj] = userguess;
				console.log(displayedSolution);
			}
		}

		if(isGuessInSol){
			displayedSolution[char_position] = userguess;
			/*solution_space.innerHTML = displayedSolution.join('');
			/*check to see if word is complete*/
			updateScreen();
			if(displayedSolution.toString() === split_solution.toString()){
				/*win state*/
				console.log("Win");
				wins++;
				document.getElementById("win_counter").innerHTML = "Wins: " + wins;
				return;
			}
			else{
				
				console.log("split: " + split_solution + " " + split_solution.length);
				console.log("Correct");

			}
		}
		else{
			console.log("Wrong guess");
			incorrectGuesses.push(userguess);
			if(guessRemain == 1){
				console.log("You lose");
				wins--;
				document.getElementById("win_counter").innerHTML = "Wins: " + wins;
				return;
			}
			guessRemain--;
			console.log("Update guessed letters");
			
			

		}
		guessedLetters.push(userguess);
		updateScreen();
		
		
	}
};