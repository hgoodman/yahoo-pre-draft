const PDRPlayers = (function () {
  const asciiToDiacritic = {
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

  const asciiLookup = {};
  for (const ascii in asciiToDiacritic) {
    const diacritic = asciiToDiacritic[ascii];
    for (let i = 0; i < diacritic.length; i++) {
      asciiLookup[diacritic[i]] = ascii;
    }
  }

  const asciiFold = function (str) {
    return str.replace(/[^\u0000-\u007f]/g, function (match) {
      return asciiLookup[match] || match;
    });
  };

  const firstNamePatterns = [
    /^Alex(ander)? /i,
    /^Ben(jamin)? /i,
    /^Brad(ley)? /i,
    /^Cam(eron)? /i,
    /^Chris(topher)? /i,
    /^Dan(iel)? /i,
    /^Dav(e|id) /i,
    /^Greg(ory)? /i,
    /^Ja(ke|[ck]ob) /i,
    /^Jo(e|seph) /i,
    /^Jon(athan)? /i,
    /^Josh(ua)? /i,
    /^Ken(neth)? /i,
    /^Matt(hew)? /i,
    /^Mi(ke|chael) /i,
    /^Mitch(ell)? /i,
    /^Nat(e|han) /i,
    /^Nic(ky?|holas) /i,
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
  const nameRegexes = {
    'Corey Brown':                /^(Corey|Philly) Brown/i,
    'Pierre-Alexandr Parenteau':  /^Pierre-Alexandre? Parenteau/i,
    'Carl Edwards Jr.':           /^(Carl|C\.J\.) Edwards( Jr\.)?/i,
    'Adalberto Mondesi':          /^(Raul )?Adalberto Mondesi/i,
    'Michael A. Taylor':          /^Michael (A\. )?Taylor/i,
    'Mychal Givens':              /^Mychal (Antonio )?Givens/i
  };

  const nameToRegex = function (name) {
    if (!nameRegexes[name]) {
      let pattern = name.replace(/([\-\.])/g, '[ \\$1]?');
      let matched = false;
      for (const f of firstNamePatterns) {
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
      n0 = asciiFold(n0);
      n1 = asciiFold(n1);
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
