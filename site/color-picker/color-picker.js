/**
 * A collection of color choosers. Set hex. Use hexToRgb() to get RGB values.
 */
Polymer({
  is: 'color-picker',

  properties: {
    hex: {
      type: String,
      notify: true,
      observer: 'hexChanged_',
    },
    red_: {
      type: Number,
      value: 74,
    },
    green_: {
      type: Number,
      value: 171,
    },
    blue_: {
      type: Number,
      value: 231,
    },
    immediateHex_: {
      type: String,
      observer: 'immediateHexChanged_',
    },
  },

  ready: function () {
    this.updateHex_();
  },

  notifyVisible: function() {
    this.$.hsvPicker.notifyVisible();
  },

  updateComponents_: function() {
    // Update RGB values from the hex value.
    var rgb = this.hexToRgb(this.hex);
    if (rgb) {
      this.red_ = rgb.red;
      this.green_ = rgb.green;
      this.blue_ = rgb.blue;
    }
  },

  // Updates the hex value.
  updateHex_: function() {
    this.hex = this.rgbToHex_(this.red_, this.green_, this.blue_);
  },

  // Removes leading #.
  hexChanged_: function() {
    this.setHex_(this.hex);
  },

  immediateHexChanged_: function() {
    this.setHex_(this.immediateHex_);
  },

  setHex_: function(hex) {
    if (hex.indexOf('#') == 0)
      hex = hex.substr(1);
    if (hex.length > 6)
      hex = hex.substr(0, 6);

    if (this.hexToRgb(hex)) {
      this.hex = hex;
      this.immediateHex_ = hex;
      this.updateComponents_();
    } else if (this.hex == hex) {
      // We got an invalid hex.
      this.hex = '000000';
    }
  },

  setRgb: function(r, g, b) {
    if (r == null) {
      r = g = b = 255;
    } else if (arguments.length == 1) {
      b = r.blue;
      g = r.green;
      r = r.red;
    }

    this.setHex_(this.rgbToHex_(r, g, b));
  },

  componentChanged_: function() {
    this.updateHex_();
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
  hexToRgb: function(value) {
    return Variable.hexToRgb(value);
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
