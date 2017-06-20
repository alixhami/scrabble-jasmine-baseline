import Backbone from 'backbone';

import Word from 'models/word';
import WordView from 'views/word_view';

var ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.wordListElement = this.$('#word-list tbody');
    this.newWordInput = this.$('#new-word-form input[name=word]');

    // Maintain a list of views, to cut down
    // on re-rendering time
    this.wordViews = [];
    this.model.each((word) => {
      this.addWord(word);
    });

    this.listenTo(this.model, 'add', this.addWord);
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    // Stats
    this.$('#words-played').html(this.model.length);
    this.$('#total-score').html(this.model.totalScore() + " points");
    var bestWord = this.model.highestScoringWord();
    if (bestWord) {
      this.$('#best-word').html(`"${bestWord.get('text')}" (${bestWord.score()} points)`);
    } else {
      this.$('#best-word').html("N/A");
    }

    // Word list
    this.wordListElement.html('');

    this.wordViews.forEach((wordView) => {
      this.wordListElement.append(wordView.$el);
    });
  },

  events: {
    'submit #new-word-form': 'playWord'
  },

  playWord: function(event) {
    event.preventDefault();
    console.log("In playWord");

    this.$('#word-errors').empty();

    var text = this.newWordInput.val();
    var word = new Word({ text: text });

    // Run this model's validations. See Word.validate()
    // for more information.
    if (word.isValid()) {
      this.newWordInput.val('');
      this.model.add(word);
    } else {
      console.log("error playing word: " + word.validationError);
      this.$('#word-errors').html(word.validationError);
    }
  },

  addWord: function(word) {
    var wordView = new WordView({
      model: word
    });
    this.wordViews.push(wordView);
  }

});

export default ApplicationView;
