const string = require('./input');

const fuelCounterUpper = mass => {
  return Math.floor(mass / 3) - 2;
};

const calcFuel = moduleArray => {
  return moduleArray.reduce((prevValue, module) => {
    let totalFuel = fuelCounterUpper(module);
    let fuel = totalFuel;
    while(fuelCounterUpper(fuel) > 0) {
      fuel =  fuelCounterUpper(fuel);
      totalFuel += fuel;
    }
    return prevValue + totalFuel;
  }, 0);
};

const array = string.split('\n').map(int => parseInt(int));

const result = calcFuel(array);



console.log(result);
