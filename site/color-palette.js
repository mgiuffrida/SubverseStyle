Polymer({
  is: 'color-palette',
  properties: {
    colors: {
      type: Array,
      value: function() { return []; },
      notify: true,
      observer: 'colorsChanged_',
    },
    selected: {
      type: Object,
      notify: true,
    },
  },

  observers: [
    'selectedChanged_(selected.*)',
  ],

  ready: function() {
    this.selected = this.colors[0];
  },

  clamp: function(val) {
    return Math.min(255, Math.max(0, val));
  },

  addColor: function(r, g, b) {
    if (arguments.length >= 3) {
      r = this.clamp(r), g = this.clamp(g), b = this.clamp(b);
      /*
      for (var i = 0; i < this.colors.length; i++) {
        if (this.colors[i].r == r && this.colors[i].g == g && this.colors[i].b == b)
          return false;
      }
      */
    } else {
      r = g = b = 255;
    }
    this.push('colors', { r: r, g: g, b: b });
    return true;
  },

  getColorStyle_: function(c) {
    var style = 'background-color: rgb(' + c.r + ', ' + c.g + ', ' + c.b + ');';
    return style;
  },

  isSelected_: function(item) {
    return item == this.selected;
  },

  colorClicked_: function(e) {
    this.selected = e.model.item;
  },

  addColorClicked_: function(e) {
    this.addColor();
    this.selected = this.colors[this.colors.length - 1];
  },

  colorPickerCloseClicked_: function(e) {
    this.$.pages.selected = 0;
  },

  selectedChanged_: function() {
    if (this.selected) {
      var selectedIndex = this.colors.indexOf(this.selected);
      this.notifyPath('colors.' + selectedIndex + '.r', this.selected.r);
      this.notifyPath('colors.' + selectedIndex + '.g', this.selected.g);
      this.notifyPath('colors.' + selectedIndex + '.b', this.selected.b);
    }
  },

  colorsChanged_: function() {
    this.selected = this.colors[0];
  },

  copyTapped_: function(e) {
    this.addColor(this.selected.r, this.selected.g, this.selected.b);
    this.selected = this.colors[this.colors.length - 1];
  },

  deleteTapped_: function(e) {
    var selectedIndex = this.colors.indexOf(this.selected);
    // TODO: deleting using this.splice (Polymer issue #2018).
    if (selectedIndex != -1)
      this.set('colors.' + selectedIndex + '.isDeleted', true);
    var i = selectedIndex + 1;
    while (i < this.colors.length && this.colors[i].isDeleted)
      i++;
    if (i >= this.colors.length) {
      i = selectedIndex - 1;
      while (i >= 0 && this.colors[i].isDeleted)
        i--;
    }
    if (i >= 0 && i < this.colors.length) {
      this.selected = this.colors[i];
    } else {
      this.addColor();
      this.selected = this.colors[this.colors.length - 1];
    }
  },
});
