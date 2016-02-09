function Variable(key) {
  this.key = key;
}

Variable.vars = {};

Variable.prototype = {
  // Careful: this updates properties without using Polymer set methods.
  linkTo: function(key, offset) {
    var v = Variable.vars[key];
    if (!v)
      return false;
    if (v.link && !v.rgb)
      return false;
    this.link = v.key;
    this.rgb = Variable.offset(v.rgb, offset);
    this.transparent = v.transparent;
    this.inherit = v.inherit;
    this.offset = offset;
    return true;
  },

  // Currently not used because multi-level linking not supported.
  isLinked: function(keyEnd) {
    var current = this;
    do {
      if (!current || !current.link)
        return false;
      if (current.link == keyEnd)
        return true;
      current = Variable.vars[current.link];
    } while (current.key != this.key);

    throw new Error('Circular link between ' + this.key + ' and ' + keyEnd + ' detected');
  },

  toString: function() {
    if (this.transparent)
      return 'transparent';
    if (this.inherit)
      return 'inherit';
    return 'rgb(' + this.rgb.red + ', ' + this.rgb.green + ', ' + this.rgb.blue + ')';
  },

  toColorString: function() {
    if (this.transparent || this.inherit)
      return '';
    if (!this.rgb)
      throw new Error('No color found for ' + this.key);
    return 'rgb(' + this.rgb.red + ', ' + this.rgb.green + ', ' + this.rgb.blue + ')';
  },
};

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

  /* Don't try to be smart.
  if (numValidInverted > numValid)
    offset *= -1;
    */

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
    var v = new Variable(key);
    var value = colors[key];
    v.description = value.description;
    if (value.color == 'transparent') {
      v.transparent = true;
    } else if (value.color == 'inherit') {
      v.inherit = true;
    } else {
      var dependentVar = Variable.parseVariable(value.color);
      if (dependentVar != null) {
        dependentVars.push(v);
        return;
      }

      var rgb = Variable.parseRgb(value.color);
      if (!rgb)
        throw new Error('Unable to parse ' + key + ': ' + value.color);
      v.rgb = rgb;
    }
    
    Variable.vars[key] = v;
  });

  var n = 0;
  while (dependentVars.length > 0) {
    if (n++ > 10)
      throw new Error('Circular link?');

    var stillDependentVars = [];

    // Second pass: link dependent variables.
    dependentVars.forEach(function(v) {
      var linkInfo = Variable.parseVariable(colors[v.key].color);
      var dependentVar = linkInfo[0];
      var offset = 0;
      if (linkInfo.length == 3 && linkInfo[1]) {
        var sign = linkInfo[1] == '+' ? 1 : -1;
        offset = sign * parseInt(linkInfo[2]);
      }
      if (!v.linkTo(dependentVar, offset))
        stillDependentVars.push(v);
      else
        Variable.vars[v.key] = v;
    });
    dependentVars = stillDependentVars;
  }
};

(function() {
  var decToHex = function(dec) {
    var dec = parseInt(dec);
    return (dec < 16 ? '0' : '') + dec.toString(16);
  }

  Variable.rgbToHex = function(r, g, b) {
    var red = decToHex(r);
    var green = decToHex(g);
    var blue = decToHex(b);
    return red + green + blue;
  }
})();

Variable.hexToRgb = function(hex) {
  var re = new RegExp('^\\s*#?' +
                      '([a-fA-F0-9]{2})' +
                      '([a-fA-F0-9]{2})' +
                      '([a-fA-F0-9]{2})' +
                      '\\s*$');
  var arr = re.exec(hex);
  if (!arr) {
    re = new RegExp('^\\s*#?' +
                    '([a-fA-F0-9])' +
                    '([a-fA-F0-9])' +
                    '([a-fA-F0-9])' +
                    '\\s*$');
    arr = re.exec(hex);
    if (!arr) {
      return null;
    }
    for (var i = 1; i <= 3; i++)
    arr[i] += arr[i];
  }
  var red = parseInt(arr[1], 16);
  var green = parseInt(arr[2], 16);
  var blue = parseInt(arr[3], 16);
  if (isNaN(red) || isNaN(green) || isNaN(blue))
    return null;
  return { red: red, green: green, blue: blue};
}
// h - 0 to 359
// s - 0 to 1
// v - 0 to 255

Variable.hsvToRgb = function(h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;
  if (s == 0) {
    // achromatic
    r = g = b = v;
  } else {
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        r = v, g = t, b = p;
      break;
      case 1:
        r = q, g = v, b = p;
      break;
      case 2:
        r = p, g = v, b = t;
      break;
      case 3:
        r = p, g = q, b = v;
      break;
      case 4:
        r = t, g = p, b = v;
      break;
      case 5:
        r = v, g = p, b = q;
      break;
    }
  }
  return { red: Math.round(r), green: Math.round(g), blue: Math.round(b) };
};

Variable.rgbToHsv = function(r, g, b) {
  var h, s, v;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  v = max;
  var delta = max - min;
  if (max != 0) {
    s = delta / max;
  } else {
    // r = g = b = 0
    s = 0;
    h = 0;
    return { hue: Math.round(h), saturation: s, value: Math.round(v) };
  }

  if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else
    h = 4 + (r - g) / delta;

  h *= 60;
  if (h < 0)
    h += 360;
  return { hue: Math.round(h), saturation: s, value: Math.round(v) };
};

Variable.toQueryString = function() {
  var q = '';
  for (var i = 0; i < variableIds.length; i++) {
    var key = variableIds[i];
    var color = Variable.vars[key];
    q += i + ':';

    if (color.inherit) {
      q += 'i';
    } else if (color.transparent) {
      q += 't';
    } else {
      var success = false;
      if (color.link) {
        var linkIndex = variableIds.indexOf(color.link);
        if (linkIndex == -1) {
          console.error('Couldn\'t find variable ' + color.link);
          // Fall back to rgb.
        } else {
          q += 'l' + color.link + ',' + color.offset;
          success = true;
        }
      }
      if (!success) {
        q += Variable.rgbToHex(color.rgb.red, color.rgb.green, color.rgb.blue);
      }
    }

    q += ';'
  }
  return encodeURIComponent(q);
};

Variable.readQueryString = function(colors, query) {
  var q = decodeURIComponent(query);
  var re = /([^:]*):([^;]*);/g;
  var result;
  while ((result = re.exec(q)) != null) {
    var key = variableIds[result[1]];
    var value = result[2];

    var color = colors[key];

    if (value == 'i') {
      color.color = 'inherit';
      continue;
    }
    if (value == 't') {
      color.color = 'transparent';
      continue;
    }
    var linkRe = /l([a-zA-Z0-9-]+),(-?)([-\d]+)/
    var linkResult = linkRe.exec(value);
    if (linkResult) {
      color.color = '$' + linkResult[1] + ' ';
      color.color += linkResult[2] == '-' ? '-' : '+';
      color.color += ' ' + linkResult[3];
      continue;
    }
    var rgb = Variable.hexToRgb(value);
    if (rgb) {
      color.color = 'rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';
      continue;
    }
    console.error('Could not parse query', key, value);
  }
};

(function() {
  var colors = lightColors;

  var queryIndex = location.href.indexOf('?');
  if (queryIndex)
    Variable.readQueryString(colors, location.href.substr(queryIndex + 1));

  Variable.initializeAll(colors);
})();




(function() {
  var ABITS = 4;
  var HSCALE = 256;

// h - 0 to 359 times 16 / 180
// s - 0 to 1 times 16 * 255
// v - 0 to 255 times 16

  // real (float) HSV: { hue: r.h / 180 * 16, saturation: r.s/16/255, value: r.v/16 };
Variable.hsvToRgbLossless = function(h, s, v) {
  var r = { r: 0, b: 0, g: 0 };
  var c = { h: h, s: s, v: v };
  var m;
  var H, X, ih, is, iv;

  var k1 = 255 << ABITS;
  var k2=HSCALE << ABITS;
  var k3=1<<(ABITS-1);

  // set chroma and min component value m
  //chroma = ( c.v * c.s )/k1;
  //m = c.v - chroma;
  m = Math.floor((c.v*(k1 - c.s ))/k1);

  // chroma  == 0 <-> c.s == 0 --> m=c.v
  if (c.s == 0) {
      r.b = ( r.g = ( r.r = c.v >> ABITS ));
  } else {
    ih=c.h;
    is=c.s;
    iv=c.v;

    H = Math.floor((6*ih)/k2);
    X = (Math.floor((iv*is)/k2))*(k2-Math.abs(6*ih- 2*(H>>1)*k2 - k2)) ;

    // removing additional bits --> unit8
    X=( Math.floor((X+iv*(k1 - is))/k1) + k3) >>ABITS;
    m=m >> ABITS;

    // ( chroma + m ) --> c.v ;
    switch (H) {
        case 0:
          r.r = c.v >> ABITS ;
          r.g = X;
          r.b = m ;
          break;
        case 1:
          r.r = X;
          r.g = c.v >> ABITS;
          r.b = m ;
          break;
        case 2:
          r.r = m ;
          r.g = c.v >> ABITS;
          r.b = X;
          break;
        case 3:
          r.r = m ;
          r.g = X;
          r.b = c.v >> ABITS;
          break;
        case 4:
          r.r = X;
          r.g = m ;
          r.b = c.v >> ABITS;
          break;
        case 5:
          r.r = c.v >> ABITS;
          r.g = m ;
          r.b = X;
          break;
    }
  }
  return { red: r.r, green: r.g, blue: r.b };
}



// Returned value is 16x what v should be.
// Returned saturation is 16*255x what s should be.
Variable.rgbToHsvLossless = function(r, g, b) {
  var c = { r: r, g: g, b: b, };
  var r = {};
  var iMin,iMax,chroma;
  var k1=255 << ABITS;
  var k2=HSCALE << ABITS;
  
  if (c.r > c.g) {
      iMax = Math.max (c.r, c.b);
      iMin = Math.min (c.g, c.b);
  } else {
      iMax = Math.max (c.g, c.b);
      iMin = Math.min (c.r, c.b);
  }

  chroma = iMax - iMin;
  // set value
  r.v = iMax << ABITS;

  // set saturation
  if (r.v == 0)
    r.s = 0;
  else
    r.s = Math.floor((k1*chroma)/iMax);

  // set hue 
  if (r.s == 0)
      r.h = 0;
  else {
      if ( c.r == iMax ) {
        r.h  =  Math.floor((k2*(6*chroma+c.g - c.b))/(6*chroma));
        if (r.h >= k2) r.h -= k2;
      } else if (c.g  == iMax)
        r.h  =  Math.floor((k2*(2*chroma+c.b - c.r )) / (6*chroma));
      else // (c.b == iMax )
        r.h  =  Math.floor((k2*(4*chroma+c.r - c.g )) / (6*chroma));
  }
  return { hue: r.h, saturation: r.s, value: r.v };
  // real (float) HSV: { hue: r.h / 180 * 16, saturation: r.s/16/255, value: r.v/16 };
};
})();

Variable.hsvLosslessToHsv = function(hsv) {
  return {
    hue: hsv.hue / 180 * 16,
    saturation: hsv.saturation / 16 / 266,
    value: hsv.value / 16
  };
}

function testRgbToHsvLossless() {
  for (var r = 0; r <= 255; r++) {
    console.log(r);
    for (var g = 0; g <= 255; g++) {
      for (var b = 0; b <= 255; b++) {
        var hsv = Variable.rgbToHsvLossless(r, g, b);
        var rgb = Variable.hsvToRgbLossless(hsv.hue, hsv.saturation, hsv.value);
        if(!(r == rgb.red && g == rgb.green && b == rgb.blue)) {
          console.error('Failed', [r, g, b], rgb, hsv);
        }
      }
    }
  }
}
