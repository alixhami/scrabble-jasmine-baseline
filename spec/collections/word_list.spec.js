// Do not remove
import Word from 'models/word';
import WordList from 'collections/word_list';

describe('WordList', function() {
  describe('highestScoringWord', function() {

    it ('Returns undefined if there are no words', function() {
      var wordList = new WordList();
      expect(wordList.highestScoringWord()).toEqual(undefined);
    });

    it ('If there is only one word, return it', function() {
      var word = new Word({ text: 'bacon' });
      var wordList = new WordList(word);
      expect(wordList.highestScoringWord()).toEqual(word);
    });

    it ('Returns the highest word if there are two words', function() {
      var word1 = new Word({ text: 'bacon' });
      var word2 = new Word({ text: 'twelve' });
      var wordList = new WordList([word1, word2]);

      expect(wordList.highestScoringWord()).toEqual(word2);
    });

    it ('If tied, prefer a word with 7 letters', function() {
      var word1 = new Word({ text: 'zzzzzz' });
      var word2 = new Word({ text: 'virtual' });
      var wordList = new WordList([word1, word2]);

      expect(wordList.highestScoringWord()).toEqual(word2);
    });

    it ('If tied and no word has 7 letters, prefers the word with fewer letters', function() {
    });

    it ('Returns the first word of a tie with same letter count', function() {
      var word1 = new Word({ text: 'bacon' });
      var word2 = new Word({ text: 'sandy' });
      var wordList = new WordList([word1, word2]);

      expect(wordList.highestScoringWord()).toEqual(word1);
    });
  });

  describe('totalScore', function() {
    it ('Returns the total score of two valid words', function () {
      var word1 = new Word({ text: 'bacon' });
      var word2 = new Word({ text: 'sandy' });
      var wordList = new WordList([word1, word2]);

      expect(wordList.totalScore()).toEqual(18);
    });

    it ('Returns zero if there are no words', function () {
      var wordList = new WordList();
      expect(wordList.totalScore()).toEqual(0);
    });
  });
});
