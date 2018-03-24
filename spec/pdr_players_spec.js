
var PDRPlayers = require('../extension/pdr_players.js');

describe('PDRPlayers', function () {
  describe('namesMatch()', function () {
    it('will match the same name to itself', function () {
      var name = 'Clayton Kershaw';
      expect(PDRPlayers.namesMatch(name, name)).toBe(true);
      expect(PDRPlayers.namesMatch(name, 'Mookie Betts')).toBe(false);
    });

    it('will match the same name when it contains diacritics', function () {
      var name = 'José Altuve';
      expect(PDRPlayers.namesMatch(name, name)).toBe(true);
    });

    it('will match on just the first part of a name', function () {
      var n0 = 'Robert Griffin';
      var n1 = 'Robert Griffin III';
      expect(PDRPlayers.namesMatch(n0, n1)).toBe(true);
      expect(PDRPlayers.namesMatch(n1, n0)).toBe(true);
    });

    it('folds diacritical marks when comparing names', function () {
      var n0 = 'Jose Altuve';
      var n1 = 'José Altuve';
      var n2 = 'Alex Colome';
      var n3 = 'Álex Colomé';
      var n4 = 'Thomas Häßler';
      var n5 = 'Thomas Hassler';
      expect(PDRPlayers.namesMatch(n0, n1)).toBe(true);
      expect(PDRPlayers.namesMatch(n1, n0)).toBe(true);
      expect(PDRPlayers.namesMatch(n2, n3)).toBe(true);
      expect(PDRPlayers.namesMatch(n3, n2)).toBe(true);
      expect(PDRPlayers.namesMatch(n4, n5)).toBe(true);
      expect(PDRPlayers.namesMatch(n5, n4)).toBe(true);
      expect(PDRPlayers.namesMatch(n0, n2)).toBe(false);
      expect(PDRPlayers.namesMatch(n1, n3)).toBe(false);
    });

    it('is case-insensitive', function () {
      var n0 = 'Jacob DeGrom';
      var n1 = 'Jacob deGrom';
      expect(PDRPlayers.namesMatch(n0, n1)).toBe(true);
    });

    it('equates hyphens with spaces when performing a comparison', function () {
      var n0 = 'Seung-Hwan Oh';
      var n1 = 'Seung Hwan Oh';
      expect(PDRPlayers.namesMatch(n0, n1)).toBe(true);
      expect(PDRPlayers.namesMatch(n1, n0)).toBe(true);
    });

    it('matches alternate spellings', function () {
      var namePairs = [
        // The football alternate spellings
        ['Ben Watson',                  'Benjamin Watson'],
        ['William Fuller',              'Will Fuller'],
        ['Steve Johnson',               'Stevie Johnson'],
        ['Philly Brown',                'Corey Brown'],

        // The hockey alternate spellings
        ['TJ Brodie',                   'T.J. Brodie'],
        ['Pierre-Alexandre Parenteau',  'Pierre-Alexandr Parenteau'],

        // The baseball alternate spellings
        ['Alexander Colome',            'Alex Colome'],
        ['A.J. Ramos',                  'AJ Ramos'],
        ['Kenneth Giles',               'Ken Giles'],
        ['Nori Aoki',                   'Norichika Aoki'],
        ['Gregory Bird',                'Greg Bird'],
        ['Yulieski Gurriel',            'Yuli Gurriel'],
        ['Joseph Biagini',              'Joe Biagini'],
        ['Christopher Devenski',        'Chris Devenski'],
        ['Daniel Winkler',              'Dan Winkler'],
        ['Jonathan Gray',               'Jon Gray'],
        ['Vincent Velasquez',           'Vince Velasquez'],
        ['Nick Castellanos',            'Nicholas Castellanos'],
        ['Cameron Bedrosian',           'Cam Bedrosian'],
        ['Michael Foltynewicz',         'Mike Foltynewicz'],
        ['Daniel Straily',              'Dan Straily'],
        ['C.J. Edwards',                'Carl Edwards Jr.'],
        ['Raul Adalberto Mondesi',      'Adalberto Mondesi'],
        ['Matt Boyd',                   'Matthew Boyd'],
        ['Byung-ho Park',               'ByungHo Park'],
        ['Matthew Strahm',              'Matt Strahm'],
        ['A.J. Reed',                   'AJ Reed'],
        ['Dan Vogelbach',               'Daniel Vogelbach'],
        ['Matthew Wisler',              'Matt Wisler'],
        ['Michael Taylor',              'Michael A. Taylor'],
        ['Jacob Faria',                 'Jake Faria'],
        ['Jake Junis',                  'Jakob Junis'],
        ['Mychal Antonio Givens',       'Mychal Givens'],
        ['Bradley Boxberger',           'Brad Boxberger'],
        ['Nick Delmonico',              'Nicky Delmonico'],
        ['Nathan Karns',                'Nate Karns']
      ];
      for (var n of namePairs) {
        expect(PDRPlayers.namesMatch(n[0], n[1])).toBe(true);
        expect(PDRPlayers.namesMatch(n[1], n[0])).toBe(true);
      }
    });
  });
});

/* eslint no-multi-spaces: 0 */
