const {
  returnPathPoints,
  findIntersects,
  calcDistanceOfClosestIntersect,
  crossedWires,
  partTwo,
} = require('../../lib/day-3/index');

describe('day 3', () => {
  it('returns path points', () => {
    const firstPath = 'R2,U5';
    const secondPath = 'U4,R6';

    const { firstPathPoints, secondPathPoints } = returnPathPoints(firstPath, secondPath);
    expect({ firstPathPoints, secondPathPoints }).toEqual({
      firstPathPoints: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 5 }],
      secondPathPoints: [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 6, y: 4 }]
    });
  });

  it('returns the intersects', () => {
    const result = findIntersects(
      [
        { x: 0, y: 0 },
        { x: 8, y: 0 },
        { x: 8, y: 5 },
        { x: 3, y: 5 },
        { x: 3, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 7 },
        { x: 6, y: 7 },
        { x: 6, y: 3 },
        { x: 2, y: 3 }
      ],
    );
    expect(result.map(intersectionItem => intersectionItem.intersection)).toEqual([
      { x: 6, y: 5 }, { x: 3, y: 3 }
    ]);
  });

  it('returns the manhattan distance of the closest intersection', () => {
    const result = calcDistanceOfClosestIntersect([{ x: 6, y: 5 }, { x: 3, y: 3 }]);
    expect(result).toBe(6);
  });

  it('given two paths, it returns the distance of the closest intersection', () => {
    const firstPath = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const secondPath = 'U62,R66,U55,R34,D71,R55,D58,R83';
    const result = crossedWires(firstPath, secondPath);
    expect(result).toBe(159);

    const firstPath2 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const secondPath2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    const result2 = crossedWires(firstPath2, secondPath2);
    expect(result2).toBe(135);
  });

  it('finds the lowest possible steps to intersection', () => {
    const firstPath = 'R8,U5,L5,D3';
    const secondPath = 'U7,R6,D4,L4';
    const result = partTwo(firstPath, secondPath);
    expect(result).toBe(30);
    
    const firstPath2 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const secondPath2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
    const result2 = partTwo(firstPath2, secondPath2);
    expect(result2).toBe(610);
  });
});
