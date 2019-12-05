const firstString = require('./input');


const add = (x, y) => {
  return x + y;
};

const multiply = (x, y) => {
  return x * y;
};

const intCode = (stringOfInts, noun = 12, verb = 2) => {
  const intArray = stringOfInts.split(',').map(stringInt => parseInt(stringInt));

  intArray[1] = noun;
  intArray[2] = verb;

  let i = 0;
  while(i < intArray.length) {
    const subArray = intArray.slice(i, i + 4);
    if(subArray[0] === 99) break;

    const secondInt = intArray[subArray[1]];
    const thirdInt = intArray[subArray[2]];

    intArray[subArray[3]] = subArray[0] === 1 ? add(secondInt, thirdInt) : multiply(secondInt, thirdInt);

    i += 4;
  }
  return intArray[0];
};

// console.log(intCode(firstString));

const TARGET = 19690720;

const part2 = stringOfInts => {
  let finalNoun, finalVerb;
  noun_loop:
  for(let noun = 0; noun < 100; noun++) {
    for(let verb = 0; verb < 100; verb++) {
      if(intCode(stringOfInts, noun, verb) === TARGET) {
        finalNoun = noun;
        finalVerb = verb;
        break noun_loop;
      }
    }
  }
  return 100 * finalNoun + finalVerb;
};

console.log(part2(firstString));
