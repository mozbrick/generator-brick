(function () {

  var currentScript = document._currentScript || document.currentScript;

  function shimShadowStyles(styles, tag) {
    if (!Platform.ShadowCSS) {
      return;
    }
    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      var cssText = Platform.ShadowCSS.shimStyle(style, tag);
      Platform.ShadowCSS.addCssToDocument(cssText);
      style.remove();
    }
  }

  var <%= prototypename %> = Object.create(HTMLElement.prototype);

  // Lifecycle methods

  <%= prototypename %>.createdCallback = function () {

    // import template
    var importDoc = currentScript.ownerDocument;
    var templateContent = importDoc.querySelector('template').content;

    // fix styling for polyfill
    shimShadowStyles(templateContent.querySelectorAll('style'),'<%= tagname %>');

    // create shadowRoot and append template
    var shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(templateContent.cloneNode(true));

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
