const { returnPathPoints } = require('../../lib/day-3/index');

describe('day 3', () => {
  it('returns path points', () => {
    const firstPath = 'R2,U5';
    const secondPath = 'U4,R6';

    const result = returnPathPoints(firstPath, secondPath);
    expect(result).toEqual({
      firstPathPoints: [{ x: 2, y: 0 }, { x: 2, y: 5 }],
      secondPathPoints: [{ x: 0, y: 4 }, { x: 6, y: 4 }]
    });
  });
});
