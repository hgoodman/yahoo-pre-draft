
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

  return {
    namesMatch: function (n0, n1) {
      n0 = asciiFold(n0).toLowerCase().replace('-', ' ');
      n1 = asciiFold(n1).toLowerCase().replace('-', ' ');
      return n0.startsWith(n1) || n1.startsWith(n0);
    },

    getAlternateSpelling: function (playerName) {
      switch (playerName) {
        // The football alternate spellings
        case 'Ben Watson':                  return 'Benjamin Watson';
        case 'William Fuller':              return 'Will Fuller';
        case 'Steve Johnson':               return 'Stevie Johnson';
        case 'Philly Brown':                return 'Corey Brown';

        // The hockey alternate spellings
        case 'TJ Brodie':                   return 'T.J. Brodie';
        case 'Pierre-Alexandre Parenteau':  return 'Pierre-Alexandr Parenteau';

        // The baseball alternate spellings
        case 'Alexander Colome':            return 'Alex Colome';
        case 'A.J. Ramos':                  return 'AJ Ramos';
        case 'Kenneth Giles':               return 'Ken Giles';
        case 'Nori Aoki':                   return 'Norichika Aoki';
        case 'Gregory Bird':                return 'Greg Bird';
        case 'Yulieski Gurriel':            return 'Yuli Gurriel';
        case 'Joseph Biagini':              return 'Joe Biagini';
        case 'Christopher Devenski':        return 'Chris Devenski';
        case 'Daniel Winkler':              return 'Dan Winkler';
        case 'Jonathan Gray':               return 'Jon Gray';
        case 'Vincent Velasquez':           return 'Vince Velasquez';
        case 'Nick Castellanos':            return 'Nicholas Castellanos';
        case 'Cameron Bedrosian':           return 'Cam Bedrosian';
        case 'Michael Foltynewicz':         return 'Mike Foltynewicz';
        case 'Daniel Straily':              return 'Dan Straily';
        case 'C.J. Edwards':                return 'Carl Edwards Jr.';
        case 'Raul Adalberto Mondesi':      return 'Raul Mondesi';
        case 'Matt Boyd':                   return 'Matthew Boyd';
        case 'Byung-ho Park':               return 'ByungHo Park';
        case 'Matthew Strahm':              return 'Matt Strahm';
        case 'A.J. Reed':                   return 'AJ Reed';
        case 'Dan Vogelbach':               return 'Daniel Vogelbach';
        case 'Matthew Wisler':              return 'Matt Wisler';
        case 'Michael Taylor':              return 'Michael A. Taylor';
      }
      return null;
    }
  };
})();

if (typeof module !== 'undefined') {
  module.exports = PDRPlayers;
}

/* eslint guard-for-in: 0 */
