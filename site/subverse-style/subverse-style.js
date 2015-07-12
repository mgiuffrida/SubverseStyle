Polymer({
  is: 'subverse-style',
  properties: {
    variables: {
      type: Object,
      value: function() { return Variable.vars; },
      notify: true,
    },

    currentKey: String,

    pickerHex_: {
      type: String,
      observer: 'pickerHexChanged_',
    },

    linkerKey_: {
      type: String,
      observer: 'linkerKeyChanged_',
    },

    offset_: {
      type: Number,
      value: 0,
      observer: 'linkerKeyChanged_',
    },

    selectedPage_: {
      type: Number,
      observer: 'selectedPageChanged_',
    },

    useMaterial_: {
      type: Boolean,
      value: false,
    },
  },

  ready: function() {
    if (!this.$.drawerPanel.narrow) {
      this.editVariable('bg');
    }
    if (decodeURI(window.location.href).indexOf('material=1') != -1)
      this.useMaterial_ = true;
//    this.$.drawerPanel.closeDrawer();
  },

  editVariable: function(key) {
    this.$.drawerPanel.openDrawer();
    this.currentKey = null;
    this.$.colorPicker.setRgb();
    this.linkerKey_ = null;

    // Set this before setting currentKey because linkerKey_ isn't set yet.
    var variable = this.variables[key];
    this.offset_ = variable.offset;

    this.currentKey = key;

    if (variable.rgb && !variable.link) {
      this.selectedPage_ = 0;
    } else if (variable.link) {
      this.selectedPage_ = 1;
      console.log('showing link with ' + variable.link);
    }

    /** TODO: Have pickers save and restore their own state. */
    this.priorRgb_ = Variable.clampRgb(variable.rgb);
    this.priorLink_ = variable.link;
    this.priorOffset_ = variable.offset;
    this.priorLinkees_ = this.getVariablesThatLinkTo(key);

    this.$.colorPicker.setRgb(variable.rgb);
    this.linkerKey_ = variable.link;

    this.$.drawerContent.hidden = false;
  },

  getVariablesThatLinkTo: function(linkKey) {
    if (!linkKey || linkKey == '')
      return [];

    var linkerKeys = [];
    var keys = Object.getOwnPropertyNames(this.variables);
    keys.forEach(function(key) {
      if (this.variables[key].link == linkKey)
        linkerKeys.push(key);
    }, this);
    return linkerKeys;
  },

  variableChosen_: function(e) {
    this.editVariable(e.detail);
  },

  pickerHexChanged_: function() {
    // TODO: allow for cancel
    if (!this.currentKey || this.selectedPage_ != 0)
      return;
    // Do this first so toColorString works.
    var rgb = this.$.colorPicker.hexToRgb(this.pickerHex_);
    this.set('variables.' + this.currentKey + '.rgb', rgb);
    this.set('variables.' + this.currentKey + '.link', '');
    this.set('variables.' + this.currentKey + '.inherit', false);
    this.set('variables.' + this.currentKey + '.transparent', false);
    // TODO: update everyone linking to this
    // Super annoying:
    this.updateRgbForLinks_(this.currentKey, rgb);

    // Update the other form.
    this.linkerKey_ = '';
    this.offset_ = 0;
  },

  updateRgbForLinks_: function(changedKey, rgb) {
    var keys = Object.getOwnPropertyNames(this.variables);
    keys.forEach(function(key) {
      if (this.variables[key].link == changedKey) {
        var newRgb = Variable.offset(rgb, this.variables[key].offset);
        this.set('variables.' + key + '.rgb', newRgb);
        // Recurse (god help us)
        this.updateRgbForLinks_(key, newRgb);
      }
    }, this);
  },

  linkerKeyChanged_: function() {
    if (!this.currentKey || this.selectedPage_ != 1)
      return;
    if (this.linkerKey_ && this.variables[this.linkerKey_].link) {
      console.error('This should not happen', this.currentKey,
                    this.linkerKey_, this.variables[this.linkerKey_].link);
    }
    if (typeof this.offset_ != 'number')
      this.offset_ = parseInt(this.offset_);
    // TODO: verify link is valid, and remove from prior linkee's list
    this.set('variables.' + this.currentKey + '.link', this.linkerKey_);
    this.set('variables.' + this.currentKey + '.inherit', false);
    this.set('variables.' + this.currentKey + '.transparent', false);
    if (this.linkerKey_) {
      this.set('variables.' + this.currentKey + '.rgb', Variable.offset(this.variables[this.linkerKey_].rgb,
                                                                        this.offset_ /* TODO */));
      this.set('variables.' + this.currentKey + '.offset', this.offset_);
      this.$.colorPicker.setRgb(this.variables[this.currentKey].rgb);
    } else {
      this.selectedPage_ = 0;
    }

    // TODO: update everyone linking to this, only if linkerKey is set
    // Super annoying:
    if (this.linkerKey_) {
      var keys = Object.getOwnPropertyNames(this.variables);
      var rgb = this.variables[this.currentKey].rgb;
      keys.forEach(function(key) {
        if (this.variables[key].link == this.currentKey) {
          this.set('variables.' + key + '.link', this.linkerKey_);
          var newRgb = Variable.offset(rgb, this.variables[key].offset);
          this.set('variables.' + key + '.rgb', newRgb);
          this.updateRgbForLinks_(key, newRgb);
        }
      }, this);
    }
  },

  cancelPicker_: function(e) {
    this.$.drawerPanel.closeDrawer();
    if (!this.currentKey) {
      console.log('not editing');
      return;
    }
    this.set('variables.' + this.currentKey + '.rgb',
             this.priorRgb_);
    this.set('variables.' + this.currentKey + '.link', this.priorLink_);
    this.set('variables.' + this.currentKey + '.offset', this.priorOffset_);

    // Todo: don't duplicate
    if (this.priorLinkees_) {
      var rgb = this.variables[this.currentKey].rgb;
      for (var i = 0; i < this.priorLinkees_.length; i++) {
        this.set('variables.' + this.priorLinkees_[i] + '.link', this.currentKey);
        this.set('variables.' + this.priorLinkees_[i] + '.rgb',
                 Variable.offset(rgb, this.variables[this.priorLinkees_[i]].offset));
      }
    }

    this.$.colorPicker.setRgb(this.variables[this.currentKey].rgb);
    this.currentKey = null;
    this.selectedPage = -1;
    this.priorRgb_ = this.priorLink_ = this.priorLinkees_ = null;
    this.priorOffset_ = 0;
    this.$.drawerContent.hidden = true;
  },

  pageSelected_: function() {
    this.pickerHexChanged_();
    this.linkerKeyChanged_();
  },

  generateTapped_: function(e) {
    this.$.generateDialog.open();
    this.generateCss_();
  },

  materialChecked_: function(e) {
    this.generateCss_();
  },

  generateCss_: function() {
    this.$.cssTextarea.value = '';
    var cssText = Generator.Generate(template, Variable.vars, true,
                                     this.useMaterial_);
    this.$.cssTextarea.value = cssText;
    this.$.permalink.href = window.location.protocol + '//' + window.location.host +
      window.location.pathname + '?' + Variable.toQueryString() +
      (this.useMaterial_ ? '&material=1' : '');
  },

  copyPermalinkTapped_: function() {
    console.log(this.$.permalink.href);
    /*
    var state = {};
    var keys = Object.getOwnPropertyNames(Variable.vars);
    var s = '';
    keys.forEach(function(key) {
      s += key + ':';
      var color = Variable.vars[key];
      if (color.link) {
        s += 'l' + color.link + ',' + color.offset;
        state[key] = [color.link, color.offset];
      } else if (color.inherit) {
        s += 'i';
        state[key] = 'i';
      } else if (color.transparent) {
        s += 't';
        state[key] = 't';
      } else {

        s += rgbHex(color.rgb.red, color.rgb.green, color.rgb.blue);
        state[key] = [color.rgb.red, color.rgb.green, color.rgb.blue];
      }
      s += ';';
    });
    state['useMaterial'] = this.useMaterial_;
    window.s = s;

    var a = document.createElement('a');
    a.href = URL.createObjectURL(
        new Blob([JSON.stringify(state)], {type: 'application/octet-stream'}));
    a.download = 'subverse-style.ss';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    */
  },


  drawerChange_: function() {
    // Workaround for event being fired before properties are initialized.
    if (!this.variables)
      return;
    if (!this.$.drawerPanel.narrow && !this.currentKey)
      this.editVariable('bg');
  },

  selectedPageChanged_: function() {
    if (this.selectedPage_ == 0)
      this.$.colorPicker.notifyVisible();
  },
});

