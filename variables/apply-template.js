var constValues = ['inherit', 'transparent'];
var material = false;

function applyTemplate(template, colors) {
  template = applyMaterial(template);
  var symbols = Object.getOwnPropertyNames(colors);
  for (var i = 0; i < symbols.length; i++) {
    template = template.replace(new RegExp('\\$' + symbols[i] + '(?!-)', 'g'),
                                colors[symbols[i]].color);
  }
  return template;
}

function applyMaterial(template) {
  // Non-greedily match content between IF blocks across lines.
  var re = /@IF_MATERIAL((?:\n^.*?)*)@ENDIF_MATERIAL/gm;
  if (material) {
    template = template.replace(re, '$1');
    // Remove -gradient styles.
    re = /\$((?:[a-zA-Z0-9]+)?(?:-[a-zA-Z0-9]+)+)-gradient(-[a-zA-Z0-9]+)*(?![-a-zA-Z0-9])/g
    template = template.replace(re, '$$$1$2');
  } else {
    template = template.replace(re, '');
  }
  return template;
}

function stampColors(colors) {
  var stamped = {};
  var keys = Object.getOwnPropertyNames(colors);
  keys.forEach(function(key) {
    stamped[key] = colors[key].color;
  });
  setColors(stamped);
  return stamped;
}

function setColors(colors) {
  var n = 0;
  var maxN = 4;
  var symbols = Object.getOwnPropertyNames(colors);
  while (++n < maxN) {
    for (var i = 0; i < symbols.length; i++) {
      var symbolVal = colors[symbols[i]].color;
      var dependentVar = parseVariable(symbolVal);
      if (dependentVar == null)
        continue;

      // Find value of dependent variable.
      if (!colors[dependentVar[0]])
        console.log(dependentVar[0]);
      var value = colors[dependentVar[0]].color;
      if (parseVariable(value)) {
        // Wait for variable to be populated.
        continue;
      }

      if (typeof dependentVar[1] != 'undefined')
        value = addToColor(value, dependentVar[1], dependentVar[2]);

      // Set variable to value of dependent variable.
      colors[symbols[i]].color = value;
    }
  }
}

function testColors(colors) {
  var symbols = Object.getOwnPropertyNames(colors);
  for (var i = 0; i < symbols.length; i++) {
    if (!parseRgb(colors[symbols[i]].color) &&
        constValues.indexOf(colors[symbols[i]].color) == -1) {
      throw new Error('Cannot parse $' + symbols[i] + ': ' +
                      colors[symbols[i]].color);
    }
  }
}

function parseVariable(value) {
  var re = new RegExp('\\$' +
                      '((?:[a-zA-Z0-9]*-)*' + '[a-zA-Z0-9]*)' +
                      '(?:\\s+' + '([+-])' + '\\s*' + '(\\d+)' + ')?');
  var variable = re.exec(value);
  if (variable == null)
    return null;
  // Return [variable, operator, number].
  return variable.slice(1);
}

function parseRgb(color) {
  var re = new RegExp('^\\s*' + 'rgb\\(' +
                      '([\\d]{1,3})' + '\\s*,\\s*' +
                      '([\\d]{1,3})' + '\\s*,\\s*' +
                      '([\\d]{1,3})' + '\\s*\\)');
  var rgb = re.exec(color);
  if (rgb == null)
    return null;
  var arr = [];
  for (var i = 1; i < 4; i++)
    arr.push(parseInt(rgb[i]));
  return arr;
}

function makeRgb(r, g, b) {
  var clamp = function(val) {
    return Math.max(0, Math.min(255, val));
  }
  return 'rgb(' + clamp(r) + ', ' + clamp(g) + ', ' + clamp(b) + ')';
}

function addToColor(color, operator, increment) {
  var sign = operator == '+' ? 1 : -1;
  var rgb = parseRgb(color);
  if (!rgb)
    throw new Error('Unparseable color');

  var numOverflow = 0;
  for (var i = 0; i < 3; i++) {
    if (rgb[i] + sign*increment > 255 || rgb[i] + sign*increment < 0)
      numOverflow++;
  }
  if (numOverflow >= 2)
    sign *= -1;
  return makeRgb(rgb[0] + sign*increment, rgb[1] + sign*increment,
                 rgb[2] + sign*increment);
}

function setStyle(light) {
  var re;
  if (light)
    re = /Dark-SpriteSheet\.png/g;
  else
    re = /Light-SpriteSheet\.png/g;
  template = template.replace(re, (light ? 'Light' : 'Dark') +
                              '-Spritesheet.png');
  // Use local sprites.
  re = /url\('http:\/\/voat.co\/Graphics\//g
  template = template.replace(re, 'url(\'./');
}

function printStyle(templ) {
  var p = document.createElement('pre');
  document.body.appendChild(p);
  p.textContent = templ;
}

function makeTemplate(light) {
  setStyle(light);
  var colors = light ? lightColors : darkColors;
  setColors(colors);
  var templ = applyTemplate(template, colors);
  printStyle(templ);
}

function setTheme(theme) {
  template = template.replace(/\$theme/g, theme);
}

window.addEventListener('DOMContentLoaded', function() {
  setColors(lightColors);
  setTheme('light');
  makeTemplate(true);
});
