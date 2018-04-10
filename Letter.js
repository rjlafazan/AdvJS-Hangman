var Letter = function() {
  this.checkLetter = function(word, userGuess, displayWord) {
    var wordPlaceHolder = displayWord.split("");

    for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) === userGuess.input) {
        wordPlaceHolder[i] = userGuess.input;
      }
    }
    displayWord = wordPlaceHolder.join("").trim();
    return displayWord;
  };
};

module.exports = Letter;
