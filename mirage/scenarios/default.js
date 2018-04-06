export default function(server) {
  server.loadFixtures('authors');
  server.loadFixtures('books');
  server.loadFixtures('publishers');
}
