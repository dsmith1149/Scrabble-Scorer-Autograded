// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

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
            letterPoints += ` Points for '${word[i]}': ${pointValue}\n`
         }

      }

   }
   return letterPoints

}

function initialPrompt() {
   console.log("Let's play some scrabble! ");
   let word = input.question("Enter a word to score: ")
   return word

};

function simpleScorer(word) {
   word = word.toUpperCase();
   return word.length;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0
   for (let i = 0; i < word.length; i++) {
      if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
         score += 3
      }
      else {
         score += 1
      }
   }
   return score
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (newPointStructure[letter]) {
         score += newPointStructure[letter];
      }
   }
   return score;

}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: " + scoringAlgorithms[0].description);
   console.log("1 - Vowel Bonus: " + scoringAlgorithms[1].description);
   console.log("2 - Scrabble: " + scoringAlgorithms[2].description);
   let algorithmChoice = input.question("Enter 0, 1, or 2:");
   return scoringAlgorithms[algorithmChoice];
}
let newPointStructure = transform(oldPointStructure);

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (points in oldPointStructure) {
      let juicy = oldPointStructure[points];
      for (let i = 0; i < juicy.length; i++) {
         let fruit = juicy[i].toLowerCase();
         newPointStructure[fruit] = parseInt(points, 10);
      }
   }
   return newPointStructure
}

function runProgram() {
   let word = initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   console.log(`Using algorithm: ${selectedAlgorithm.name}`);
   console.log(`Score for '${word}':`);
   console.log(selectedAlgorithm.scorerFunction(word));
}

runProgram();
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
