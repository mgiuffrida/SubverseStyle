Polymer({
  is: 'main-theme',

  properties: {
    lightTheme: {
      type: Boolean,
      value: true,
      observer: 'themeChanged_',
    },
    colors: {
      type: Array,
      notify: true,
      observer: 'colorsChanged_',
    },
    stampedColors: {
      type: Object,
    },
    variables: {
      type: Object,
    },
  },

  observers: [
    'themeChanged_(stampedColors.*)',
  ],

  colorsChanged_: function() {
    console.log('change');
  },

  ready: function() {
    /*
    var colors = lightColors;
    stampColors(colors);
    setColors(this.variables);
    */
//    this.updatePreview();

    this.set('colors', []);
    this.push('colors', { r: 20, g: 100, b: 10 });
  },

  stylesheet_: null,
  cssText_: '',
  
  themeChanged_: function() {
    /*
    this.variables = this.lightTheme ? lightColors : darkColors;
    setColors(this.variables);
    */
    if (this.stampedColors)
      this.updatePreview();
  },

  updatePreview: function() {
    if (this.stylesheet_)
      this.$.preview.removeChild(this.stylesheet_);
    this.cssText_ = '';
    this.stylesheet_ = document.createElement('style');
    this.$.preview.appendChild(this.stylesheet_);

    /*
    this.$.preview.style.backgroundColor = this.colors['bg'];
    */
    this.style_('#preview', 'background-color', 'bg');
    this.style_('#preview', 'color', 'text');

    this.style_('#previewContainer', 'background-color', 'container-bg');
    this.style_('#previewContainer', 'border-color', 'container-border');

    this.style_('#previewHeader', 'background-color', 'header-bg');
    this.style_('#previewHeader', 'border-color', 'header-border');
    this.style_('#previewHeader .subverse', 'color', 'header-subverse-title');
    this.style_('#previewHeader .subverse:hover', 'color', 'a-alt1');

    /*
    this.style_('#previewHeader .button.selected', 'background',
                'header-button-selected-bg');
    this.style_('#previewHeader .button.selected', 'border-color',
                'header-button-selected-border');
    this.style_('#previewHeader .button.selected', 'color',
                'header-text');
    this.style_('#previewHeader .button.selected:hover', 'color',
                'header-button-selected-hover');

    this.style_('#previewHeader .button.disabled', 'background',
                'header-button-bg');
    this.style_('#previewHeader .button.disabled:hover', 'background',
                'header-button-selected-bg');
    this.style_('#previewHeader .button.disabled', 'border-color',
                'header-button-border');
    this.style_('#previewHeader .button.disabled:hover', 'border-color',
                'header-button-selected-border');
    this.style_('#previewHeader .button.disabled', 'color',
                'header-button');
    this.style_('#previewHeader .button.disabled:hover', 'color',
                'header-text');

    this.style_('#previewHeader .button.contribute', 'background',
                'header-button-contribute-bg');
    this.style_('#previewHeader .button.contribute:hover', 'background',
                'header-button-contribute-bg-hover');
    this.style_('#previewHeader .button.contribute', 'border-color',
                'header-button-contribute-border');
    this.style_('#previewHeader .button.contribute:hover', 'border-color',
                'header-button-contribute-border-hover');
    this.style_('#previewHeader .button.contribute', 'color',
                'header-button-contribute');
    this.style_('#previewHeader .button.contribute:hover', 'color',
                'header-button-contribute-hover');

    this.style_('.previewLink h2', 'color', 'link-title');
    this.style_('.previewLink h2:hover', 'color', 'a');
    this.style_('.previewLink .author', 'color', 'tagline-a-hover');
    this.style_('.previewLink .author:hover', 'color', 'a-author-hover');
    this.style_('.previewLink .subverse', 'color', 'link-subverse');
    this.style_('.previewLink .subverse:hover', 'color', 'link-subverse-hover');
    */


    this.stylesheet_.appendChild(document.createTextNode(this.cssText_));
  },

  style_: function(selector, style, color) {
    this.cssText_ += 
        selector + '{' + style + ':' + this.stampedColors[color] + '!important;}';
  },
});
