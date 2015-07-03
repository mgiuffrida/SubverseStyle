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
    'componentChanged_(red, green, blue)',
  ],

  updating_: false,

  ready: function () {
    this.updateHex_();
  },

  componentChanged_: function(e) {
    if (typeof this.red != 'number' || isNaN(this.red))
      this.red = 255;
    if (typeof this.green != 'number' || isNaN(this.green))
      this.green = 255;
    if (typeof this.blue != 'number' || isNaN(this.blue))
      this.blue = 255;
    this.updateHex_();
  },

  // Updates RGB values from the hex value.
  updateComponents_: function() {
    if (this.updating_)
      return;
    this.updating_ = true;
    var rgb = this.hexToRgb_(this.hex);
    if (rgb) {
      this.red = rgb[0];
      this.green = rgb[1];
      this.blue = rgb[2];
    }
    this.updating_ = false;
  },

  // Updates the hex value.
  updateHex_: function() {
    if (this.updating_)
      return;
    this.updating_ = true;
    this.hex = this.rgbToHex_(this.red, this.green, this.blue);
    this.updating_ = false;
  },

  // Removes leading #.
  hexChanged_: function() {
    if (this.hex.indexOf('#') == 0)
      this.hex = this.hex.substr(1);
    if (this.hex.length > 6)
      this.hex = this.hex.substr(0, 6);
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

  isSimilarHex_: function(a, b) {
    if (a.length == b.length)
      return a.toLowerCase() == b.toLowerCase();

    if (a.length == 3 && b.length != 6)
      return false;
    if (a.length == 6 && b.length != 3)
      return false;
    if (a.length != 3 && b.length != 3)
      return false;
    
    var shorter = a.length < b.length ? a : b;
    var longer = shorter == a ? b : a;
    for (var i = 0; i < 3; i++) {
      if (shorter[i] != longer[i*2] || shorter[i]  != longer[i*2 + 1])
        return false;
    }
    return true;
  },

});
