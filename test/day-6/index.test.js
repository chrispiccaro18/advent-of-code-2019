const {
  determinePlanetAndSat,
} = require('../../lib/day-6/index');

describe('day 6', () => {
  it('returns orbit object', () => {
    const result = determinePlanetAndSat('COM)B');
    expect(result).toEqual({
      planet: 'COM',
      sat: 'B'
    });
  });
});
