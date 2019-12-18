const { input } = require('./input');

const lines = input.split('\n').map(line => line.split(''));

// https://stackoverflow.com/questions/4652468/is-there-a-javascript-function-that-reduces-a-fraction
function reduce(numerator, denominator){
  var gcd = function gcd(a, b){
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

const asteroidLocations = [];
for(let y = 0; y < lines.length; y++) {
  const line = lines[y];

  for(let x = 0; x < line.length; x++) {
    if(line[x] === '#') {
      asteroidLocations.push({ x, y, iSee: {} });
    }
  }
}

for(let i = 0; i < asteroidLocations.length; i++) {
  const asteroidLocation = asteroidLocations[i];

  for(let j = 0; j < asteroidLocations.length; j++) {
    const otherAsteroidLocation = asteroidLocations[j];
    if(asteroidLocation === otherAsteroidLocation) break;

    let rise = otherAsteroidLocation.y - asteroidLocation.y;
    let run = otherAsteroidLocation.x - asteroidLocation.x;
    if(rise < 0 && run < 0) {
      rise = Math.abs(rise);
      run = Math.abs(run);
    } 

    let slope;
    if(rise === 0) slope = 'horizontal';
    else if(run === 0) slope = 'vertical';
    else {
      let [finalRise, finalRun] = reduce(rise, run);
      if(finalRun < 0) finalRise *= -1; 
      slope = `${finalRise}/${finalRun}`;
    }

    let before, after;
    if(asteroidLocation.x < otherAsteroidLocation.x || asteroidLocation.y < otherAsteroidLocation.y) {
      before = { x: asteroidLocation.x, y: asteroidLocation.y };
      after = { x: otherAsteroidLocation.x, y: otherAsteroidLocation.y };

      if(!asteroidLocation.iSee[slope] || !asteroidLocation.iSee[slope].after) {
        let newSlopeObj;
        asteroidLocation.iSee[slope] ? newSlopeObj = { ...asteroidLocation.iSee[slope], after } :
          newSlopeObj = { after };
        asteroidLocation.iSee = { ...asteroidLocation.iSee, [slope]: newSlopeObj };
      }

      if(!otherAsteroidLocation.iSee[slope] || !otherAsteroidLocation.iSee[slope].before) {
        let newSlopeObj;
        otherAsteroidLocation.iSee[slope] ? newSlopeObj = { ...otherAsteroidLocation.iSee[slope], before } :
          newSlopeObj = { before };
        otherAsteroidLocation.iSee = { ...otherAsteroidLocation.iSee, [slope]: newSlopeObj };
      }

    } else {
      before = { x: otherAsteroidLocation.x, y: otherAsteroidLocation.y };
      after = { x: asteroidLocation.x, y: asteroidLocation.y };

      if(!asteroidLocation.iSee[slope] || !asteroidLocation.iSee[slope].before) {
        let newSlopeObj;
        asteroidLocation.iSee[slope] ? newSlopeObj = { ...asteroidLocation.iSee[slope], before } :
          newSlopeObj = { before };
        asteroidLocation.iSee = { ...asteroidLocation.iSee, [slope]: newSlopeObj };
      }

      if(!otherAsteroidLocation.iSee[slope] || !otherAsteroidLocation.iSee[slope].after) {
        let newSlopeObj;
        otherAsteroidLocation.iSee[slope] ? newSlopeObj = { ...otherAsteroidLocation.iSee[slope], after } :
          newSlopeObj = { after };
        otherAsteroidLocation.iSee = { ...otherAsteroidLocation.iSee, [slope]: newSlopeObj };
      }

    }
  }
}

let highestCount = { count: 0 };

asteroidLocations.forEach(asteroidLocation => {
  const { x, y, iSee } = asteroidLocation;

  let count = 0;

  const slopes = Object.values(iSee);
  slopes.forEach(slope => {
    if(slope.before) count++;
    if(slope.after) count++;
  });

  highestCount.count < count ? highestCount = { x, y, count } : null;
});

console.log(highestCount);
