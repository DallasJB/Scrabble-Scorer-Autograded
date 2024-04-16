// Graded Assignment #2- Scrabble-Scorer.js - Dallas J Bernhoester

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();

	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {

		 if (oldPointStructure[pointValue].includes(word[i])) {

			letterPoints += `Points for '${word[i]}': ${pointValue}\n`

		 }
 
	  }
	}
   console.log(letterPoints);
   return letterPoints;
 }

 function transform(oldObject) {
   const newStructure = {};
   for (const [pointValue, letters] of Object.entries(oldObject)) {
     for (const letter of letters) {
       newStructure[letter.toLowerCase()] = Number(pointValue);
     }
   }
   return newStructure;
 };
 
 let newPointStructure = transform(oldPointStructure);
 newPointStructure[" "] = 0;


function initialPrompt() {
   return input.question("Let's play some scrabble!\n\nEnter a word: "); 
};


function simpleScorer(word) {
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score = score + 1;
   }
   console.log(`Points for '${word}' is ${score}`);
   return score;
}


function vowelBonusScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
   const pointValue = ['A', 'E','I', 'O', 'U'] 
 
	for (let i = 0; i < word.length; i++) {

		 if (pointValue.includes(word[i])) {
         letterPoints = letterPoints + 3;
		 } else {
         letterPoints = letterPoints + 1;
       }

	  
	}
	console.log(`Points for '${word}' is ${letterPoints}`);
   return letterPoints;
 }


const scoringAlgorithms = [
   {
      name: "Simple Score", 
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer,
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer,
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer,
   },
];

const promptQuestion = (`
Which scoring algorithm would you like to use?

  0 - Simple Score: One point per character
  1 - Vowel Bonus: Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  
Enter 0, 1, or 2: `)
const promptQuestionAnswers = ["0", "1", "2"];

function scorerPrompt() {
  let algorithmChoice = input.question(promptQuestion);
  if (!promptQuestionAnswers.includes(algorithmChoice)) {
    console.log("\nINVALID INPUT. Please choose from one of the available scoring options!");
    return scorerPrompt();
  }
  return algorithmChoice;
};

 function scrabbleScorer(word){
   word = word.toLowerCase();
   let score = 0;
   for (let letter of word) {
     score = score + newPointStructure[letter];
   }
  console.log(`Points for '${word}': ${score}`);
   return score
 };
 

function runProgram() {
   scrabbleInput = initialPrompt();
   testType = scorerPrompt();
   scoringAlgorithms[testType].scorerFunction(scrabbleInput);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
