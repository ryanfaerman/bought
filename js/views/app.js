define([
  'jquery',
  'underscore', 
  'backbone',
  'collections/items',
  'views/items',
  ], function($, _, Backbone, Items, ItemView){
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#boughtApp"),


    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-item":  "createOnEnter",
      "keyup #new-item":     "showTooltip",
      "click .todo-clear a": "clearCompleted",
      "click .mark-all-done": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting Items that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

      this.input    = this.$("#new-item");

      Items.bind('add',     this.addOne);
      Items.bind('reset',   this.addAll);
      Items.bind('all',     this.render);

      Items.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Items.done().length;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new ItemView({model: todo});
      this.$("#primary").append(view.render().el);
    },

    // Add all items in the **Items** collection at once.
    addAll: function() {
      Items.each(this.addOne);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Items.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      console.log("hello")
      Items.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Items.done(), function(todo){ todo.clear(); });
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    },

    // Change each todo so that it's `done` state matches the check all
    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Items.each(function (todo) { todo.save({'done': done}); });
    }

  });
  return AppView;
});
