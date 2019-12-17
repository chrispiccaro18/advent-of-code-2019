const { easyInput } = require('./input');

const lines = easyInput.split('\n').map(line => line.split(''));

console.log(lines);

const totalX = lines[0].length - 1;
const totalY = lines.length - 1;

const asteroidLocations = [];
for(let y = 0; y < lines.length; y++) {
  const line = lines[y];

  for(let x = 0; x < line.length; x++) {
    if(line[x] === '#') {
      asteroidLocations.push({ x, y });
    }
  }
}

for(let i = 0; i < asteroidLocations.length; i++) {
  const asteroidLocation = asteroidLocations[i];
  // look left
  // is it all the way to the left? x = 0?
  if(asteroidLocation.x) console.log(asteroidLocation);
  
  // look up
  // is it all the way up? y = 0?
  if(asteroidLocation.y) console.log(asteroidLocation);
  
  // look right
  // is it all the way to the right? x = totalX?
  if(asteroidLocation.x !== totalX) console.log(asteroidLocation);
  
  // look down
  //is it all the way down? y = totalY?
  if(asteroidLocation.y !== totalY) console.log(asteroidLocation);
}
