
var PDRPlayers = require('../extension/pdr_players.js');

describe('PDRPlayers', function () {
  describe('namesMatch()', function () {
    it('will match the same name to itself', function () {
      var name = 'Clayton Kershaw';
      expect(PDRPlayers.namesMatch(name, name)).toBe(true);
      expect(PDRPlayers.namesMatch(name, 'Mookie Betts')).toBe(false);
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
  });

  describe('getAlternateSpelling()', function () {
    it('returns null for unrecognized names', function () {
      expect(PDRPlayers.getAlternateSpelling('Nonexistent')).toBe(null);
    });
  });
});
