// Do not remove
import _ from 'underscore';
import Word from 'models/word';

describe('Word', function() {
  describe('constructor', function() {
    it('Tracks text', function() {
      var word = new Word({
        text: "test"
      });
      expect(word.get('text')).toEqual('test');
    });

    it ('Converts text to lowercase', function() {
      var word = new Word({ text: 'TeSt' });
      expect(word.get('text')).toEqual('test');
    });
  });

  describe('validate', function() {
    it ('permits valid words', function() {
      _.each(['f', 'dog', 'pig', 'goat', 'swizzle'], (text) => {
        var word = new Word({ text: text });
        expect(word.isValid()).toBeTruthy('word: ' + text + ', error: ' + word.validationError);
      });
    });

    it ('permits upper- and lower-case letters', function() {
      _.each(['dog', 'DOG', 'DoG'], (text) => {
        var word = new Word({ text: text });
        expect(word.isValid()).toBeTruthy('word: ' + text + ', error: ' + word.validationError);
      });
    });

    it ('requires text', function() {
      var word = new Word();
      expect(word.isValid()).toBeFalsy();
    });

    // DPR: This is a little pedantic, but it's something I
    // actually ran into while implementing the front end
    // so before fixing the problem I added a test
    it ('requires text to be a string', function() {
      var word = new Word({ text: 333 });
      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects empty words', function() {
      var word = new Word({ text: '' });
      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects words > 7 letters', function() {
      // Boundary condition: 7 letters should work,
      // 8 should fail
      var word = new Word({ text: 'abcdefg' });
      expect(word.isValid()).toBeTruthy();

      var word = new Word({ text: 'abcdefgh' });
      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects things other than letters', function() {
      var words = [
        new Word({ text: '!@#$' }),
        new Word({ text: 'aa&bb' }),
        new Word({ text: '123' })
      ];
      _.each(words, (word) => {
        expect(word.isValid()).toBeFalsy('word: ' + word.get('text'));
      });
    });
  });

  describe('score', function() {
    it ('Correctly scores simple words', function() {
      var word = new Word({ text: 'bacon' });
      expect(word.score()).toEqual(9);
    });

    it ('Adds 50 points for a 7-letter word', function() {
      var word = new Word({ text: 'virtual' });
      expect(word.score()).toEqual(60);
    });

    it ('Returns undefined if the word is invalid', function() {
      var word = new Word({ text: '12345' });
      expect(word.score()).toEqual(undefined);
    });
  });
});
