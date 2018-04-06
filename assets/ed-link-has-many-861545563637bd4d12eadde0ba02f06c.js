"use strict"
define("ed-link-has-many/adapters/application",["exports","ember-data/adapters/rest"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({findHasMany:function(e,n,t,a){return this._super.apply(this,arguments).then(function(t){var i=n.modelName,l=a.type
return e.peekAll(l).filter(function(e){return e.get(i+".id")===n.id}).forEach(function(n){e.unloadRecord(n)}),t})}})}),define("ed-link-has-many/app",["exports","ed-link-has-many/resolver","ember-load-initializers","ed-link-has-many/config/environment"],function(e,n,t,a){Object.defineProperty(e,"__esModule",{value:!0})
var i=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:n.default});(0,t.default)(i,a.default.modulePrefix),e.default=i}),define("ed-link-has-many/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({store:Ember.inject.service(),books:Ember.computed("publisher.books.[]","author.books.[]",function(){return this.get("store").peekAll("book")}),publishers:null,publisher:Ember.computed.alias("publishers.firstObject"),authors:null,author:Ember.computed.alias("authors.firstObject"),actions:{loadPublishers:function(){this.set("publishers",this.get("store").findAll("publisher"))},loadAuthors:function(){this.set("authors",this.get("store").findAll("author"))}}})}),define("ed-link-has-many/helpers/app-version",["exports","ed-link-has-many/config/environment","ember-cli-app-version/utils/regexp"],function(e,n,t){Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=i
var a=n.default.APP.version
function i(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return n.hideSha?a.match(t.versionRegExp)[0]:n.hideVersion?a.match(t.shaRegExp)[0]:a}e.default=Ember.Helper.helper(i)}),define("ed-link-has-many/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default}),define("ed-link-has-many/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default}),define("ed-link-has-many/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ed-link-has-many/config/environment"],function(e,n,t){Object.defineProperty(e,"__esModule",{value:!0})
var a=void 0,i=void 0
t.default.APP&&(a=t.default.APP.name,i=t.default.APP.version),e.default={name:"App Version",initialize:(0,n.default)(a,i)}}),define("ed-link-has-many/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",n.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("ed-link-has-many/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("ed-link-has-many/initializers/ember-cli-mirage",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-cli-mirage",initialize:function(){}}}),define("ed-link-has-many/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:n.default}}),define("ed-link-has-many/initializers/export-application-global",["exports","ed-link-has-many/config/environment"],function(e,n){function t(){var e=arguments[1]||arguments[0]
if(!1!==n.default.exportApplicationGlobal){var t
if("undefined"!=typeof window)t=window
else if("undefined"!=typeof global)t=global
else{if("undefined"==typeof self)return
t=self}var a,i=n.default.exportApplicationGlobal
a="string"==typeof i?i:Ember.String.classify(n.default.modulePrefix),t[a]||(t[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete t[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default={name:"export-application-global",initialize:t}}),define("ed-link-has-many/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("ed-link-has-many/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("ed-link-has-many/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("ed-link-has-many/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:n.default}}),define("ed-link-has-many/models/author",["exports","ember-data/model","ember-data/attr","ember-data/relationships"],function(e,n,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({name:(0,t.default)("string"),books:(0,a.hasMany)("books")})}),define("ed-link-has-many/models/book",["exports","ember-data/model","ember-data/attr","ember-data/relationships"],function(e,n,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({name:(0,t.default)("string"),description:(0,t.default)("string"),author:(0,a.belongsTo)("author"),publisher:(0,a.belongsTo)("publisher")})}),define("ed-link-has-many/models/publisher",["exports","ember-data/model","ember-data/attr","ember-data/relationships"],function(e,n,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({name:(0,t.default)("string"),books:(0,a.hasMany)("books")})}),define("ed-link-has-many/resolver",["exports","ember-resolver"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default}),define("ed-link-has-many/router",["exports","ed-link-has-many/config/environment"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL})
t.map(function(){}),e.default=t}),define("ed-link-has-many/serializers/application",["exports","ember-data/serializers/rest"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({keyForRelationship:function(e,n){return e+="_id","hasMany"===n?e.pluralize():e}})}),define("ed-link-has-many/serializers/author",["exports","ed-link-has-many/serializers/application"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({extractRelationships:function(e,n){var t=e.modelName,a=this.extractId(e,n),i=this.store.adapterFor(t).urlForFindRecord(a,t,n)
return Ember.assign(this._super.apply(this,arguments),{books:{links:{related:i+"/books"}}})}})}),define("ed-link-has-many/serializers/publisher",["exports","ed-link-has-many/serializers/application"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=n.default.extend({extractRelationships:function(e,n){var t=e.modelName,a=this.extractId(e,n),i=this.store.adapterFor(t).urlForFindRecord(a,t,n)
return Ember.assign(this._super.apply(this,arguments),{books:{links:{related:i+"/books"}}})}})}),define("ed-link-has-many/services/ajax",["exports","ember-ajax/services/ajax"],function(e,n){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return n.default}})}),define("ed-link-has-many/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"u8j5qnqM",block:'{"symbols":["b","book","a","book","p"],"statements":[[6,"div"],[9,"class","container"],[7],[0,"\\n  "],[6,"ol"],[9,"class","menu"],[7],[0,"\\n    "],[6,"li"],[7],[0,"\\n      "],[6,"h3"],[7],[0,"\\n        Load all publishers\\n        "],[6,"button"],[10,"onclick",[25,"action",[[19,0,[]],"loadPublishers"],null],null],[7],[0,"Load"],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"li"],[7],[0,"\\n      "],[6,"h3"],[7],[0,"\\n        Load all authors\\n        "],[6,"button"],[10,"onclick",[25,"action",[[19,0,[]],"loadAuthors"],null],null],[7],[0,"Load"],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","page"],[7],[0,"\\n"],[4,"if",[[20,["publishers"]]],null,{"statements":[[0,"      "],[6,"h2"],[7],[0,"All Publishers ("],[1,[20,["publishers","length"]],false],[0,")"],[8],[0,"\\n      "],[6,"table"],[7],[0,"\\n        "],[6,"thead"],[7],[0,"\\n          "],[6,"tr"],[7],[0,"\\n            "],[6,"th"],[7],[0,"ID"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Name"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Founded Year"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Founded By"],[8],[0,"\\n            "],[6,"th"],[7],[0,"# Books"],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"tbody"],[7],[0,"\\n"],[4,"each",[[20,["publishers"]]],null,{"statements":[[0,"            "],[6,"tr"],[7],[0,"\\n              "],[6,"td"],[7],[1,[19,5,["id"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,5,["name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,5,["founded"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,5,["founder"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,5,["books","length"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[5]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[4,"if",[[20,["publisher"]]],null,{"statements":[[0,"      "],[6,"h2"],[7],[0,"Publisher: "],[1,[20,["publisher","name"]],false],[0," ("],[1,[20,["publisher","id"]],false],[0,")"],[8],[0,"\\n      "],[6,"table"],[7],[0,"\\n        "],[6,"thead"],[7],[0,"\\n          "],[6,"tr"],[7],[0,"\\n            "],[6,"th"],[7],[0,"ID"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Name"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Description"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Author"],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"tbody"],[7],[0,"\\n"],[4,"each",[[20,["publisher","books"]]],null,{"statements":[[0,"            "],[6,"tr"],[7],[0,"\\n              "],[6,"td"],[7],[1,[19,4,["id"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,4,["name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,4,["description"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,4,["author","name"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[4]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[4,"if",[[20,["authors"]]],null,{"statements":[[0,"      "],[6,"h2"],[7],[0,"All Authors ("],[1,[20,["authors","length"]],false],[0,")"],[8],[0,"\\n      "],[6,"table"],[7],[0,"\\n        "],[6,"thead"],[7],[0,"\\n          "],[6,"tr"],[7],[0,"\\n            "],[6,"th"],[7],[0,"ID"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Name"],[8],[0,"\\n            "],[6,"th"],[7],[0,"# Books"],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"tbody"],[7],[0,"\\n"],[4,"each",[[20,["authors"]]],null,{"statements":[[0,"            "],[6,"tr"],[7],[0,"\\n              "],[6,"td"],[7],[1,[19,3,["id"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,3,["name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,3,["books","length"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[3]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[4,"if",[[20,["author"]]],null,{"statements":[[0,"      "],[6,"h2"],[7],[0,"Author: "],[1,[20,["author","name"]],false],[0," ("],[1,[20,["author","id"]],false],[0,")"],[8],[0,"\\n      "],[6,"table"],[7],[0,"\\n        "],[6,"thead"],[7],[0,"\\n          "],[6,"tr"],[7],[0,"\\n            "],[6,"th"],[7],[0,"ID"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Name"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Description"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Publisher"],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"tbody"],[7],[0,"\\n"],[4,"each",[[20,["author","books"]]],null,{"statements":[[0,"            "],[6,"tr"],[7],[0,"\\n              "],[6,"td"],[7],[1,[19,2,["id"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,2,["name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,2,["description"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,2,["publisher","name"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[2]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[4,"if",[[20,["books","length"]]],null,{"statements":[[0,"      "],[6,"h2"],[7],[0,"All Books ("],[1,[20,["books","length"]],false],[0,")"],[8],[0,"\\n      "],[6,"table"],[7],[0,"\\n        "],[6,"thead"],[7],[0,"\\n          "],[6,"tr"],[7],[0,"\\n            "],[6,"th"],[7],[0,"ID"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Name"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Author"],[8],[0,"\\n            "],[6,"th"],[7],[0,"Publisher"],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"tbody"],[7],[0,"\\n"],[4,"each",[[20,["books"]]],null,{"statements":[[0,"            "],[6,"tr"],[7],[0,"\\n              "],[6,"td"],[7],[1,[19,1,["id"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,1,["name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,1,["author","name"]],false],[8],[0,"\\n              "],[6,"td"],[7],[1,[19,1,["publisher","name"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ed-link-has-many/templates/application.hbs"}})}),define("ed-link-has-many/config/environment",[],function(){try{var e="ed-link-has-many/config/environment",n=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),t={default:JSON.parse(unescape(n))}
return Object.defineProperty(t,"__esModule",{value:!0}),t}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ed-link-has-many/app").default.create({name:"ed-link-has-many",version:"0.0.0+e83d11ed"})
