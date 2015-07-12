var Variable = {};
Variable.vars = {};


Variable.parseVariable = function(value) {
  var re = new RegExp('\\$' +
                      '((?:[a-zA-Z0-9]*-)*' + '[a-zA-Z0-9]*)' +
                      '(?:\\s+' + '([+-])' + '\\s*' + '(\\d+)' + ')?');
  var variable = re.exec(value);
  if (variable == null)
    return null;
  // Return [variable, operator, number].
  return variable.slice(1);
};

Variable.parseRgb = function(color) {
  var re = new RegExp('^\\s*' + 'rgb\\(' +
                      '([\\d]{1,3})' + '\\s*,\\s*' +
                      '([\\d]{1,3})' + '\\s*,\\s*' +
                      '([\\d]{1,3})' + '\\s*\\)');
  var rgb = re.exec(color);
  if (rgb == null)
    return null;
  return {
    red: parseInt(rgb[1]),
    green: parseInt(rgb[2]),
    blue: parseInt(rgb[3]),
  };
};

Variable.clampRgb = function(rgb) {
  var newRgb = {};
  Variable.RGB.forEach(function(color) {
    newRgb[color] = Math.max(0, Math.min(255, rgb[color]));
  });
  return newRgb;
}

Variable.RGB = ['red', 'green', 'blue'];

Variable.offset = function(rgb, offset) {
  var numValid = 0;
  var numValidInverted = 0;
  var keys = Variable.RGB;
  for (var i = 0; i < 3; i++) {
    if (rgb[keys[i]] + offset <= 255 && rgb[keys[i]] + offset >= 0)
      numValid++;
    if (rgb[keys[i]] - offset <= 255 && rgb[keys[i]] - offset >= 0)
      numValidInverted++;
  }

  if (numValidInverted > numValid)
    offset *= -1;

  var newRgb = {};
  for (var i = 0; i < 3; i++)
    newRgb[keys[i]] = rgb[keys[i]] + offset;
  return Variable.clampRgb(newRgb);
}

Variable.initializeAll = function(colors) {
  Variable.vars = {};

  // First pass: set variable colors.
  var keys = Object.getOwnPropertyNames(colors);
  var dependentVars = [];
  keys.forEach(function(key) {
    var v = this.$[key];
    var value = colors[key];
    if (value == 'transparent') {
      v.set('transparent', true);
    } else if (value == 'inherit') {
      v.set('inherit', true);
    } else {
      var dependentVar = Variable.parseVariable(value);
      if (dependentVar != null) {
        dependentVars.push(v);
        return;
      }

      var rgb = Variable.parseRgb(colors[key]);
      if (!rgb)
        throw new Error('Unable to parse ' + key + ': ' + value);
      v.set('rgb', rgb);
    }
    
    Variable.vars[key] = v;
  });

  // Second pass: link dependent variables.
  dependentVars.forEach(function(v) {
    var linkInfo = Variable.parseVariable(colors[v.key]);
    var dependentVar = linkInfo[0];
    var offset = 0;
    if (linkInfo.length == 3 && linkInfo[1]) {
      var sign = linkInfo[1] == '+' ? 1 : -1;
      offset = sign * parseInt(linkInfo[2]);
    }
    v.linkTo(dependentVar, offset);
    Variable.vars[v.key] = v;
  });
};

Variable.initializeAll(lightColors);

