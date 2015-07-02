Polymer({
  is: 'color-picker',

  properties: {
    red: {
      type: Number,
      notify: true,
      value: 74,
    },
    green: {
      type: Number,
      notify: true,
      value: 171
    },
    blue: {
      type: Number,
      notify: true,
      value: 231
    },
    hex: {
      type: String,
      observer: 'hexChanged_',
    }
  },

  observers: [
  ],

  ready: function () {
    this.updateHex_();
  },

  componentChanged_: function(e) {
    this.updateHex_();
  },

  // Updates RGB values from the hex value.
  updateComponents_: function() {
    var rgb = this.hexToRgb_(this.hex);
    if (rgb) {
      this.red = rgb[0];
      this.green = rgb[1];
      this.blue = rgb[2];
    }
  },

  // Updates the hex value.
  updateHex_: function() {
    this.hex = this.rgbToHex_(this.red, this.green, this.blue);
  },

  // Removes leading #.
  hexChanged_: function() {
    if (this.hex.indexOf('#') == 0)
      this.hex = this.hex.substr(1);
  },

  // Computed background style for the color sample..
  backgroundColor_: function(color) {
    var style = 'background-color: #' + this.hex + ';'
    return style;
  },

  // Returns the hexadecimal equivalent of the given RGB value.
  rgbToHex_: function(r, g, b) {
    var red = this.decToHex_(r);
    var green = this.decToHex_(g);
    var blue = this.decToHex_(b);
    return red + green + blue;
  },

  // Converts decimal number to hexadecimal string.
  decToHex_: function(dec) {
    var dec = parseInt(dec);
    return (dec < 16 ? '0' : '') + dec.toString(16);
  },

  // Attempts to convert a hexadecimal color to RGB.
  hexToRgb_: function(value) {
    var re = new RegExp('^\\s*#?' +
                        '([a-fA-F0-9]{2})' +
                        '([a-fA-F0-9]{2})' +
                        '([a-fA-F0-9]{2})' +
                        '\\s*$');
    var arr = re.exec(value);
    if (!arr) {
      re = new RegExp('^\\s*#?' +
                      '([a-fA-F0-9])' +
                      '([a-fA-F0-9])' +
                      '([a-fA-F0-9])' +
                      '\\s*$');
      arr = re.exec(value);
      if (!arr) {
        return null;
      }
      for (var i = 1; i <= 3; i++)
        arr[i] += arr[i];
    }
    var red = parseInt(arr[1], 16);
    var green = parseInt(arr[2], 16);
    var blue = parseInt(arr[3], 16);
    if (isNaN(red) || isNaN(green) || isNaN(blue))
      return null;
    return [red, green, blue];
  },
});
