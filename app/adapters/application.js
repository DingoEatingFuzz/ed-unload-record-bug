import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
  // In order to remove stale records from the store, findHasMany has to unload
  // all records related to the request in question.
  findHasMany(store, snapshot, link, relationship) {
    return this._super(...arguments).then(payload => {
      const ownerType = snapshot.modelName;
      const relationshipType = relationship.type;
      // Naively assume that the inverse relationship is named the same as the
      // owner type. In the event it isn't, findHasMany should be overridden.
      store
        .peekAll(relationshipType)
        .filter(record => record.get(`${ownerType}.id`) === snapshot.id)
        .forEach(record => {
          store.unloadRecord(record);
        });
      return payload;
    });
  },
});
