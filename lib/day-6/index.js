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

const orbitMap = {};

inputs.forEach(orbit => {
  const orbitObj = determinePlanetAndSat(orbit);
  const value = orbitMap[orbitObj.sat];
  if(!value) orbitMap[orbitObj.sat] = orbitObj;
  // else orbitMap[orbitObj.sat] = [...value, orbitObj];
});

let totalCount = 0;

Object.keys(orbitMap).forEach(sat => {
  totalCount++;
  // if planet is a sat count and see if that has a planet
  let nextPlanet = orbitMap[sat].planet;
  while(orbitMap[nextPlanet]) {
    totalCount++;
    nextPlanet = orbitMap[nextPlanet].planet;
  }
});

console.log(totalCount);

module.exports = {
  determinePlanetAndSat,
};
