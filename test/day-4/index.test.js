const {
  combinedCheck,
  findRange,
  findGoodNumber,
  digitsToNumber,
  prevGoodNumber,
} = require('../../lib/day-4/index');
const input = require('../../lib/day-4/input');

describe('day 4', () => {
  const goodNumber = { doubles: true, digit: null };
  it('checks for doubles and increasing digits', () => {
    expect(combinedCheck(122345)).toEqual({
      ...goodNumber,
      digits: Array.from((122345).toString()).map(Number)
    });
    // expect(combinedCheck(123456)).toEqual({ doubles: false, digit: null, });
    // expect(combinedCheck(123455)).toEqual(goodNumber);
    // expect(combinedCheck(113456)).toEqual(goodNumber);
    // expect(combinedCheck(122345)).toEqual(goodNumber);
    // expect(combinedCheck(122454)).toEqual({ doubles: true, digit: 5, });
    // expect(combinedCheck(123455)).toEqual(goodNumber);
    // expect(combinedCheck(103456)).toEqual({ doubles: false, digit: 1, });
  });
  it('returns starting range given input', () => {
    expect(findRange(input)).toEqual([356666, 799999]);
  });
  it('returns a good number', () => {
    expect(findGoodNumber(111111)).toBe(111111);
    expect(findGoodNumber(111110)).toBe(111111);
    expect(findGoodNumber(100000)).toBe(111111);
    expect(findGoodNumber(123456)).toBe(123466);
  });
  it('returns a number given digits', () => {
    expect(digitsToNumber([1, 2, 3, 4, 5, 6])).toBe(123456);
  });
  it('can find good number before a bad number', () => {
    expect(prevGoodNumber(846303)).toBe(799999);
  });
});
