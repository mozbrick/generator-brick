(function () {

  var <%= prototypename %> = Object.create(HTMLElement.prototype);

  // Lifecycle methods

  <%= prototypename %>.createdCallback = function () {

  };

  <%= prototypename %>.attachedCallback = function () {

  };

  <%= prototypename %>.detachedCallback = function () {

  };

  <%= prototypename %>.attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attr in attrs) {
      attrs[attr].call(this, oldVal, newVal);
    }
  };

  // Attribute handlers

  var attrs = {
    'attr': function (oldVal, newVal) {

    }
  };

  // Custom methods

  <%= prototypename %>.foo = function () {

  };

  // Property handlers

  Object.defineProperties(<%= prototypename %>, {
    'prop': {
      get : function () {

      },
      set : function (newVal) {

      }
    }
  });

  // Register the element

  window.<%= classname %> = document.registerElement('<%= tagname %>', {
    prototype: <%= prototypename %>
  });

})();
