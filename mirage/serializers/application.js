import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  keyForAttribute(key) {
    return key.underscore();
  },
});
