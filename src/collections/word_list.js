import Backbone from 'backbone';

import Word from 'models/word';

const WordList = Backbone.Collection.extend({
  model: Word,

  // Returns the Word model with the highest score, according
  // to standard tie-breaking rules
  highestScoringWord: function() {
    if (this.length <= 1) {
      return this.at(-1);
    }

    // builds array of highest scoring words
    var highestScoringWords = [];
    var highestScore = 0;
    this.each(function (word) {
      if (word.score() === highestScore) {
        highestScoringWords.push(word);
      } else if (word.score() > highestScore) {
        highestScoringWords = [ word ];
        highestScore = word.score();
      }
    });

    // tie breaker
    var highestScoringWord = highestScoringWords[0];
    highestScoringWords.forEach(function (word) {
      var currentWord = word.get('text');
      if (currentWord.length < highestScoringWord.length && highestScoringWord.length != 7) {
        highestScoringWord = word;
      } else if (currentWord.length === 7 && highestScoringWord.length != 7) {
        highestScoringWord = word;
      }
    });
    return highestScoringWord;
  },

  totalScore: function() {
    var total = 0;

    this.each(function (word) {
      total += word.score();
    });
    return total;
  }
});

export default WordList;
