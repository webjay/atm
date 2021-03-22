const nf = new Intl.NumberFormat();

const cashItems = [
  { 
    el: 'notes1000',
    value: 1000,
    type: 'note',
  },
  { 
    el: 'notes500',
    value: 500,
    type: 'note',
  },
  { 
    el: 'notes200',
    value: 200,
    type: 'note',
  },
  { 
    el: 'notes100',
    value: 100,
    type: 'note',
  },
  { 
    el: 'notes50',
    value: 50,
    type: 'note',
  },
  { 
    el: 'coins20',
    value: 20,
    type: 'coin',
    width: 40,
  },
  { 
    el: 'coins10',
    value: 10,
    type: 'coin',
    width: 20,
  },
  { 
    el: 'coins5',
    value: 5,
    type: 'coin',
    width: 50,
  },
  { 
    el: 'coins2',
    value: 2,
    type: 'coin',
    width: 30,
  },
  { 
    el: 'coins1',
    value: 1,
    type: 'coin',
    width: 10,
  },
];

function setElementValue(el, value) {
  document.getElementById(el).innerHTML = value;
}

function resultSum(result) {
  return result.reduce((acc, { cash: { value }, count }) => acc += value * count, 0);
}

function output(cashOut) {
  // reset & init
  setElementValue('notes', 0);
  setElementValue('coinsGt20', 0);
  setElementValue('coinsLt20', 0);
  cashItems.forEach(({ el }) => {
    setElementValue(el, 0);
  });
  setElementValue('json', JSON.stringify(cashOut, null, '  '));
  // populate Result
  cashOut.forEach(({ cash: { el }, count }) => {
    setElementValue(el, count);
  });
  setElementValue('sum', nf.format(resultSum(cashOut)));
  // populate Payout
  const elCountTypes = {
    notes: 0,
    coinsGt20: 0,
    coinsLt20: 0,
  };
  cashOut.forEach(({ cash: { type, width }, count }) => {
    const typeCash = type === 'note' ? 'notes' : width > 20 ? 'coinsGt20' : 'coinsLt20';
    elCountTypes[typeCash] += count;
    setElementValue(typeCash, elCountTypes[typeCash]);
  });
}

function toInt(value) {
  return parseInt(value, 10);
}

function amountValid(amount) {
  return typeof amount === 'number' && Number.isNaN(amount) === false && amount > 0 && amount <= Number.MAX_SAFE_INTEGER;
}

function amountToCash(amount) {
  if (amountValid(amount) === false) return [];
  const result = [];
  let sum = 0;
  while (sum !== amount) {
    const diff = amount - sum;
    cashItems.some((cash) => {
      const { value } = cash;
      if (value > diff) return false;
      const count = toInt(diff / value);
      sum += value * count;
      result.push({ count, cash });
      return true;
    });
  }
  return result;
}

function inputEventListener({ target: { value: valueStr } }) {
  const value = valueStr.trim() === '' ? 0 : toInt(valueStr);
  output(amountToCash(value));
}

function onLoad() {
  document.getElementById('amount').addEventListener('input', inputEventListener);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', onLoad);
} else {
  module.exports = { amountToCash, resultSum };
}
