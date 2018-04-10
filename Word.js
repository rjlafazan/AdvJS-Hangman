//

var Word = function() {
  this.wordCorrect = function(word, userGuess, letterGuess) {
    if (word.indexOf(userGuess.input) !== -1) {
      return (letterGuess = true);
    } else {
      return letterGuess;
    }
  };
};

module.exports = Word;
