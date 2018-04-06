export default function() {
  // Authors are fetched normally
  this.get('/authors');
  this.get('/authors/:id');

  // Publishers are fetched normally
  this.get('/publishers');
  this.get('/publishers/:id');

  // Books can only be fetched through their relationships
  this.get('/authors/:id/books', function({ books }, { params }) {
    return this.serialize(books.where({ author_id: params.id }));
  });
  this.get('/publishers/:id/books', function({ books }, { params }) {
    return this.serialize(books.where({ publisher_id: params.id }));
  });

  this.get('/books/:id');
}
