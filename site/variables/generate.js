var Generator = (function() {
  var constValues = ['inherit', 'transparent'];

  function Generate(template, colors, isLight, useMaterial) {
    template = setLight(template, isLight);
    template = applyMaterial(template, useMaterial);
    template = applyTemplate(template, colors);
    return template;
  }

  function setLight(template, isLight) {
    template = template.replace(/\$theme/g, isLight ? 'light' : 'dark');

    var re;
    if (isLight)
      re = /Dark-SpriteSheet\.png/g;
    else
      re = /Light-SpriteSheet\.png/g;
    template = template.replace(re, (isLight ? 'Light' : 'Dark') +
                                '-Spritesheet.png');
    // TODO: REMOVE Use local sprites.
    re = /url\('http:\/\/voat.co\/Graphics\//g
               template = template.replace(re, 'url(\'./');
    return template;
  }

  function applyTemplate(template, colors) {
    var symbols = Object.getOwnPropertyNames(colors);
    for (var i = 0; i < symbols.length; i++) {
      template = template.replace(new RegExp('\\$' + symbols[i] + '(?!-)', 'g'),
                                  colors[symbols[i]].toColorString());
    }
    return template;
  }

  function applyMaterial(template, useMaterial) {
    // Non-greedily match content between IF blocks across lines.
    var re = /@IF_MATERIAL((?:\n^.*?)*)@ENDIF_MATERIAL/gm;
    if (useMaterial) {
      template = template.replace(re, '$1');
      // Remove -gradient styles.
      re = /\$((?:[a-zA-Z0-9]+)?(?:-[a-zA-Z0-9]+)+)-gradient(-[a-zA-Z0-9]+)*(?![-a-zA-Z0-9])/g
      template = template.replace(re, '$$$1$2');
    } else {
      template = template.replace(re, '');
    }
    return template;
  }

  return {
    Generate: Generate
  };
})();
