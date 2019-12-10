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

const layers = makeLayers(input, 25, 6);
// console.log(layers);
let lowest0Index = null;

for(let i = 0; i < layers.length; i++) {
  let zeroCount = 0;
  const layer = layers[i];

  const zerosOnly = layer.filter(stringInt => !parseInt(stringInt));
  zeroCount = zerosOnly.length;
  
  if(!lowest0Index) lowest0Index = { i, zeroCount };
  else zeroCount < lowest0Index.zeroCount ? lowest0Index = { i, zeroCount } : null;
}
// console.log(lowest0Index);

const numberOfOnes = layers[lowest0Index.i].filter(stringInt => parseInt(stringInt) === 1).length;
const numberOfTwos = layers[lowest0Index.i].filter(stringInt => parseInt(stringInt) === 2).length;

console.log(numberOfOnes * numberOfTwos);

module.exports = {
  makeLayers,
};
