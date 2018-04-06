import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),

  books: computed('publisher.books.[]', 'author.books.[]', function() {
    return this.get('store').peekAll('book');
  }),

  publishers: null,
  publisher: computed.alias('publishers.firstObject'),

  authors: null,
  author: computed.alias('authors.firstObject'),

  actions: {
    loadPublishers() {
      this.set('publishers', this.get('store').findAll('publisher'));
    },

    loadAuthors() {
      this.set('authors', this.get('store').findAll('author'));
    },
  },
});
