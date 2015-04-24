window.collections = window.collections || {};

collections.Games = Backbone.Collection.extend({
  model: Backbone.NestedModel
});
