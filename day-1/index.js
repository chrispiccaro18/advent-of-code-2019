const string = require('./input');

const fuelCounterUpper = mass => {
  return Math.floor(mass / 3) - 2;
};

const calcTotalFuel = moduleArray => {
  return moduleArray.reduce((prevValue, module) => {
    return prevValue + fuelCounterUpper(module);
  }, 0);
};

const array = string.split('\n').map(int => parseInt(int));

const result = calcTotalFuel(array);

console.log(result);
