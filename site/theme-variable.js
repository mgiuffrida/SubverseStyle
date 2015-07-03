Polymer({
  is: 'theme-variable',

  properties: {
    key: String,
    value: String,
    stampedColor: String,
  },

  getColorStyle_: function(color) {
    return 'background-color: ' + color + ';';
  },
});
