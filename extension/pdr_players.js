
var PDRPlayers = (function () {
  var PDRPlayers = function () { }

  var asciiToDiacritic = {
    'A':  'ÀÁÂÄÃÅĀ',          'AE': 'Æ',
    'C':  'ÇĆČ',              'E':  'ÈÉÊËĒĖĘE',
    'I':  'ÎÏÍĪĮÌ',           'L':  'Ł',
    'N':  'ÑŃ',               'O':  'ÔÖÒÓØŌÕ',
    'OE': 'Œ',                'S':  'ŚŠ',
    'U':  'ÛÜÙÚŪ',            'Y':  'Ÿ',
    'Z':  'ŽŹŻ',              'a':  'àáâäãåa',
    'ae': 'æ',                'c':  'çćč',
    'e':  'èéêëēėę',          'i':  'îïíīįì',
    'l':  'ł',                'n':  'ñń',
    'o':  'ôöòóøōõ',          'oe': 'œ',
    's':  'śš',               'ss': 'ß',
    'u':  'ûüùúū',            'y':  'ÿ',
    'z':  'žźż'
  }

  var asciiLookup = { };
  for (var ascii in asciiToDiacritic) {
    var diacritic = asciiToDiacritic[ascii];
    for (var i = 0; i < diacritic.length; i++) {
      asciiLookup[diacritic[i]] = ascii
    }
  }

  var asciiFold = function (str) {
    return str.replace(/[^\u0000-\u007f]/g, function (match) {
      return asciiLookup[match] || match;
    });
  };

  PDRPlayers.namesMatch = function (n0, n1) {
    n0 = asciiFold(n0.toLocaleLowerCase());
    n1 = asciiFold(n1.toLocaleLowerCase());
    return n0.startsWith(n1) || n1.startsWith(n0);
  };

  return PDRPlayers;
})();

if (typeof module !== 'undefined') {
  module.exports = PDRPlayers;
}
