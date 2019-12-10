const {
  // input,
  testInput,
} = require('./input');

const makeLayers = (input, wide, tall) => {
  const layers = [];
  const layerLength = wide * tall;

  const inputArray = input.split('');
  for(let i = 0; i < inputArray.length; i++) {
    if((i + 1) % layerLength === 0) {
      layers.length ?
        layers.push(inputArray.slice(layers[layers.length - 1].length, i + 1)) : 
        layers.push(inputArray.slice(0, i + 1));
    }
  }

  return layers;
};

console.log(makeLayers(testInput, 3, 2));

module.exports = {
  makeLayers,
};
