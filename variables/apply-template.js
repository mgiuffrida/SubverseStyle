var constValues = ['inherit', 'transparent'];

function applyTemplate(template, colors) {
  var symbols = Object.getOwnPropertyNames(colors);
  for (var i = 0; i < symbols.length; i++) {
    template = template.replace(new RegExp('\\$' + symbols[i] + '(?!-)', 'g'),
                                colors[symbols[i]]);
  }
  return template;
}

function setColors(colors) {
  var n = 0;
  var maxN = 4;
  var symbols = Object.getOwnPropertyNames(colors);
  while (++n < maxN) {
    console.log(n);
    for (var i = 0; i < symbols.length; i++) {
      var symbolVal = colors[symbols[i]];
      var dependentVar = parseVariable(symbolVal);
      if (dependentVar == null)
        continue;

      // Find value of dependent variable.
      var value = colors[dependentVar[0]];
      console.log(symbolVal, value);
      if (parseVariable(value)) {
        // Wait for variable to be populated.
        continue;
      }

      if (typeof dependentVar[1] != 'undefined')
        value = addToColor(value, dependentVar[1], dependentVar[2]);

      // Set variable to value of dependent variable.
      colors[symbols[i]] = value;
    }
  }
}

function testColors(colors) {
  var symbols = Object.getOwnPropertyNames(colors);
  for (var i = 0; i < symbols.length; i++) {
    if (!parseRgb(colors[symbols[i]]) &&
        constValues.indexOf(colors[symbols[i]]) == -1) {
      throw new Error('Cannot parse $' + symbols[i] + ': ' +
                      colors[symbols[i]]);
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
