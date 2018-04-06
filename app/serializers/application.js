import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  keyForRelationship(key, relationshipType) {
    key = `${key}_id`;
    return relationshipType === 'hasMany' ? key.pluralize() : key;
  },
});
