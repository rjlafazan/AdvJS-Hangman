var inquirer = require("inquirer");
var word = require("./Word.js");
var letter = require("./Letter.js");

var wordArray = [
  "muaythai",
  "judo",
  "jiujitsu",
  "karate",
  "kravmaga",
  "kungfu",
  "aikido",
  "jeetkunedo",
];

var newGame = new chooseWord();
var newWord = new word();
var newLetter = new letter();

var randomizedWord;
var letters;
var currentWord = "";
var win = 0;
var lose = 0;
var guesses = 7;
var incorrectLetter = [];

//ask if user wants to play... it's a trick question. They have no choice!
function playHangman() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "PlayGame",
        message: "Would you like to play a game?",
        choices: ["Yes", "No"],
      },
    ])
    .then(function(user) {
      if (user.PlayGame === "Yes") {
        console.log("Great! Here's your first word:");
        // functions to begin game here
        beginGame();
      } else {
        console.log("Too bad! You're playing anyways! MUAHAHA!!!");
        console.log("Here's your first word: ");
        // functions to begin game also here
        beginGame();
      }
    });
}
playHangman();

function chooseWord() {
  this.getRandomWord = function(wordArray) {
    var randomWord = wordArray[Math.floor(wordArray.length * Math.random())];
    return randomWord;
  };
}

//function to begin the hangman game by running the necessary functions
function beginGame() {
  guesses = 7;
  incorrectLetter = [];
  currentRanWord();
  displayRandom(randomizedWord);
  userGuess();
}

//chooses a word from the array...
function currentRanWord() {
  randomizedWord = newGame.getRandomWord(wordArray);
  console.log("The Current Word (for easy testing): ", randomizedWord);
  var randIndex = wordArray.indexOf(randomizedWord);
  var removeChosenWord = wordArray.splice(randIndex, 1);
  return;
}

//displays word
function displayRandom(randomCurrentWord) {
  currentWord = "";
  for (var i = 0; i < randomCurrentWord.length; i++) {
    if (randomCurrentWord[i] === " ") {
      currentWord = currentWord + " ";
    } else {
      currentWord = currentWord + "_";
    }
  }
  console.log("Current Word: " + currentWord);
}
//function to check user guess inputs
function userGuess() {
  if (guesses > 0) {
    inquirer
      .prompt([
        {
          name: "input",
          message: "Please input a letter",
          validate: function(value) {
            //this regex makes it so user can only input a valid alphabet letter
            if (/[a-zA-Z]/.test(value)) {
              return true;
            }
            return "Try again! Input must be a letter.";
          },
        },
      ])
      .then(function(answer) {
        letters = answer;
        var letterGuess = false;
        letterGuess = newWord.wordCorrect(randomizedWord, letters, letterGuess);

        if (letterGuess === true) {
          currentWord = newLetter.checkLetter(
            randomizedWord,
            letters,
            currentWord
          );
          console.log("Current word: " + currentWord);
          if (currentWord === randomizedWord) {
            win++;

            console.log("************************");
            console.log("CONGRATS! YOU WIN!!!");
            console.log("Correct Answer: " + randomizedWord);
            console.log("Number of wins: " + win);
            console.log("Number of losses: " + lose);
            console.log("************************");

            console.log("Next Game");
            beginGame();
            return;
          }
        } else {
          if (incorrectLetter.length === 0) {
            incorrectLetter.push(letters.input);
          }
          if (incorrectLetter.indexOf(letters.input) === -1) {
            guesses--;
            incorrectLetter.push(letters.input);
            console.log("Guesses remaining: " + guesses);
          } else {
            console.log("you already guessed that!");
          }
        }
        userGuess();
      });
  } else {
    lose++;
    console.log("************************");
    console.log("YOU LOSE! :'(");
    console.log("Correct Answer: " + randomizedWord);
    console.log("Number of wins: " + win);
    console.log("Number of losses: " + lose);
    console.log("************************");
    facePalm();

    console.log("Next Game");
    beginGame();
  }
}

function facePalm() {
  console.log(
    "............................................________........................"
  );
  console.log(
    "....................................,.-‘”.................``~.,.................."
  );
  console.log(
    ".............................,.-”................................“-.,............"
  );
  console.log(
    ".........................,/...........................................”:,........"
  );
  console.log(
    ".....................,?.................................................,....."
  );
  console.log(
    ".................../.....................................................,}...."
  );
  console.log(
    "................./..................................................,:`^`..}...."
  );
  console.log(
    ".............../...............................................,:”........./....."
  );
  console.log(
    "..............?.....__......................................:`.........../....."
  );
  console.log(
    "............./__.(.....“~-,_...........................,:`........../........ "
  );
  console.log(
    ".........../(_....”~,_........“~,_.................,:`........_/........... "
  );
  console.log(
    "..........{.._$;_......”=,_.......“-,_.....,.-~-,},.~”;/....}........... "
  );
  console.log(
    "...........((.....*~_.......”=-._.....“;,,./`.../”............../............ "
  );
  console.log(
    "...,,,___.`~,......“~.,..................`.....}............./............. "
  );
  console.log(
    "............(....`=-,,.......`......................(......;_,,-”............... "
  );
  console.log(
    "............/.`~,......`-.................................../................... "
  );
  console.log(
    ".............`~.*-,...................................|,./.....,__........... "
  );
  console.log(
    ",,_..........}.>-._.................................|..............`=~-,.... "
  );
  console.log(
    ".....`=~-,__......`,....................................................... "
  );
  console.log(
    "...................`=~-,,.,.................................................... "
  );
  console.log(
    "................................`:,,.........................`..............__.. "
  );
  console.log(
    ".....................................`=-,.................,%`>--==``....... "
  );
  console.log(
    "......................................_..........._,-%.......`............... "
  );
  console.log(
    ".................................,<`.._|_,-&``................`.............."
  );
}
