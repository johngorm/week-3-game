

var solutionBank = ["mario", "sonic", "link", "ness", "samus", "jigglypuff", "yoshi", "zelda", "pokeball", "marth" ];
var displayedSolution = []; /*array of blanks that is same size as solution,
						will reveal letters with correct guesses*/ 
var solution;
var guessedLetters = []; /*array*/
var wins;
var guessRemain = 10;

solution = solutionBank[0];
var split_solution = solution.split("");
for(var i = 0; i < solution.length; i++)
{
	displayedSolution[i] = "-";
}


document.write("Press any key to get started!");

document.onkeyup = function(){

	var userguess = event.key;
	var char_position;
	var isGuessInSol = false; 
	var isOldGuess = false;
	/*test keystroke to see if it already was pressed*/

	for(var ii = 0; ii < guessedLetters.length; ii++){

		if(guessedLetters[ii] == userguess){
			isOldGuess= true;
			console.log("old gues");
			break;

		}

	}
	if(!isOldGuess){


		for(var jj = 0; jj < split_solution.length; jj++){
		
			if(split_solution[jj] == userguess)
			{

				isGuessInSol = true;
				displayedSolution[jj] = userguess;
				console.log("display: " + displayedSolution[jj])
			}
		}

		if(isGuessInSol){
			displayedSolution[char_position] = userguess;
			console.log("solution update");
			/*check to see if word is complete*/
			if(displayedSolution === split_solution){
				/*win state*/
				console.log("Win");
				return;
			}
			else{
				console.log("dipslay"  + displayedSolution);
				console.log("split: " + split_solution);
				console.log("guessedLetters: " + guessedLetters)
				console.log("Continue");

			}
		}
		else{
			guessRemain--;
			
			console.log("Wrong guess");


		}
		guessedLetters.push(userguess);

	}

};