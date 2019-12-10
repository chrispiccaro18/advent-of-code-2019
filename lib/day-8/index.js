const fs = require('fs');
const {
  input,
  // testInput,
} = require('./input');

const makeLayers = (input, wide, tall) => {
  const layers = [];
  const layerLength = wide * tall;

  const inputArray = input.split('');
  for(let i = 0; i < inputArray.length; i++) {
    if((i + 1) % layerLength === 0) {
      let start = 0;
      if(layers.length) {
        start = layers.length * layerLength;
      }
      layers.push(inputArray.slice(start, i + 1));
    }
  }

  return layers;
};

const arrayOfDigitsToString = arrayOfDigits => {
  let string = '';
  arrayOfDigits.forEach(digit => string += digit);
  string += '\n';
  return string;
};

const layers = makeLayers(input, 25, 6);

let finalLayer = layers[0];
// 0 is black, 1 is white, 2 is transparent
for(let layerIndex = 1; layerIndex < layers.length; layerIndex++) {
  const layer = layers[layerIndex];
  for(let numberIndex = 0; numberIndex < layer.length; numberIndex++) {
    const finalLayerNumber = finalLayer[numberIndex];
    const layerNumber = layer[numberIndex];
    if(finalLayerNumber === 2) finalLayer[numberIndex] = layerNumber;
  }
}

const finalImage = [];

for(let i = 0; i < finalLayer.length; i++) {
  if((i + 1) % 25 === 0) {
    let start = 0;
    if(finalImage.length) {
      start = finalImage.length * 25;
    }
    finalImage.push(finalLayer.slice(start, i + 1));
  }
}

fs.writeFileSync('./image.txt', finalImage.map(row => {
  return arrayOfDigitsToString(row);
}));
// console.log(finalImage);

module.exports = {
  makeLayers,
};
