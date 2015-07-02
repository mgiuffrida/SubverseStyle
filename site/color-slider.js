Polymer({
  is: 'color-slider',

  properties: {
    value: {
      type: Number,
      notify: true,
      value: 0,
      observer: 'valueChanged_',
    },
  },

  valueChanged_: function(newValue) {
    // Update the slider, but only if the slider isn't changing itself.
    if (!this.$.slider.dragging) {
      this.$.slider.value = Math.round(newValue);
    }
  },

  // Links slider's value to its immediateValue.
  sliderChanged_: function(e) {
    if (this.value != this.$.slider.immediateValue)
      this.value = this.$.slider.immediateValue;
  },

  sliderImmediateValueChanged_: function(e) {
    this.value = this.$.slider.immediateValue;
    // Fire a change event to signal user interaction.
    this.fire('change');
  },
});
