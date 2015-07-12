Polymer({
  is: 'rgb-slider',

  properties: {
    red: {
      type: Number,
      notify: true,
      value: 255,
    },
    green: {
      type: Number,
      notify: true,
      value: 255,
    },
    blue: {
      type: Number,
      notify: true,
      value: 255,
    },
  },

  observers: [
    'componentChanged_(red, green, blue)',
  ],

  componentChanged_: function(e) {
    var red = parseInt(this.red);
    var green = parseInt(this.green);
    var blue = parseInt(this.blue);
    if (isNaN(red) || isNaN(blue) || isNaN(green)) {
      red = green = blue = 255;
    }

    this.red = red;
    this.green = green;
    this.blue = blue;
  },

  sliderChanged_: function(e) {
    this.fire('change', { red: this.red, green: this.green, blue: this.blue });
    e.stopPropagation(); // Don't let the slider's change propagate.
  },
});

