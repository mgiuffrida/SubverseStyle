Polymer({
  is: 'hsv-picker',

  properties: {
    red: {
      type: Number,
      notify: true,
      value: 0,
    },
    green: {
      type: Number,
      notify: true,
      value: 0
    },
    blue: {
      type: Number,
      notify: true,
      value: 0
    },
    hue_: {
      type: Number,
      value: 0,
      observer: 'hueChanged_',
    },
    saturation_: {
      type: Number,
      value: 0
    },
    value_: {
      type: Number,
      value: 0
    },
    size: {
      type: Number,
      value: 256,
    },
    ringSize_: {
      type: Number,
      value: 4,
      readOnly: true,
    },
  },

  observers: [
    'rgbChanged_(red, green, blue)',
  ],

  noImg_: document.createElement('canvas'),
  wasDropped_: false,

  listeners: {
    drag: 'drag_',
    dragstart: 'dragstart_',
    dragenter: 'dragenter_',
    dragleave: 'dragleave_',
    dragover: 'dragover_',
    dragend: 'dragend_',
    drop: 'drop_',
    click: 'click_',
  },

  ready: function() {
    this.printSaturationValue_();
    this.printHue_();
  },

  click_: function(e) {
    if (e.target == this.$.huePicker)
      this.setHueFromMouse_(e);
  },

  moveRingToMouse_: function(e) {
    this.$.hueRing.style.top = (e.offsetY - this.ringSize_) + 'px';
  },

  setHueFromMouse_: function(e) {
    this.hue_ = Math.max(0, Math.min(359,
          Math.round(e.offsetY / this.size * 360)));
    this.resetRing_();
  },

  resetRing_: function() {
    this.$.hueRing.style.top = (Math.round(this.hue_ / 360 * this.size) - this.ringSize_-1) + 'px';
  },

  dragstart_: function(e) {
    e.dataTransfer.setDragImage(this.noImg_, 0, 0);
    if (e.target != this.$.hue &&
        e.target.parentElement != this.$.hue) {
      return;
    }
    this.draggingHue_ = true;
    this.prevHue_ = this.hue_;
    this.draggingSaturation_ = false;
    this.setHueFromMouse_(e);
  },

  drag_: function(e) {
  },

  dragenter_: function(e) {
    e.preventDefault();
  },

  dragleave_: function(e) {
    if (e.target == this.$.huePicker) {
      this.setHueFromMouse_(e);
    }
  },

  dragover_: function(e) {
    e.preventDefault();
    if (e.target != this.$.hueRing)
      this.setHueFromMouse_(e);
  },

  drop_: function(e) {
    e.preventDefault();
    this.wasDropped_ = true;
  },

  dragend_: function(e) {
    window.a = window.a ? window.a : [];
    window.a.push(e);
    if (!this.wasDropped_ &&
        e.dataTransfer.dropEffect == 'move') {
      e.preventDefault();
      this.hue_ = this.prevHue_;
      this.resetRing_();
    } else {
    }
    this.wasDropped_ = false;
  },

  hueChanged_: function() {
    this.resetRing_();
    if (this.updating_)
      return;
    console.log('hue changed');
    var rgb = this.hsvToRgb_(this.hue_, 1, 255);
    this.red = rgb[0];
    this.blue = rgb[1];
    this.green = rgb[2];
    this.finishUpdating_();
  },

  finishUpdating_: function() {
    this.updating_ = true;
    setTimeout(function() {
      this.updating_ = false;
    }.bind(this), 1000);
  },

  rgbChanged_: function() {
    if (this.updating_)
      return;
    console.log('rgbChanged', this.red, this.blue, this.green);
    var hsv = this.rgbToHsv_(this.red, this.blue, this.green);
    this.hue_ = hsv[0];
    this.saturation_ = hsv[1];
    this.value_ = hsv[2];
    this.finishUpdating_();
  },

  printSaturationValue_: function() {
    var c = this.$.saturationValuePicker;
    var width = this.size;
    var height = this.size;
    c.width = width;
    c.height = height;
    var ctx = c.getContext('2d');

    var img = ctx.createImageData(width, height);
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var rgb = this.hsvToRgb_(this.hue_, j/(width-1), (height-1-i)/(height-1)*256);
        rgb.push(255);

        for (var k = 0; k < 4; k++)
          img.data[i * width * 4 + j*4 + k] = rgb[k];
      }
    }
    ctx.putImageData(img, 0, 0);
  },

  printHue_: function() {
    var c = this.$.huePicker;
    var width = 40;
    var height = this.size;
    c.width = width;
    c.height = height;
    var ctx = c.getContext('2d');

    var img = ctx.createImageData(width, height);
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var rgb = this.hsvToRgb_((i/height)*360, 1, 255);
        rgb.push(255);

        for (var k = 0; k < 4; k++)
          img.data[i * width * 4 + j*4 + k] = rgb[k];
      }
    }

    ctx.putImageData(img, 0, 0);
  },

  hsvToRgb_: function(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
    if (s == 0) {
      // achromatic
      r = g = b = v;
    } else {
      h /= 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }
    }
    return [Math.round(r), Math.round(g), Math.round(b)];
  },

  rgbToHsv_: function(r, g, b) {
    var h, s, v;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    v = max;
    var delta = max - min;
    if (max != 0) {
      s = delta / max;
    } else {
      // r = g = b = 0
      s = 0;
      h = 0;
      return [Math.round(h), s, Math.round(v)];
    }

    if (r == max)
      h = (g - b) / delta;
    else if (g == max)
      h = 2 + (b - r) / delta;
    else
      h = 4 + (r - g) / delta;

    h *= 60;
    if (h < 0)
      h += 360;
    return [Math.round(h), s, Math.round(v)];
  },
});
