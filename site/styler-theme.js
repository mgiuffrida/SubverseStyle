Polymer({
  is: 'styler-theme',
  properties: {
    palette: {
      type: Array,
    },
    selectedColor: Object,
    variables: {
      type: Array,
    },
    stampedColors: {
      type: Object,
    },
  },

  ready: function() {
    this.variables = [];
    var variables = Object.getOwnPropertyNames(lightColors);
    for (var i = 0; i < variables.length; i++) {
      this.push('variables', {
        key: variables[i],
        value: lightColors[variables[i]],
      });
    }

    this.stampedColors = stampColors(lightColors);
  },

});
