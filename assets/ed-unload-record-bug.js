"use strict";



define('ed-unload-record-bug/adapters/application', ['exports', 'ember-data/adapters/rest'], function (exports, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    // In order to remove stale records from the store, findHasMany has to unload
    // all records related to the request in question.
    findHasMany: function findHasMany(store, snapshot, link, relationship) {
      return this._super.apply(this, arguments).then(function (payload) {
        var ownerType = snapshot.modelName;
        var relationshipType = relationship.type;
        // Naively assume that the inverse relationship is named the same as the
        // owner type. In the event it isn't, findHasMany should be overridden.
        store.peekAll(relationshipType).filter(function (record) {
          return record.get(ownerType + '.id') === snapshot.id;
        }).forEach(function (record) {
          store.unloadRecord(record);
        });
        return payload;
      });
    }
  });
});
define('ed-unload-record-bug/app', ['exports', 'ed-unload-record-bug/resolver', 'ember-load-initializers', 'ed-unload-record-bug/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ed-unload-record-bug/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ed-unload-record-bug/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    store: Ember.inject.service(),

    books: Ember.computed('publisher.books.[]', 'author.books.[]', function () {
      return this.get('store').peekAll('book');
    }),

    publishers: null,
    publisher: Ember.computed.alias('publishers.firstObject'),

    authors: null,
    author: Ember.computed.alias('authors.firstObject'),

    actions: {
      loadPublishers: function loadPublishers() {
        this.set('publishers', this.get('store').findAll('publisher'));
      },
      loadAuthors: function loadAuthors() {
        this.set('authors', this.get('store').findAll('author'));
      }
    }
  });
});
define('ed-unload-record-bug/helpers/app-version', ['exports', 'ed-unload-record-bug/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('ed-unload-record-bug/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ed-unload-record-bug/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ed-unload-record-bug/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ed-unload-record-bug/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ed-unload-record-bug/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ed-unload-record-bug/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ed-unload-record-bug/initializers/ember-cli-mirage', ['exports', 'ed-unload-record-bug/config/environment', 'ed-unload-record-bug/mirage/config', 'ember-cli-mirage/get-rfc232-test-context', 'ember-cli-mirage/start-mirage'], function (exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.startMirage = startMirage;
  exports.default = {
    name: 'ember-cli-mirage-config',
    initialize: function initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, { instantiate: false });
      }
      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, { instantiate: false });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};
      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }
  };
  function startMirage() {
    var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _environment.default;

    return (0, _startMirage.default)(null, { env: env, baseConfig: _config.default, testConfig: _config.testConfig });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('ed-unload-record-bug/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ed-unload-record-bug/initializers/export-application-global', ['exports', 'ed-unload-record-bug/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ed-unload-record-bug/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ed-unload-record-bug/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ed-unload-record-bug/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ed-unload-record-bug/instance-initializers/ember-cli-mirage-autostart', ['exports', 'ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart'], function (exports, _emberCliMirageAutostart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
define("ed-unload-record-bug/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ed-unload-record-bug/mirage/config', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    // Authors are fetched normally
    this.get('/authors');
    this.get('/authors/:id');

    // Publishers are fetched normally
    this.get('/publishers');
    this.get('/publishers/:id');

    // Books can only be fetched through their relationships
    this.get('/authors/:id/books', function (_ref, _ref2) {
      var books = _ref.books;
      var params = _ref2.params;

      return this.serialize(books.where({ author_id: params.id }));
    });
    this.get('/publishers/:id/books', function (_ref3, _ref4) {
      var books = _ref3.books;
      var params = _ref4.params;

      return this.serialize(books.where({ publisher_id: params.id }));
    });

    this.get('/books/:id');
  };
});
define('ed-unload-record-bug/mirage/fixtures/authors', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{ id: 'a-one', name: 'Author One' }, { id: 'a-two', name: 'Author Two' }];
});
define('ed-unload-record-bug/mirage/fixtures/books', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{
    id: 'b-one',
    name: 'This is a book',
    description: 'It is very good',
    author_id: 'a-one',
    publisher_id: 'p-one'
  }];
});
define('ed-unload-record-bug/mirage/fixtures/publishers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{ id: 'p-one', name: 'Publisher One' }, { id: 'p-two', name: 'Publisher Two' }];
});
define('ed-unload-record-bug/mirage/scenarios/default', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (server) {
    server.loadFixtures('authors');
    server.loadFixtures('books');
    server.loadFixtures('publishers');
  };
});
define('ed-unload-record-bug/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCliMirage.RestSerializer.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key.underscore();
    }
  });
});
define('ed-unload-record-bug/models/author', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _model, _attr, _relationships) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    name: (0, _attr.default)('string'),
    books: (0, _relationships.hasMany)('books')
  });
});
define('ed-unload-record-bug/models/book', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _model, _attr, _relationships) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    name: (0, _attr.default)('string'),
    description: (0, _attr.default)('string'),
    author: (0, _relationships.belongsTo)('author'),
    publisher: (0, _relationships.belongsTo)('publisher')
  });
});
define('ed-unload-record-bug/models/publisher', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _model, _attr, _relationships) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    name: (0, _attr.default)('string'),
    books: (0, _relationships.hasMany)('books')
  });
});
define('ed-unload-record-bug/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ed-unload-record-bug/router', ['exports', 'ed-unload-record-bug/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('ed-unload-record-bug/serializers/application', ['exports', 'ember-data/serializers/rest'], function (exports, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rest.default.extend({
    keyForRelationship: function keyForRelationship(key, relationshipType) {
      key = key + '_id';
      return relationshipType === 'hasMany' ? key.pluralize() : key;
    }
  });
});
define('ed-unload-record-bug/serializers/author', ['exports', 'ed-unload-record-bug/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    extractRelationships: function extractRelationships(modelClass, hash) {
      var modelName = modelClass.modelName;

      var id = this.extractId(modelClass, hash);
      var authorURL = this.store.adapterFor(modelName).urlForFindRecord(id, modelName, hash);

      return Ember.assign(this._super.apply(this, arguments), {
        books: {
          links: {
            related: authorURL + '/books'
          }
        }
      });
    }
  });
});
define('ed-unload-record-bug/serializers/publisher', ['exports', 'ed-unload-record-bug/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    extractRelationships: function extractRelationships(modelClass, hash) {
      var modelName = modelClass.modelName;

      var id = this.extractId(modelClass, hash);
      var publisherURL = this.store.adapterFor(modelName).urlForFindRecord(id, modelName, hash);

      return Ember.assign(this._super.apply(this, arguments), {
        books: {
          links: {
            related: publisherURL + '/books'
          }
        }
      });
    }
  });
});
define('ed-unload-record-bug/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ed-unload-record-bug/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ux8gHZ/X", "block": "{\"symbols\":[\"b\",\"book\",\"a\",\"book\",\"p\"],\"statements\":[[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n  \"],[6,\"ol\"],[9,\"class\",\"menu\"],[7],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      \"],[6,\"h3\"],[7],[0,\"\\n        Load all publishers\\n        \"],[6,\"button\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"loadPublishers\"],null],null],[7],[0,\"Load\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      \"],[6,\"h3\"],[7],[0,\"\\n        Load all authors\\n        \"],[6,\"button\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"loadAuthors\"],null],null],[7],[0,\"Load\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"page\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"publishers\"]]],null,{\"statements\":[[0,\"      \"],[6,\"h2\"],[7],[0,\"All Publishers (\"],[1,[20,[\"publishers\",\"length\"]],false],[0,\")\"],[8],[0,\"\\n      \"],[6,\"table\"],[7],[0,\"\\n        \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Founded Year\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Founded By\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"# Books\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"publishers\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,5,[\"id\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,5,[\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,5,[\"founded\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,5,[\"founder\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,5,[\"books\",\"length\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"publisher\"]]],null,{\"statements\":[[0,\"      \"],[6,\"h2\"],[7],[0,\"Publisher: \"],[1,[20,[\"publisher\",\"name\"]],false],[0,\" (\"],[1,[20,[\"publisher\",\"id\"]],false],[0,\")\"],[8],[0,\"\\n      \"],[6,\"table\"],[7],[0,\"\\n        \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Description\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"publisher\",\"books\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,4,[\"id\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,4,[\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,4,[\"description\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,4,[\"author\",\"name\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"authors\"]]],null,{\"statements\":[[0,\"      \"],[6,\"h2\"],[7],[0,\"All Authors (\"],[1,[20,[\"authors\",\"length\"]],false],[0,\")\"],[8],[0,\"\\n      \"],[6,\"table\"],[7],[0,\"\\n        \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"# Books\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"authors\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,3,[\"id\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,3,[\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,3,[\"books\",\"length\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"author\"]]],null,{\"statements\":[[0,\"      \"],[6,\"h2\"],[7],[0,\"Author: \"],[1,[20,[\"author\",\"name\"]],false],[0,\" (\"],[1,[20,[\"author\",\"id\"]],false],[0,\")\"],[8],[0,\"\\n      \"],[6,\"table\"],[7],[0,\"\\n        \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Description\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Publisher\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"author\",\"books\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,2,[\"id\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,2,[\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,2,[\"description\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,2,[\"publisher\",\"name\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"books\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"h2\"],[7],[0,\"All Books (\"],[1,[20,[\"books\",\"length\"]],false],[0,\")\"],[8],[0,\"\\n      \"],[6,\"table\"],[7],[0,\"\\n        \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Name\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Author\"],[8],[0,\"\\n            \"],[6,\"th\"],[7],[0,\"Publisher\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"books\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,1,[\"id\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,1,[\"author\",\"name\"]],false],[8],[0,\"\\n              \"],[6,\"td\"],[7],[1,[19,1,[\"publisher\",\"name\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ed-unload-record-bug/templates/application.hbs" } });
});
define('ed-unload-record-bug/tests/mirage/mirage.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | mirage');

  QUnit.test('mirage/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/fixtures/authors.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/authors.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/fixtures/books.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/books.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/fixtures/publishers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/publishers.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/scenarios/default.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
  });
});


define('ed-unload-record-bug/config/environment', [], function() {
  var prefix = 'ed-unload-record-bug';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ed-unload-record-bug/app")["default"].create({"name":"ed-unload-record-bug","version":"0.0.0+883b2b33"});
}
//# sourceMappingURL=ed-unload-record-bug.map
