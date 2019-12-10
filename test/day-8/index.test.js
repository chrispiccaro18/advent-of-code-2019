const {
  makeLayers,
} = require('../../lib/day-8/index');

const { testInput } = require('../../lib/day-8/input');

describe('day 8', () => {
  it('returns layers', () => {
    const result = makeLayers(testInput, 3, 2);
    expect(result).toEqual(
      [
        ['1', '2', '3', '4', '5', '6'],
        ['7', '8', '9', '0', '1', '2']
      ]
    );
  });
});
