Polymer({
  is: 'x-dragger',

  properties: {
    x: {
      type: Number,
      value: 0,
      observer: 'xChanged_',
    },
    y: {
      type: Number,
      value: 0,
      observer: 'yChanged_',
    },
    horizontal: {
      type: Boolean,
      value: false,
    },
    vertical: {
      type: Boolean,
      value: true,
    },
    directions_: {
      type: Array,
      value: [],
    },
  },

  observers: [
    'directionsChanged_(horizontal, vertical)',
  ],

  directionsChanged_: function() {
    this.directions_ = [];
    if (this.vertical) {
      this.directions_.push({
        variable: 'y', Variable: 'Y',
        pos: 'top', Pos: 'Top',
        dim: 'height', Dim: 'Height'
      });
    }
    if (this.horizontal) {
      this.directions_.push({
        variable: 'x', Variable: 'X',
        pos: 'left', Pos: 'Left',
        dim: 'width', Dim: 'Width'
      });
    }
  },

  notifyVisible: function() {
    this.directions_.forEach(function(dir) {
      this['range' + dir.Dim] = this.range['offset' + dir.Dim];
      this['rangeOffset' + dir.Pos] = this.range.getBoundingClientRect()[dir.pos];
      this['dragger' + dir.Dim] = this.dragger['offset' + dir.Dim];
      this[dir.variable + 'Changed_']();
    }, this);
  },

  xChanged_: function(newX, oldX) {
    this.posChanged_(newX, oldX, 'x');
  },

  yChanged_: function(newY, oldY) {
    this.posChanged_(newY, oldY, 'y');
  },

  posChanged_: function(newVal, oldVal, variable) {
    if (!this.dragger)
      return;
    if (!this.directions_ || !this.directions_.length)
      return;

    var dir = this.directions_[this.directions_[0].variable == variable ? 0 : 1];

    if (!this['range' + dir.Dim])
      return;
    if (newVal == 0 && oldVal >= 80)
      newVal = 100;

    newVal = isNaN(newVal) ? 0 : newVal

    var newPos = newVal / 100 * this['range' + dir.Dim] - (this['dragger' + dir.Dim] / 2) + 'px';
    this.dragger.style[dir.pos] = newPos;

  },

  ready: function() {
    this.range = Polymer.dom(this).querySelector('.x-range');
    this.dragger = Polymer.dom(this).querySelector('.x-dragger');

    this.range.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('mousemove', this.updateDragger.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.initDragger();
  },

  onMouseDown: function(e) {
    document.body.classList.add('no-select');

    var rect = this.range.getBoundingClientRect();
    this.directions_.forEach(function(dir) {
      this['range' + dir.Dim] = this.range['offset' + dir.Dim];
      this['rangeOffset' + dir.Pos] = rect[dir.pos];
      this['dragger' + dir.Dim] = this.dragger['offset' + dir.Dim];
    }, this);

    this.down = true;
    this.updateDragger(e);
    return false;
  },

  onMouseUp: function(e) {
    document.body.classList.remove('no-select');
    this.down = false;
  },

  onWindowResize: function(e) {
    /*
    var r = this.dragger.getBoundingClientRect();
    console.log(r && r[dir.pos]);
    this.dragger.style[dir.pos] = (((this.cacheY / 100) * this['range' + dir.Dim]) -
                              (this.dragger.getBoundingClientRect()[dir.pos] - 2)) + 'px';
                              */
    this.down = false;
  },

  updateDragger: function(e) {
    if (!this.down)
      return;

    var changed = {};
    this.directions_.forEach(function(dir) {
      var pos = e['page' + dir.Variable];
      if (!pos)
        pos = e['client' + dir.Variable] + document.body['scroll' + dir.Pos] + document.documentElement['scroll' + dir.Pos] // TODO
      if (pos >= this['rangeOffset' + dir.Pos] && pos <= (this['rangeOffset' + dir.Pos] + this['range' + dir.Dim])) {
        this.dragger.style[dir.pos] = (pos - this['rangeOffset' + dir.Pos] - (this['dragger' + dir.Dim] / 2)) + 'px';
        this['cache' + dir.Variable] = Math.round((pos - this['rangeOffset' + dir.Pos]) / this['range' + dir.Dim] * 100);
        this[dir.variable] = this['cache' + dir.Variable];
        changed[dir.variable] = this[dir.variable];
      }
    }, this);
    this.fire('change', changed);
  },

  initDragger: function(e) {
    var changed = {};
    this.directions_.forEach(function(dir) {
      this['cache' + dir.Variable] = this[dir.variable] / 100 * this['range' + dir.Dim];
      if (isNaN(this['cache' + dir.Variable]))
        this['cache' + dir.Variable] = 0;
      this.dragger.style[dir.pos] = (this['cache' + dir.Variable] - (this['dragger' + dir.Dim] / 2)) + 'px';
      this[dir.variable] = this['cache' + dir.Variable];
      changed[dir.variable] = this[dir.variable];
    }, this);
    this.fire('change', changed);
  },
});
