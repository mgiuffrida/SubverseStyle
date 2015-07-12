var lightColors = {
  'bg': {
    color: 'rgb(244, 244, 244)',
    section: 'Main',
    description: 'Background',
  },
  'container-bg': {
    color: 'rgb(255, 255, 255)',
    section: 'Main',
    description: 'Content background',
  },
  'container-bg-alt1': {
    color: '$container-bg - 10',
    section: '',
    description: '',
  },
  'container-bg-alt2': {
    color: '$container-bg - 7',
    section: '',
    description: '',
  },
  'container-bg-alt3': {
    color: '$container-bg - 10',
    section: '',
    description: '',
  },
  'container-bg-alt4': {
    color: '$container-bg - 7',
    section: '',
    description: '',
  },
  'container-bg-alt5': {
    color: '$container-bg',
    section: '',
    description: '',
  },
  'container-border': {
    color: 'rgb(209, 209, 209)',
    section: 'Main',
    description: 'Content border',
  },
  'container-border-alt1': {
    color: '$container-border - 6',
    section: '',
    description: '',
  },
  'container-border-alt2': {
    color: 'rgb(128, 128, 128)',
    section: 'Editing',
    description: 'Markdown button border',
  },
  'container-border-alt3': {
    color: '$container-border + 24',
    section: '',
    description: '',
  },
  'container-border-alt4': {
    color: '$container-border',
    section: '',
    description: '',
  },
  'container-border-alt5': {
    color: '$container-border + 24',
    section: '',
    description: '',
  },
  'container-focus-border': {
    color: 'rgb(153, 153, 153)',
    section: '',
    description: '',
  },
  'container-text': {
    color: '$text',
    section: 'Main',
    description: 'Content text',
  },
  'text': {
    color: 'rgb(64, 64, 64)',
    section: 'Main',
    description: 'Text',
  },
  'text-alt1': {
    color: '$text - 13',
    section: '',
    description: '',
  },
  'text-alt2': {
    color: '$text + 8',
    section: '',
    description: '',
  },
  'header-bg': {
    color: 'rgb(255, 255, 255)',
    section: 'Header',
    description: 'Background',
  },
  'header-border': {
    color: 'rgb(220, 220, 220)',
    section: 'Header',
    description: 'Border',
  },
  'header-border-alt1': {
    color: '$header-border + 17',
    section: '',
    description: '',
  },
  'header-border-alt2': {
    color: '$header-border + 17',
    section: '',
    description: '',
  },
  'header-login-bg': {
    color: 'rgb(246, 246, 246)',
    section: 'Header',
    description: 'Account background',
  },
  'header-login-bg-mobile': {
    color: 'transparent',
    section: '',
    description: '',
  },
  'header-login-border-mobile': {
    color: 'transparent',
    section: '',
    description: '',
  },
  'header-login-a': {
    color: '$header-button',
    section: '',
    description: '',
  },
  'header-text': {
    color: 'rgb(68, 68, 68)',
    section: 'Header',
    description: 'Text',
  },
  'header-bar-link': {
    color: 'rgb(129, 129, 129)',
    section: 'Header',
    description: 'Subverse links',
  },
  'header-subverse-title': {
    color: 'rgb(90, 90, 90)',
    section: 'Header',
    description: 'Subverse title',
  },
  'header-button-selected-bg': {
    color: '$header-bg',
    section: 'Header',
    description: 'Selected button background',
  },
  'header-button-selected-bg-gradient': {
    color: '$header-button-selected-bg - 5',
    section: '',
    description: '',
  },
  'header-button-selected-hover': {
    color: '$a',
    section: 'Header',
    description: 'Selected button text: hover',
  },
  'header-button-selected-border': {
    color: 'rgb(208, 208, 208)',
    section: 'Header',
    description: 'Selected button border',
  },
  'header-button': {
    color: 'rgb(85, 85, 85)',
    section: 'Header',
    description: 'Button text',
  },
  'header-button-bg': {
    color: 'transparent',
    section: '',
    description: '',
  },
  'header-button-border': {
    color: 'transparent',
    section: '',
    description: '',
  },
  'header-button-contribute-bg': {
    color: 'rgb(187, 229, 255)',
    section: 'Header',
    description: 'Submit button background',
  },
  'header-button-contribute-bg-gradient': {
    color: 'rgb(166, 221, 255)',
    section: 'Header',
    description: 'Submit button background gradient',
  },
  'header-button-contribute-border': {
    color: 'rgb(112, 183, 227)',
    section: 'Header',
    description: 'Submit button border',
  },
  'header-button-contribute': {
    color: 'rgb(43, 71, 88)',
    section: 'Header',
    description: 'Submit button text',
  },
  'header-button-contribute-hover': {
    color: '$header-button-contribute',
    section: 'Header',
    description: 'Submit button text: hover',
  },
  'header-button-contribute-bg-hover': {
    color: 'rgb(167, 222, 255)',
    section: 'Header',
    description: 'Submit button background: hover',
  },
  'header-button-contribute-bg-hover-gradient': {
    color: 'rgb(145, 213, 255)',
    section: 'Header',
    description: 'Submit button background gradient: hover',
  },
  'header-button-contribute-border-hover': {
    color: 'rgb(97, 175, 224)',
    section: 'Header',
    description: 'Submit button border: hover',
  },
  'header-button-selected-mobile-bg': {
    color: 'rgb(248, 248, 248)',
    section: 'Mobile - Header',
    description: 'Selected button background',
  },
  'header-button-selected-mobile-bg-gradient': {
    color: 'rgb(242, 242, 242)',
    section: 'Mobile - Header',
    description: 'Selected button background gradient',
  },
  'header-button-selected-mobile-border': {
    color: 'rgb(186, 186, 186)',
    section: 'Mobile - Header',
    description: 'Selected button border',
  },
  'header-underline': {
    color: 'rgb(153, 153, 153)',
    section: '',
    description: '',
  },
  'header-more-bg': {
    color: '$a',
    section: '',
    description: '',
  },
  'header-more': {
    color: '$header-bg',
    section: '',
    description: '',
  },
  'side': {
    color: 'inherit',
    section: 'Sidebar',
    description: 'Text',
  },
  'side-bg': {
    color: 'transparent',
    section: 'Sidebar',
    description: 'Background',
  },
  'side-title': {
    color: 'inherit',
    section: 'Sidebar',
    description: 'Subverse',
  },
  'side-title-hover': {
    color: '$a',
    section: 'Sidebar',
    description: 'Subverse: hover',
  },
  'side-header': {
    color: '$a',
    section: 'Sidebar',
    description: 'Section title',
  },
  'side-header-underline': {
    color: 'rgb(221, 221, 221)',
    section: '',
    description: '',
  },
  'side-border-inner': {
    color: 'rgb(213, 213, 213)',
    section: '',
    description: '',
  },
  'side-status': {
    color: 'rgb(128, 128, 128)',
    section: 'Sidebar',
    description: 'Status text',
  },
  'side-content-bg': {
    color: 'rgb(252, 252, 252)',
    section: 'Sidebar',
    description: 'Section background',
  },
  'side-content-border': {
    color: 'rgb(228, 228, 228)',
    section: 'Sidebar',
    description: 'Section border',
  },
  'side-box-bg': {
    color: '$side-content-bg + 1',
    section: 'Sidebar',
    description: 'Box background',
  },
  'side-box-border': {
    color: 'rgb(211, 211, 211)',
    section: 'Sidebar',
    description: 'Box border',
  },
  'side-box': {
    color: 'inherit',
    section: 'Sidebar',
    description: 'Box text',
  },
  'a': {
    color: 'rgb(74, 171, 231)',
    section: 'Main',
    description: 'Link title',
  },
  'a-hover': {
    color: 'rgb(102, 194, 251)',
    section: 'Main',
    description: 'Link title: hover',
  },
  'a-visited': {
    color: 'rgb(145, 120, 208)',
    section: 'Main',
    description: 'Link title: visited',
  },
  'a-subverse-highlight': {
    color: '$header-bg',
    section: '',
    description: '',
  },
  'a-subverse-highlight-bg': {
    color: '$a + 10',
    section: '',
    description: '',
  },
  'a-subverse-highlight-bg-gradient': {
    color: '$a-subverse-highlight-bg - 10',
    section: '',
    description: '',
  },
  'a-darker': {
    color: '$a',
    section: '',
    description: '',
  },
  'a-alt1': {
    color: '$a',
    section: '',
    description: '',
  },
  'a-author-hover': {
    color: '$a',
    section: 'Links',
    description: 'Author link: hover',
  },
  'link-upvotes': {
    color: 'rgb(74, 171, 231)',
    section: 'Links',
    description: 'Upvotes',
  },
  'link-downvotes': {
    color: 'rgb(136, 112, 255)',
    section: 'Links',
    description: 'Downvotes',
  },
  'link-unvoted': {
    color: 'rgb(187, 187, 187)',
    section: 'Links',
    description: 'Vote count',
  },
  'link-title': {
    color: 'rgb(74, 74, 74)',
    section: 'Links',
    description: 'Title',
  },
  'link-domain': {
    color: '$tagline - 10',
    section: '',
    description: '',
  },
  'link-domain-a': {
    color: 'rgb(136, 136, 136)',
    section: 'Links',
    description: 'Site name',
  },
  'link-subverse': {
    color: '$tagline - 3',
    section: '',
    description: '',
  },
  'link-subverse-hover': {
    color: '$a',
    section: '',
    description: '',
  },
  'link-button': {
    color: '$tagline - 6',
    section: 'Links & Comments',
    description: 'Action link',
  },
  'link-button-border-mobile': {
    color: 'rgb(222, 222, 222)',
    section: 'Mobile - Links',
    description: 'Button border',
  },
  'tagline': {
    color: 'rgb(112, 112, 112)',
    section: 'Links & Comments',
    description: 'Tagline',
  },
  'tagline-off': {
    color: 'rgb(85, 85, 85)',
    section: '',
    description: '',
  },
  'tagline-a-hover': {
    color: 'rgb(67, 153, 205)',
    section: '',
    description: '',
  },
  'tagline-a-visited': {
    color: '$tagline-off',
    section: '',
    description: '',
  },
  'comment-expander': {
    color: 'rgb(170, 170, 170)',
    section: 'Comments',
    description: 'Collapsed comment',
  },
  'comment-collapsed-a': {
    color: '$comment-expander - 34',
    section: '',
    description: '',
  },
  'submitter': {
    color: '$link-downvotes',
    section: 'Comments',
    description: 'Submitter author',
  },
  'quote-border': {
    color: '$container-border + 10',
    section: '',
    description: '',
  },
  'comment-button': {
    color: '$link-button',
    section: '',
    description: '',
  },
  'comment-textarea-bg': {
    color: '$container-bg',
    section: 'Comments',
    description: 'Textbox background',
  },
  'comment-textarea-border': {
    color: '$container-border - 6',
    section: 'Comments',
    description: 'Textbox border',
  },
  'comment-textarea-text': {
    color: '$text - 13',
    section: 'Comments',
    description: 'Textbox text',
  },
  'button-contribute-bg': {
    color: '$header-button-contribute-bg',
    section: 'Sidebar',
    description: 'Submit button background',
  },
  'button-contribute-bg-gradient': {
    color: '$header-button-contribute-bg-gradient',
    section: 'Sidebar',
    description: 'Submit button background gradient',
  },
  'button-contribute-border': {
    color: '$header-button-contribute-border',
    section: 'Sidebar',
    description: 'Submit button border',
  },
  'button-contribute': {
    color: '$header-button-contribute',
    section: 'Sidebar',
    description: 'Submit button text',
  },
  'button-contribute-hover': {
    color: '$header-button-contribute',
    section: 'Sidebar',
    description: 'Submit button text: hover',
  },
  'button-contribute-bg-hover': {
    color: '$header-button-contribute-bg-hover',
    section: 'Sidebar',
    description: 'Submit button background: hover',
  },
  'button-contribute-bg-hover-gradient': {
    color: '$header-button-contribute-bg-hover-gradient',
    section: 'Sidebar',
    description: 'Submit button background gradient: hover',
  },
  'button-contribute-border-hover': {
    color: '$header-button-contribute-border-hover',
    section: 'Sidebar',
    description: 'Submit button border: hover',
  },
  'button-paging-bg': {
    color: '$header-button-contribute-bg',
    section: 'Main',
    description: 'Button background',
  },
  'button-paging-bg-gradient': {
    color: '$header-button-contribute-bg-gradient',
    section: 'Main',
    description: 'Button background gradient',
  },
  'button-paging-border': {
    color: '$header-button-contribute-border',
    section: 'Main',
    description: 'Button border',
  },
  'button-paging': {
    color: '$header-button-contribute',
    section: 'Main',
    description: 'Button text',
  },
  'button-paging-hover': {
    color: '$header-button-contribute-hover',
    section: 'Main',
    description: 'Button text: hover',
  },
  'button-paging-bg-hover': {
    color: '$header-button-contribute-bg-hover',
    section: 'Main',
    description: 'Button background: hover',
  },
  'button-paging-bg-hover-gradient': {
    color: '$header-button-contribute-bg-hover-gradient',
    section: 'Main',
    description: 'Button background gradient: hover',
  },
  'button-paging-border-hover': {
    color: '$header-button-contribute-border-hover',
    section: 'Main',
    description: 'Button border: hover',
  },
  'button-unsub-bg': {
    color: 'rgb(248, 248, 248)',
    section: '',
    description: '',
  },
  'button-unsub-bg-gradient': {
    color: 'rgb(240, 240, 240)',
    section: '',
    description: '',
  },
  'button-unsub-bg-hover': {
    color: 'rgb(196, 183, 255)',
    section: '',
    description: '',
  },
  'button-unsub-bg-hover-gradient': {
    color: 'rgb(189, 174, 255)',
    section: '',
    description: '',
  },
  'button-unsub-border': {
    color: 'rgb(201, 201, 201)',
    section: '',
    description: '',
  },
  'button-unsub-border-hover': {
    color: 'rgb(155, 133, 255)',
    section: '',
    description: '',
  },
  'button-unsub': {
    color: 'rgb(90, 90, 90)',
    section: '',
    description: '',
  },
  'button-unsub-hover': {
    color: 'rgb(91, 70, 190)',
    section: '',
    description: '',
  },
  'spoiler-bg': {
    color: 'rgb(231, 119, 119)',
    section: '',
    description: '',
  },
  'spoiler-border': {
    color: 'rgb(180, 79, 79)',
    section: '',
    description: '',
  },
  'spoiler-reveal-bg': {
    color: 'rgb(255, 227, 227)',
    section: '',
    description: '',
  },
  'code-bg': {
    color: '$container-bg',
    section: '',
    description: '',
  },
  'code-border': {
    color: '$container-bg - 50',
    section: '',
    description: '',
  },
  'error': {
    color: 'rgb(255, 65, 54)',
    section: '',
    description: '',
  },
  'footer': {
    color: 'rgb(109, 109, 109)',
    section: '',
    description: '',
  },
  'sticky-bg': {
    color: 'rgb(162, 109, 249)',
    section: '',
    description: '',
  },
  'sticky-border': {
    color: 'rgb(131, 88, 203)',
    section: '',
    description: '',
  },
  'sticky': {
    color: 'rgb(255, 255, 255)',
    section: '',
    description: '',
  },
  'sticky-title': {
    color: 'rgb(34, 136, 34)',
    section: '',
    description: '',
  },
  'label-bg': {
    color: 'rgb(221, 221, 221)',
    section: '',
    description: '',
  },
  'label': {
    color: 'rgb(85, 85, 85)',
    section: '',
    description: '',
  },
  'panel-header-bg': {
    color: 'rgb(238, 238, 238)',
    section: 'Comments',
    description: 'Reply header',
  },
  'panel-header-bg-gradient': {
    color: '$panel-header-bg - 6',
    section: '',
    description: '',
  },
  'panel-header-border': {
    color: 'rgb(214, 214, 214)',
    section: 'Comments',
    description: 'Reply header border',
  },
  'panel-border': {
    color: '$panel-header-border + 7',
    section: '',
    description: '',
  },
  'panel': {
    color: '$container-text - 13',
    section: '',
    description: '',
  },
  'load-more-bg': {
    color: '$container-bg - 2',
    section: '',
    description: '',
  },
  'load-more-bg-gradient': {
    color: '$container-bg - 8',
    section: '',
    description: '',
  },
  'load-more': {
    color: '$text + 12',
    section: '',
    description: '',
  },
  'load-more-bg-hover': {
    color: '$container-bg - 7',
    section: '',
    description: '',
  },
  'load-more-bg-hover-gradient': {
    color: '$container-bg - 15',
    section: '',
    description: '',
  },
  'load-more-border-hover': {
    color: '$container-border-alt1',
    section: '',
    description: '',
  },
  'load-more-hover': {
    color: '$text + 4',
    section: '',
    description: '',
  },
  'mobile-menu-border': {
    color: '$text',
    section: '',
    description: '',
  },
  'form-control-bg': {
    color: '$container-bg',
    section: '',
    description: '',
  },
  'form-control-placeholder': {
    color: 'rgb(153, 153, 153)',
    section: '',
    description: '',
  },
};
