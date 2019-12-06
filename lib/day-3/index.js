const { firstPath, secondPath } = require('./input');

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

  const result = { firstPathPoints: null, secondPathPoints: null };

  for(let i = 0, path; i < 2; i++) {
    const points = [start];
    path = i === 0 ? firstPathArray : secondPathArray;

    
    path.forEach((move, i) => {
      // console.log(parseInt(move.match(/\d+/g)[0]));
      const displacement = determineDisplacement(move.split('')[0], parseInt(move.match(/\d+/g)[0]));
      points.push({ ...points[i], [displacement.plane]: displacement.distance + points[i][displacement.plane] });
    });

    // points.shift();
    result[i === 0 ? 'firstPathPoints' : 'secondPathPoints'] = points;
  }

  return result;
};

// const firstPath = 'R2,U5';
// const secondPath = 'U4,R6';
// would intersect at 2, 4 (x, y)

// const firstPath = 'R8,U5,L5,D3';
// const secondPath = 'U7,R6,D4,L4';
// would intersect at (6, 5) and (3, 3)

// const firstPath = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
// const secondPath = 'U62,R66,U55,R34,D71,R55,D58,R83';

const findIntersects = (firstPathPoints, secondPathPoints) => {
  const intersections = [];

  // compare two lines
  // aka two points from first path and two points from second path
  for(let i = 0; i < firstPathPoints.length - 1; i++) {
    const firstPathLine = { point1: firstPathPoints[i], point2: firstPathPoints[i + 1] };
    determineHorOrVert(firstPathLine);

    for(let j = 0; j < secondPathPoints.length - 1; j++) {
      const secondPathLine = { point1: secondPathPoints[j], point2: secondPathPoints[j + 1] };
      determineHorOrVert(secondPathLine);
      
      // console.table([i, firstPathLine, j, secondPathLine]);
  
      // not an intersection if they are both horizontal or vertical
      if(firstPathLine.isVert === secondPathLine.isVert) continue;
  
      // intersection is x of vertical and y of horizontal
      let x, y;
      if(firstPathLine.isVert) {
        x = firstPathLine.point1.x;
        y = secondPathLine.point1.y;
  
        // not an intersection if x of intersection is not in horizontal line
        // or y of intersection is not in vertical line
        if(!((x < secondPathLine.point1.x || x < secondPathLine.point2.x) && (x > secondPathLine.point1.x || x > secondPathLine.point2.x))) continue;
        if(!((y < firstPathLine.point1.y || y < firstPathLine.point2.y) && (y > firstPathLine.point1.y || y > firstPathLine.point2.y))) continue;
  
      } else {
        x = secondPathLine.point1.x;
        y = firstPathLine.point1.y;
        
        if(!((x < firstPathLine.point1.x || x < firstPathLine.point2.x) && (x > firstPathLine.point1.x || x > firstPathLine.point2.x))) continue;
        if(!((y < secondPathLine.point1.y || y < secondPathLine.point2.y) && (y > secondPathLine.point1.y || y > secondPathLine.point2.y))) continue;
      }
      
      intersections.push({ x, y });
    }

  }
  return intersections;
};

const determineHorOrVert = line => {
  const { point1, point2 } = line;
  line.isVert = point1.x === point2.x;
};

// const { firstPathPoints, secondPathPoints } = returnPathPoints(firstPath, secondPath);
// console.table([firstPathPoints, secondPathPoints]);
// console.log(returnPathPoints(firstPath, secondPath));
// console.log(findIntersects(firstPathPoints, secondPathPoints));

// The first key is that two lines can only cross if one is vertical and the other horizontal. When comparing vertical/vertical or horizontal/horizontal line segments, you can discard them.
// The second key is to identify the vertical and horizontal line segments. The horizontal line has an unchanging Y value and the vertical line has an unchanging X value. Here is a rough sketch I made to illustrate.
// The intersection will have the Y value of the horizontal line and the X value of the vertical line. However, this point can only be considered an intersection if the X value lies between the minimum and maximum X values of the horizontal line (that is, 6 has to be between 5 and 8) and the Y value has to be between the minimum and maximum Y values of the vertical line (10 has to be between 8 and 15).
// If the point passes those two tests then you have found the intersection between two crossing lines. I hope that helps a bit.

const calcDistanceOfClosestIntersect = intersections => {
  const { x, y } = intersections[0];
  let result = Math.abs(x) + Math.abs(y);
  for(let i = 1; i < intersections.length; i++) {
    const { x, y } = intersections[i];
    const sum = Math.abs(x) + Math.abs(y);
    if(sum < result) result = sum;
  }
  return result;
};

const crossedWires = (firstPath, secondPath) => {
  const { firstPathPoints, secondPathPoints } = returnPathPoints(firstPath, secondPath);
  const intersections = findIntersects(firstPathPoints, secondPathPoints);
  return calcDistanceOfClosestIntersect(intersections);
};

console.log(crossedWires(firstPath, secondPath));

module.exports = {
  returnPathPoints,
  findIntersects,
  calcDistanceOfClosestIntersect,
  crossedWires,
};
