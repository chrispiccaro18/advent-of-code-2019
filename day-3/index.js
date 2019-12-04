// const { firstPath, secondPath} = require('./input');

// find where the intersections are, both wires 
// go through the same x and y point
// find which intersection is closest to the start

const determineDisplacement = (direction, distance) => {
  const result = {
    plane: null,
    distance: null,
  };

  result.plane = (direction === 'D' || direction === 'U') ? 'y' : 'x';
  result.distance = (direction === 'R' || direction === 'U') ? distance : -distance;
  return result;
};


const start = {
  x: 0,
  y: 0
};

const returnPathPoints = (firstPath, secondPath) => {
  const firstPathArray = firstPath.split(',');
  const secondPathArray = secondPath.split(',');

  const firstPathPoints = [start];
  const secondPathPoints = [start];

  firstPathArray.forEach((move, i) => {
    const displacement = determineDisplacement(move.split('')[0], parseInt(move.split('')[1]));

    firstPathPoints.push({ ...firstPathPoints[i], [displacement.plane]: displacement.distance + firstPathPoints[i][displacement.plane] });
  });
  
  secondPathArray.forEach((move, i) => {
    const displacement = determineDisplacement(move.split('')[0], parseInt(move.split('')[1]));

    secondPathPoints.push({ ...secondPathPoints[i], [displacement.plane]: displacement.distance + secondPathPoints[i][displacement.plane] });
  });

  firstPathPoints.shift();
  secondPathPoints.shift();

  return { firstPathPoints, secondPathPoints };
};

// const firstPath = "R8,U5,L5,D3";
// const secondPath = "U7,R6,D4,L4";
// would intersect at (6, 5) and (3, 3)

const firstPath = 'R2,U5';
const secondPath = 'U4,R6';
// would intersect at 2, 4 (x, y)

const findIntersects = (firstPathPoints, secondPathPoints) => {
  // compare two lines
  // aka two points from first path and two points from second path
  // intersection is x of vertical and y of horizontal
  // not an intersection if they are both horizontal or vertical
  // not an intersection if x of intersection is not in horizontal line
  // or y of intersection is not in vertical line
};

const { firstPathPoints, secondPathPoints } = returnPathPoints(firstPath, secondPath);

// The first key is that two lines can only cross if one is vertical and the other horizontal. When comparing vertical/vertical or horizontal/horizontal line segments, you can discard them.
// The second key is to identify the vertical and horizontal line segments. The horizontal line has an unchanging Y value and the vertical line has an unchanging X value. Here is a rough sketch I made to illustrate.
// The intersection will have the Y value of the horizontal line and the X value of the vertical line. However, this point can only be considered an intersection if the X value lies between the minimum and maximum X values of the horizontal line (that is, 6 has to be between 5 and 8) and the Y value has to be between the minimum and maximum Y values of the vertical line (10 has to be between 8 and 15).
// If the point passes those two tests then you have found the intersection between two crossing lines. I hope that helps a bit.
