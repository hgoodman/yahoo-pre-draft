
var PDRPlayers = (function () {
  var asciiToDiacritic = {
    'A':  'ÀÁÂÄÃÅĀ',          'AE': 'Æ',
    'C':  'ÇĆČ',              'E':  'ÈÉÊËĒĖĘ',
    'I':  'ÎÏÍĪĮÌ',           'L':  'Ł',
    'N':  'ÑŃ',               'O':  'ÔÖÒÓØŌÕ',
    'OE': 'Œ',                'S':  'ŚŠ',
    'U':  'ÛÜÙÚŪ',            'Y':  'Ÿ',
    'Z':  'ŽŹŻ',              'a':  'àáâäãå',
    'ae': 'æ',                'c':  'çćč',
    'e':  'èéêëēėę',          'i':  'îïíīįì',
    'l':  'ł',                'n':  'ñń',
    'o':  'ôöòóøōõ',          'oe': 'œ',
    's':  'śš',               'ss': 'ß',
    'u':  'ûüùúū',            'y':  'ÿ',
    'z':  'žźż'
  };

  var asciiLookup = { };
  for (var ascii in asciiToDiacritic) {
    var diacritic = asciiToDiacritic[ascii];
    for (var i = 0; i < diacritic.length; i++) {
      asciiLookup[diacritic[i]] = ascii;
    }
  }

  var asciiFold = function (str) {
    return str.replace(/[^\u0000-\u007f]/g, function (match) {
      return asciiLookup[match] || match;
    });
  };

  var firstNamePatterns = [
    /^Alex(ander)? /i,
    /^Ben(jamin)? /i,
    /^Cam(eron)? /i,
    /^Chris(topher)? /i,
    /^Dan(iel)? /i,
    /^Dav(e|id) /i,
    /^Greg(ory)? /i,
    /^Jo(e|seph) /i,
    /^Jon(athan)? /i,
    /^Josh(ua)? /i,
    /^Ken(neth)? /i,
    /^Matt(hew)? /i,
    /^Mi(ke|chael) /i,
    /^Mitch(ell)? /i,
    /^Nic(k|holas) /i,
    /^Nori(chika)? /i,
    /^Rob(ert)? /i,
    /^Ste(vi?e|phen) /i,
    /^Vince(nt)? /i,
    /^Wil(l(iam)?)? /i,
    /^Yuli(eski)? /i
  ];

  // These manually-created regular expressions supercede the alternate
  // spellings that used to be here. Regexes that just involve fuzzing common
  // first names or dealing with punctuation will be automatically generated.
  var nameRegexes = {
    'Corey Brown':                /^(Corey|Philly) Brown/i,
    'Pierre-Alexandr Parenteau':  /^Pierre-Alexandre? Parenteau/i,
    'Carl Edwards Jr.':           /^(Carl|C\.J\.) Edwards( Jr\.)?/i,
    'Raul Mondesi':               /^Raul (Adalberto )?Mondesi/i,
    'Michael A. Taylor':          /^Michael (A\. )?Taylor/i
  };

  var nameToRegex = function (name) {
    if (!nameRegexes[name]) {
      var pattern = asciiFold(name);
      pattern = pattern.replace(/([\-\.])/g, '[ \\$1]?');
      var matched = false;
      for (var f of firstNamePatterns) {
        if (pattern.match(f)) {
          pattern = pattern.replace(f, f.source);
          matched = true;
          break;
        }
      }
      if (!matched) {
        pattern = '^' + pattern;
      }
      nameRegexes[name] = new RegExp(pattern, 'i');
    }
    return nameRegexes[name];
  };

  return {
    namesMatch: function (n0, n1) {
      if (n0.match(nameToRegex(n1))) {
        return true;
      }
      if (n1.match(nameToRegex(n0))) {
        return true;
      }
      return false;
    }
  };
})();

if (typeof module !== 'undefined') {
  module.exports = PDRPlayers;
}

/* eslint guard-for-in: 0 */
