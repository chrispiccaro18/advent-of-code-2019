const firstString = require('./input');

const add = (x, y) => {
  return x + y;
};

const multiply = (x, y) => {
  return x * y;
};

const intCode = stringOfInts => {
  const intArray = stringOfInts.split(',').map(stringInt => parseInt(stringInt));

  let i = 0;
  while(i < intArray.length) {
    const subArray = intArray.slice(i, i + 4);
    if(subArray[0] === 99) break;

    const secondInt = intArray[subArray[1]];
    const thirdInt = intArray[subArray[2]];

    intArray[subArray[3]] = subArray[0] === 1 ? add(secondInt, thirdInt) : multiply(secondInt, thirdInt);

    i += 4;
  }
  return intArray;
};

console.log(intCode(firstString)[0]);
