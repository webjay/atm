const amountToCash = require('./atm.js');

const tests = [578, 100, 123, 1543];

tests.forEach((value) => {
  console.log({
    value,
    result: amountToCash(value),
  });
});

// console.log(amountToCash(105));
