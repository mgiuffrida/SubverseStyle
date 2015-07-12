/*
 *
 *
 * TODO: Make effectiveHue work, so going to the bottom-right doesn't reset the
 * hue to red.
 *
 * TODO: Figure out why effectiveHue prevents hue from being updated on initial load.
 *
 * TODO: Make color sample smaller and make thinsg prettier.
 */
Polymer({
  is: 'hsv-picker',

  properties: {
    hex: {
      type: String,
      notify: true,
      observer: 'hexChanged_',
    },
    hue_: {
      type: Number,
      value: 0,
      observer: 'hueChanged_',
    },
    effectiveHue_: {
      type: Number,
      value: 0,
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

  notifyVisible: function() {
    this.$.hue.notifyVisible();
    this.$.saturationValuePicker.notifyVisible();
  },

  getHuePercent_: function() {
    return this.effectiveHue_ / 360 * 100;
  },

  getSaturationPercent_: function() {
    if (isNaN(this.saturation_))
      return 0;
    return this.saturation_ * 100;
  },

  getValuePercent_: function() {
    if (isNaN(this.value_))
      return 0;
    return 100 - (this.value_ / 255 * 100);
  },

  ready: function() {
//    this.$.huePicker.addEventListener('mousedown', this.setHueFromMouse_.bind(this, true));
    this.$.saturationValuePicker.style.width = this.size + 'px';
    this.$.saturationValuePicker.style.height = this.size + 'px';
    this.$.hue.style.height = this.size + 'px';
    this.$.hueDiv.style.height = this.size + 'px';
    this.updateSaturationValueGradient_();
  },

  /*
  moveRingToMouse_: function(e) {
    this.$.huePickerArrows.style.top = (e.offsetY) + 'px';
  },
  

  setHueFromMouse_: function(updateHex, e) {
    this.hue_ = Math.max(0, Math.min(359,
          Math.round(e.offsetY / this.size * 360)));
    if (updateHex)
      this.setHex_();
    else
      this.resetRing_();
  },
  */

  setHex_: function() {
    console.log('Using hue ' + this.effectiveHue_);
    var hue = this.effectiveHue_;
    var rgb = Variable.hsvToRgb(hue, this.saturation_, this.value_);
    this.hex = Variable.rgbToHex(rgb.red, rgb.green, rgb.blue);
  },

  resetRing_: function() {
//    this.$.huePickerArrows.style.top = (Math.round(this.hue_ / 360 * this.size)) + 'px';
    this.updateSaturationValueGradient_();
  },

  hueChanged_: function() {
    if (!isNaN(this.hue_))
      this.effectiveHue_ = this.hue_;
  },

  hexChanged_: function() {
    console.log('Hex changed, update Hsv');
    this.updateHsv_();
  },

  updateHsv_: function() {
    if (this.updating_)
      return;
    this.updating_ = true;
    setTimeout(function() {
      var rgb = Variable.hexToRgb(this.hex);
      var hsv = Variable.rgbToHsv(rgb.red, rgb.green, rgb.blue);

      this.hue_ = hsv.hue;
      console.log('Set hue to ' + this.hue_);
      this.saturation_ = hsv.saturation;
      this.value_ = hsv.value;
      this.resetRing_();
      this.updating_ = false;
    }.bind(this), 10);
  },

  updateSaturationValueGradient_: function() {
    // Set saturation and value to full.
    var rgb = Variable.hsvToRgb(this.effectiveHue_, 1, 255);
    var hex = Variable.rgbToHex(rgb.red, rgb.green, rgb.blue);
    this.$.saturationValuePicker.style.backgroundColor = '#' + hex;
  },

  hueDraggerChanged_: function(e) {
    if (typeof e.detail.y == 'number' && !isNaN(e.detail.y)) {
      this.hue_ = Math.min(359.9, Math.max(0, Math.round(e.detail.y / 100 * 360)));
      this.setHex_();
    }
  },

  saturationValuePickerChanged_: function(e) {
    var changed = false;
    if (typeof e.detail.x == 'number' && !isNaN(e.detail.x)) {
      // Saturation.
      this.saturation_ = Math.min(1, Math.max(0, e.detail.x / 100));
      changed = true;
    }
    if (typeof e.detail.y == 'number' && !isNaN(e.detail.y)) {
      // 100 - value.
      this.value_ = Math.min(255, Math.max(0, (100 - e.detail.y) / 100 * 255));
      changed = true;
    }
    if (changed)
      this.setHex_();
  }

});
