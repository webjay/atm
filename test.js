const { amountToCash, resultSum } = require('./atm.js');

const timeLabel = 'Time';
const tests = [578, 100, 123, 1543, 0, -10, '5', Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER + 1];

function validator(amount, result) {
  return amount === resultSum(result);
}

function test(amount) {
  const result = amountToCash(amount);
  const valid = validator(amount, result);
  return { amount, result, valid };
}

function runTests() {
  return tests.map(test);
}

function output(result) {
  console.log(JSON.stringify(result, null, 2));
}

const args = process.argv[2];

console.time(timeLabel);
if (args !== undefined) {
  const amount = parseInt(args, 10);
  output(test(amount));
} else {
  output(runTests());
}
console.timeEnd(timeLabel);
