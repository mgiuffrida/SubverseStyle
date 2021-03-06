'use strict';

var rules = {
  'body': {
    'background-color':' #f4f4f4',
    'color':' #404040',
    'font-size':' 11px',
    'font-family':' Arial, sans-serif',
    'line-height':' 1.43',
  },

  'a, a:visited': {
    'color':' #4aabe7',
  },

  'a:hover': {
    'color':' #66c2fb',
  },

  '.md a:visited': {
    'color':' #9178d0',
  },

  '.md a[href="#s"]::after': {
    'background-color':' #e77777',
    'color':' #e77777',
    'border-color':' #b44f4f',
  },

  '.md a[href="#s"]:hover::after, .md a[href="#s"]:focus::after, .md a[href="#s"]:active::after': {
    'color':' #404040',
    'background-color':' #ffe3e3',
  },

  '.link .usertext .md pre, .link .usertext .md code': {
    'background-color':' #fff',
  },

  'pre, code': {
    'border-color':' #ccc',
    'color':' #333',
  },

  /*
   * Header:
   */
  '#header': {
    'background-color':' #fff',
  },

  /*
   * Header -> Subverse List
   */
  '#sr-header-area': {
    'background-color':' #fff',
    'border-bottom':' 1px solid #dcdcdc',
  },

  '.sr-list li a': {
    'color':' #4aabe7',
  },

  '.drop-arrow': {
    'border-top-color':' #4aabe7',
  },


  '#sr-bar li a': {
    'color':' #818181',
  },

  '#sr-header-area:hover #sr-bar li a': {
    'color':' #444',
  },

  '#sr-more-link': {
    'background-color':' #fff',
    'color':' #444',
  },

  '#sr-more-link:hover': {
    'background-color':' #4aabe7',
    'color':' #fff',
  },

  /*
   * Header -> Subverse List -> Subscription Dropdown
   */
  '.whoaSubscriptionMenu li ul': {
    'border-color':' #ededed',
    'border-top-color':' #fff',
    'box-shadow':' 3px 3px 3px rgba(0,0,0,.2)',
  },

  '.whoaSubscriptionMenu li ul li a:link, .whoaSubscriptionMenu li ul li a:visited': {
    'background-color':' #fff',
    'border-bottom-color':' #ededed',
    'color':' #444',
  },

  '.whoaSubscriptionMenu li ul li a:hover': {
    'background':' -webkit-linear-gradient(top, #54b5f1, #4aabe7)',
    'color':' #fff !important',
  },


  /*
   * Header -> Subverse Header
   */
  '#header-container': {
    'background-color':' #fff',
    'border-bottom-color':' #dcdcdc',
    'border-top-color':' #dcdcdc',
  },

  '.pagename a': {
    'color':' #5a5a5a',
  },

  '.pagename a:hover': {
    'color':' #4aabe7',
  },

  /*
   * Header -> Subverse Header -> Menu
   */
  '.tabmenu li.selected a': {
    'background':' -webkit-linear-gradient(top,#fff,#fafafa)',
    'border-color':' #d0d0d0',
    'color':' #444',
  },

  '.tabmenu li.selected a:hover': {
    'color':' #4aabe7',
  },

  '.tabmenu li.disabled a': {
    'background-color':' transparent',
    'border-color':' transparent',
    'color':' #555',
  },

  '.tabmenu li.disabled a:hover': {
    'background':' -webkit-linear-gradient(top,#fff,#fafafa)',
    'border-color':' #d0d0d0',
    'color':' #444',
  },

  '.tabmenu li.disabled a.contribute': {
    'background':' -webkit-linear-gradient(top,#bbe5ff,#a6ddff)',
    'border-color':' #70b7e3',
    'color':' #2b4758',
  },

  '.tabmenu li.disabled a.contribute:hover': {
    'background':' -webkit-linear-gradient(top,#a7deff,#91d5ff)',
    'border-color':' #61afe0',
    'color':' #2b4758',
  },

  /*
   * Header -> Subverse Header -> Account Info
   */
  '.logged-in, .logged-out': {
    'background-color':' #f6f6f6',
    'border-color':' #dcdcdc',
  },

  '#header-account a': {
    'color':' #555',
  },

  '#header-account a:hover, #header-account .logged-out a': {
    'color':' #4aabe7',
  },

  '.user .userkarma': {
    'border-bottom-color':' #999',
  },

  '.user .upvoatsGiven a': {
    'color':' #4aabe7 !important',
    'border-bottom-color':' gray',
  },

  /**
   * Header -> Mobile Menu Button
   */
  '#show-menu-button::before': {
    'border-color':' #404040',
  },

  /**
   * Main Content
   */
  '#container': {
    'background-color':' #fff',
    'border-color':' #d1d1d1',
    'color':' inherit',
  },

  /**
   * Sidebar
   */
  '.side': {
    'background-color':' transparent',
    'color':' inherit',
  },

  /* Form Control (Search, Chat) */
  '.form-control': {
    'background-color':' #fff',
    'border-color':' #cbcbcb',
    'color':' #484848',
  },

  '.field-validation-error': {
    'color':' #ff4136',
  },

  '.btn-whoaverse.contribute': {
    'background':' -webkit-linear-gradient(top,#bbe5ff,#a6ddff)',
    'border-color':' #70b7e3',
    'color':' #2b4758',
  },

  '.btn-whoaverse.contribute:hover': {
    'background':' -webkit-linear-gradient(top,#a7deff,#91d5ff)',
    'border-color':' #61afe0',
    'color':' #2b4758',
  },

  '.titlebox h1 a': {
    'color':' inherit',
  },

  '.titlebox h1 a:hover': {
    'color':' #4aabe7',
  },

  '.titlebox .btn-unsub.btn-whoaverse-paging': {
    'background':' -webkit-linear-gradient(top,#f8f8f8,#f0f0f0)',
    'border-color':' #c9c9c9',
    'color':' #5a5a5a',
  },

  '.titlebox .btn-whoaverse-paging:focus': {
    'color':' white',
  },

  '.btn-unsub:hover, .btn-unsub:active, .btn-unsub:focus': {
    'background':' -webkit-linear-gradient(top,#c4b7ff,#bdaeff)',
    'border-color':' #9b85ff',
    'color':' #5b46be',
  },

  '.btn-whoaverse-paging': {
    'background':' -webkit-linear-gradient(top,#bbe5ff,#a6ddff)',
    'border-color':' #70b7e3',
    'color':' #2b4758',
  },

  '.btn-whoaverse-paging:hover': {
    'background':' -webkit-linear-gradient(top,#a7deff,#91d5ff)',
    'border-color':' #61afe0',
    'color':' #2b4758',
  },

  '.btn-whoaverse-paging:focus': {
    'color':' white',
  },

  '.titlebox .subscribers': {
    'color':' inherit',
  },

  '.titlebox .users-online': {
    'color':' inherit',
  },

  /**
   * Sidebar -> Description
   */
  '.titlebox .usertext-body': {
    'color':' inherit',
  },

  /**
   * Sidebar -> Status
   */
  '.titlebox .bottom': {
    'border-top-color':' #d5d5d5',
    'color':' #808080',
  },

  /**
   * Sidebar -> Header
   */
  '.sidecontentbox .alert-h1': {
    'color':' #4aabe7',
    'border-bottom-color':' #ddd',
  },

  /**
   * Sidebar -> Moderator List, Chat
   */
  '.sidecontentbox .content': {
    'background-color':' #fcfcfc',
    'border-color':' #e4e4e4',
  },

  /**
   * Sidebar -> Box (chat, announcements)
   */
  '.side .spacer.spacersection': {
    'background-color':' #fdfdfd',
    'border-color':' #d3d3d3',
    'color':' inherit',
  },

  /**
   * Footer
   */
  '.bottommenu': {
    'color':' #6d6d6d',
  },

  /**
   * Links
   */

  '.even': {
    'background-color':' #f8f8f8',
  },

  /**
   * Links -> Submission
   */
  '.arrow-downvote, .arrow-downvoted, .arrow-upvote, .arrow-upvoted': {
    'background-image': 'url(\'http://voat.co/Graphics/Light-SpriteSheet.png\')',
  },

  '.link score.likes': {
    'color':' #4aabe7',
  },

  '.link score.dislikes': {
    'color':' #8870ff',
  },

  '.link score.unvoted': {
    'color':' #bbb',
  },

  '.thumbnail': {
    'border-color':' #fff',
  },

  'a.thumbnail:hover, a.thumbnail:focus, a.thumbnail.active': {
    'border-color':' #4aabe7',
  },

  /**
   * Links -> Submission -> Title
   */
  '.link a.title': {
    'color':' #4a4a4a',
  },

  '.link a.title:visited': {
    'color':' #9178d0',
  },

  '.link a.title:hover': {
    'color':' #4aabe7',
  },

  '.domain': {
    'color':' #666',
  },

  '.domain a': {
    'color':' #888',
  },

  '.domain a:hover': {
    'color':' #4aabe7',
  },

  '.promoted': {
    'background-color':' #a26df9',
    'border-color':' #8358cb',
    'color':' #fff',
  },

  /**
   * Links -> Submission -> Tagline
   */
  '.expando-button.selftext.collapsed, .expando-button.selftext.collapsed:hover, .expando-button.selftext.expanded, .expando-button.selftext.expanded:hover': {
    'background-image': 'url(\'http://voat.co/Graphics/Light-SpriteSheet.png\')',
  },

  '.tagline': {
    'color':' #707070',
  },

  '.tagline a': {
    'color':' #4aabe7',
  },

  '.tagline a:visited': {
    'color':' #555',
  },
  '.tagline a:hover': {
    'color':' #4399cd',
  },


  '.link a.author, .link a.author:visited': {
    'color':' #4399cd',
  },

  '.link a.author:hover': {
    'color':' #4aabe7',
  },

  '.link a.subverse:visited, .link a.subverse': {
    'color':' #6d6d6d',
  },

  '.link a.subverse:hover': {
    'color':' #4aabe7',
  },

  '.tagline .post_upvotes': {
    'color':' #4aabe7',
  },

  '.tagline .post_downvotes': {
    'color':' #8870ff',
  },

  /**
   * Links -> Submission -> Buttons
   */
  '.link .flat-list li a': {
    'color':' #6a6a6a',
  },

  /*
   * Links -> Next/Previous Buttons
   */
  '.pagination-container .btn-whoaverse-paging': {
    'background':' -webkit-linear-gradient(top,#bbe5ff,#a6ddff)',
    'border-color':' #70b7e3',
    'color':' #2b4758',
  },

  /*
   * Comments
   */

  /*
   * Comments - Self Text
   */
  '.link .usertext .md': {
    'background-color':' #f8f8f8',
    'border-color':' #d1d1d1d',
    'color':' inherit',
  },

  /*
   * Comments - Comment Form
   */
  '.markdownEditorImgButton': {
    'background-color':' #f5f5f5',
    'background-image': 'url(\'http://voat.co/Graphics/markdownEditorSprite.png\')',
    'border-color':' #808080',
  },

  '.markdownEditorSubMenu': {
    'border-color':' #808080',
  },

  '.commenttextarea': {
    'background-color':' #fff',
    'border-color':' #cbcbcb',
    'color':' #333',
  },

  'form input.btn-whoaverse-paging': {
    'background':' -webkit-linear-gradient(top,#bbe5ff,#a6ddff)',
    'border-color':' #70b7e3',
    'color':' #2b4758',
  },

  'form input.btn-whoaverse-paging:hover': {
    'background':' -webkit-linear-gradient(top,#a7deff,#91d5ff)',
    'border-color':' #61afe0',
    'color':' #2b4758',
  },

  '.horizontal-line': {
    'border-bottom-color':' #e9e9e9',
  },

  '.menuarea .label, .menuarea .label-default': {
    'background-color':' #ddd',
    'color':' #555',
  },

  /**
   * Comments -> Comment
   */
  '.comment .comment': {
    'border':' 1px solid #d1d1d1',
  },

  '.comment a.expand': {
    'color':' #aaa',
  },

  '.comment .collapsed a': {
    'color':' #888',
  },

  '.comment a.expand:hover': {
    'color':' #555',
  },

  '.comment a.author, .comment a.author:visited': {
    'color':' #4aabe7',
  },

  '.comment a.submitter': {
    'color':' #8870ff',
  },

  /* TODO: separate styles for comment taglines */

  /**
   * Comments -> Comment -> Buttons
   */
  '.comment .flat-list li a': {
    'color':' #6a6a6a',
  },

  /**
   * Comments -> Comment (even layer)
   * Should be same as #container
   */
  '.comment .comment .comment, .comment .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment': {
    'background-color':' #fff',
  },

  '.comment .comment .comment blockquote, .comment .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment blockquote': {
    'background-color':' #f5f5f5',
  },

  /**
   * Comments -> Comment (odd layer)
   */
  '.comment .comment, .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment .comment .comment, .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment': {
    'background-color':' #f8f8f8',
  },

  '.comment .comment blockquote, .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment .comment .comment blockquote, .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment blockquote': {
    'background-color':' #fff',
  },

  /**
   * Comments -> Comment
   */
  '.md blockquote': {
    'background-color':' #f5f5f5',
    'border-color':' #e8e8e8 e8e8e8 e8e8e8 dbdbdb',
    'box-shadow':' 0 1px 0 rgba(0,0,0,.1)',
  },

  /**
   * Comments -> Preview
   */
  '.panel': {
    'background-color':' #fff',
  },

  '.panel-default': {
    'border-color':' #ddd',
  },

  '.panel-heading, .panel-info>.panel-heading, .panel-default>.panel-heading': {
    'background':' -webkit-linear-gradient(top,#eee,#e8e8e8)',
    'border-color':' #d6d6d6',
    'color':' #333',
  },

  /**
   * Comments -> Load More
   */
  '.btn-whoaverse': {
    'background':' -webkit-linear-gradient(top,#fdfdfd,#f7f7f7)',
    'border-color':' #d1d1d1',
  },
  '.btn-whoaverse, a.btn-whoaverse': {
    'color':' #4c4c4c',
  },

  'btn-whoaverse:hover': {
    'background':' -webkit-linear-gradient(top,#f8f8f8,#f2f2f2)',
    'border-color':' #ccc',
    'color':' #444',
  },



  /**
   * Header -> Subverse Header -> Menu (Mobile)
   */
  '@media (max-width: 700px)': {
    '.tabmenu li.selected a': {
      'background':' -webkit-linear-gradient(top,#f8f8f8,#f2f2f2)',
      'border-color':' #bababa',
      'box-shadow':' 0 1px 0 rgba(0,0,0,.35)',
      'color':' #444',
    },

    '.tabmenu li.disabled a': {
      'background':' -webkit-linear-gradient(top,#fff,#fbfbfb)',
      'border-color':' #d0d0d0',
      'box-shadow':' 0 1px 0 rgba(0,0,0,.1)',
      'color':' #444',
    },

    '.tabmenu li.disabled a:hover': {
      'background':' -webkit-linear-gradient(top,#fff,#fafafa)',
      'border-color':' #d0d0d0',
      'color':' #444',
    },
  },

  /*
   * Header -> Subverse Header -> Account Info (Mobile)
   */
  '@media (max-width: 870px)': {
    '.logged-in, .logged-out': {
      'background-color':' transparent',
      'border-color':' transparent',
    },
  },

  '@media (max-width: 550px)': {
    /**
     * Links -> Submission -> Buttons (Mobile)
     */
  '.link .flat-list.buttons li a': {
    'background-color':' #fff',
    'border-color':' #dedede',
  },

  /**
   * Comments -> Comment -> Buttons (Mobile)
   */
  '.comment .flat-list.buttons li a': {
    'background-color':' #fff',
    'border-color':' #dedede',
  },
},



/**
 * TODO: Modal Dialogs
 */

  /**
   * TODO: first-time alert on comments page
   */
};

function clearStyles(rule) {
  for (var style of Object.getOwnPropertyNames(rule)) {
    if (typeof rule[style] == 'string') {
      rule[style] = '';
    } else {
      clearStyles(rule[style]);
    }
  }
}

for (var rule of Object.getOwnPropertyNames(rules)) {
  clearStyles(rules[rule]);
}

for (var selector of Object.getOwnPropertyNames(rules)) {
  if (!selector.startsWith('@'))
    populateStyles(toCamelCase(selector));
}

function toCamelCase(hyphenCase) {
  var camelCase = '';
  var capitalize = false;
  for (var i = 0; i < hyphenCase.length; i++) {
    if (hyphenCase[i] != '-') {
      if (capitalize) {
        camelCase += hyphenCase[i].toUpperCase();
        capitalize = false;
      } else {
        camelCase += hyphenCase[i];
      }
    } else {
      capitalize = true;
    }
  }
  return camelCase;
}

function populateStyles(selector) {
  if (selector.indexOf(',') != -1) {
    selector = selector.substring(0, selector.indexOf(','));
  }

  var obj = null;
  var objs = document.querySelectorAll(selector)
  for (var i = 0; i < objs.length; i++) {
    var objI = objs[i]
    if (!objI.hidden && window.getComputedStyle(objI)
        && window.getComputedStyle(objI).visibility != 'hidden') {
      obj = objI;
      break;
     }
  }
  if (!obj)
    return;

  var styles = rules[selector];
  var computed = window.getComputedStyle(obj);
  if (!computed)
    return;
  for (var style of Object.getOwnPropertyNames(styles)) {
    if (computed[style] && computed[style].length)
      styles[style] = computed[style];
  }
}


