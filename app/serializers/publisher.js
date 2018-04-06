import { assign } from '@ember/polyfills';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  extractRelationships(modelClass, hash) {
    const { modelName } = modelClass;
    const id = this.extractId(modelClass, hash);
    const publisherURL = this.store.adapterFor(modelName).urlForFindRecord(id, modelName, hash);

    return assign(this._super(...arguments), {
      books: {
        links: {
          related: `${publisherURL}/books`,
        },
      },
    });
  },
});
