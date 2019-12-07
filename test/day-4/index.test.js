const {
  // findRange,
  checkForAdjacentSame,
} = require('../../lib/day-4/index');
// const input = require('../../lib/day-4/input');

describe('day 4', () => {
  it('returns true for good number', () => {
    expect(checkForAdjacentSame(122345)).toBe(true);
    expect(checkForAdjacentSame(123456)).toBe(false);
    expect(checkForAdjacentSame(123455)).toBe(true);
    expect(checkForAdjacentSame(113456)).toBe(true);
  });
});
