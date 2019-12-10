const {
  input,
  // testInput,
} = require('./input');

const inputs = input.split('\n');

const determinePlanetAndSat = orbit => {
  const split = orbit.split(')');
  return {
    planet: split[0],
    sat: split[1],
  };
};

const orbitMap = inputs.reduce((orbitMap, orbit) => {
  const { planet, sat } = determinePlanetAndSat(orbit);
  if(!orbitMap[planet]) orbitMap[planet] = { sats: [sat] };
  else {
    orbitMap[planet].sats ?
      orbitMap[planet] = { ...orbitMap[planet], sats: [...orbitMap[planet].sats, sat] } :
      orbitMap[planet] = { ...orbitMap[planet], sats: [sat] };
  }
  if(!orbitMap[sat]) orbitMap[sat] = { planet };
  else orbitMap[sat] = { ...orbitMap[sat], planet };
  return orbitMap;
}, {});

// items will be planet
const santaJumps = [];
const youJumps = [];

const youStartPlanet = orbitMap.YOU.planet;
const santaStartPlanet = orbitMap.SAN.planet;

let santaPlanet = santaStartPlanet;
let youPlanet = youStartPlanet;

do{
  santaJumps.push(orbitMap[santaPlanet].planet);
  santaPlanet = orbitMap[santaPlanet].planet;
} while(orbitMap[santaPlanet].planet);

do{
  youJumps.push(orbitMap[youPlanet].planet);
  youPlanet = orbitMap[youPlanet].planet;
} while(!santaJumps.includes(youPlanet));

const commonPlanet = youJumps[youJumps.length - 1];
const commonPlanetIndex = santaJumps.indexOf(commonPlanet);
const totalSantaJumps = santaJumps.slice(0, commonPlanetIndex + 1);

console.log(totalSantaJumps.length + youJumps.length);

// let totalCount = 0;

// Object.keys(orbitMap).forEach(sat => {
//   totalCount++;
//   // if planet is a sat count and see if that has a planet
//   let nextPlanet = orbitMap[sat].planet;
//   while(orbitMap[nextPlanet]) {
//     totalCount++;
//     nextPlanet = orbitMap[nextPlanet].planet;
//   }
// });

module.exports = {
  determinePlanetAndSat,
};
