Polymer({
  is: 'theme-variable',

  properties: {
    variable: Object,
    selected: Boolean,
    currentKey: String,
  },

  getColorStyle_: function() {
    var color = this.variable.toColorString();
    return 'background-color: ' + color + ';';
  },

  isSelected_: function() {
    return this.currentKey && this.variable &&
        this.currentKey == this.variable.key;
  },
});
