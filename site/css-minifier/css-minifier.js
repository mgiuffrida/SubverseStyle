Polymer({
  is: 'css-minifier',

  properties: {
    supported: {
      type: Boolean,
      notify: true,
    },
    cssText: {
      type: String,
      value: '',
      observer: 'cssTextChanged_',
    },
    cssMinified: {
      type: String,
      value: '',
      notify: true,
    },
  },

  ready: function() {
    this.supported = !!window.XMLHttpRequest;
  },

  cssTextChanged_: function() {
    console.log('Text changed: ', this.cssText.length);
    if (!this.cssText.length)
      return;

    this.request_ = new XMLHttpRequest();
    this.request_.addEventListener('readystatechange', function() {
      if (!this.request_)
        return;

      if (this.request_.readyState != 4 || !this.request_.responseText) {
        this.request_ = null;
        this.fire('error');
        return;
      }

      console.log(this.request_.responseText);
    });
    this.request_.open('POST', 'http://cssminifier.com/raw', true);
    this.request_.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.request_.send('input=' + encodeURIComponent(this.cssText));
  },
});
