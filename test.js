const amountToCash = require('./atm.js');

const tests = [578, 100, 123, 1543];

function test() {
  tests.forEach((value) => {
    console.log({
      value,
      result: amountToCash(value),
    });
  });
}

const args = process.argv[2];

if (args !== undefined) {
  console.log(amountToCash(parseInt(args, 10)));
} else {
  console.log(test());
}
