/**
 * A list of variables to link another variable's color to.
 */
Polymer({
  is: 'color-linker',

  properties: {
    variables: {
      type: Object,
    },
    key: String,
    linkToKey: {
      type: String,
      notify: true,
      observer: 'linkToKeyChanged_',
    },
    offset: {
      type: Number,
      value: 0,
      notify: true,
      observer: 'offsetChanged_',
    },
  },

  observers: [
    'hideInvalidItems_(key, linkToKey, variables.*)',
  ],

  itemSelected_: function(e) {
    var item = e.detail.item;
    console.log('itemSelected_', this.$.menu.selected, this.$.menu.selectedItem, item);
/*    if (!item) {
      this.$.offsetSlider.disabled = true;
      return;
    }
    */
    this.$.offsetSlider.disabled = false;
    console.log(item.children);
    window.i = item;
    var themeVariable = item.children[0];
    if (this.linkToKey != themeVariable.variable.key)
      this.offset = 0;
    this.linkToKey = themeVariable.variable.key;
  },

  linkToKeyChanged_: function() {
    if (this.$.menu.selectedItem && this.$.menu.selectedItem.children[0].variable.key == this.linkToKey)
      return;
    for (var i = 0; i < this.$.menu.items.length; i++) {
      if (this.$.menu.items[i].children[0].variable.key == this.linkToKey) {
        this.$.menu.selected = i;
        return;
      }
    }
    this.$.menu.selected = -1;
  },

  hideInvalidItems_: function() {
    this.$.menu.items.forEach(function(item) {
      var variable = item.querySelector('theme-variable').variable;

      item.hidden = (variable.key == this.key || variable.link);
    }, this);
  },

  hasNoLink_: function() {
    return this.linkToKey == '';
  },

  unlinkTapped_: function() {
    this.offset = 0;
    this.linkToKey = '';
  },

  showHelpTapped_: function() {
    this.$.help.toggle();
  },

  showOffsetHelpTapped_: function() {
    this.$.offsetHelp.toggle();
  },

  offsetChanged_: function() {
    if (typeof this.offset != 'number')
      this.offset = parseInt(this.offset);
  },

  getOffsetColorStyle_: function() {
    if (!this.linkToKey || this.linkToKey == '')
      return '';

    var rgb = Variable.offset(this.variables[this.linkToKey].rgb, this.offset);
    return 'background-color: rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';
  },

  isLinkAllowed_: function() {
    return !this.isAlreadyLinked_();
  },

  isAlreadyLinked_: function() {
    if (!this.key)
      return false;
    // hax: if we selected an item, we won't be linked to anymore
    if (this.linkToKey)//typeof this.selectedItem_ == 'number' && this.selectedItem_ != -1)
      return false;
    var linkToThis = [];
    var keys = Object.getOwnPropertyNames(this.variables);
    keys.forEach(function(key) {
      if (this.variables[key].link == this.key)
        linkToThis.push(this.variables[key]);
    }, this);
    if (linkToThis.length)
      return true;
    return false;
  },
});
