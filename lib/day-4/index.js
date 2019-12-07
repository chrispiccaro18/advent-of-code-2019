const input = require('./input');

// However, they do remember a few key facts about the password:

//     It is a six-digit number.
//     The value is within the range given in your puzzle input.
//     Two adjacent digits are the same (like 22 in 122345).

// Other than the range rule, the following are true:

//     111111 meets these criteria (double 11, never decreases).
//     223450 does not meet these criteria (decreasing pair of digits 50).
//     123789 does not meet these criteria (no double).

// How many different passwords within the range given in your puzzle input meet these criteria?

const combinedCheck = number => {
  const digits = Array.from(number.toString()).map(Number);
  let doubles = false;
  let digit = null;
  
  for(let i = 1; i < digits.length; i++) {
    if(digits[i] === digits[i - 1]) doubles = true;
    if(digits[i] < digits[i - 1]) digit = i;
  }

  return { doubles, digit, digits };
};

const findGoodNumber = number => {
  const { doubles, digit, digits } = combinedCheck(number);
  if(!digit && doubles) return number;
  if(digit) {
    digits[digit] = digits[digit - 1];
    return findGoodNumber(digitsToNumber(digits));
  }
};

const digitsToNumber = arrayOfDigits => {
  return parseInt(arrayOfDigits.reduce((numberString, digit) => {
    return numberString + digit;
  }, ''));
};

const findRange = input => {
  const [start, end] = input.split('-').map(Number);
  console.log(combinedCheck(start));
  return start;
};

module.exports = {
  findRange,
  combinedCheck,
  findGoodNumber,
  digitsToNumber
};


