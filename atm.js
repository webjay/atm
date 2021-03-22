const cash = [
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

function output(cashOut) {
  const elCount = {};
  // reset & init
  setElementValue('notes', 0);
  setElementValue('coinsGt20', 0);
  setElementValue('coinsLt20', 0);
  cash.forEach(({ el }) => {
    elCount[el] = 0;
    setElementValue(el, 0);
  });
  setElementValue('json', JSON.stringify(cashOut, null, '  '));
  // populate Result
  cashOut.forEach(({ el }) => {
    setElementValue(el, ++elCount[el]);
  });
  // populate Payout
  const elCountTypes = {
    note: 0,
    coinsGt20: 0,
    coinsLt20: 0,
  };
  cashOut.forEach(({ type, width }) => {
    if (type === 'note') {
      setElementValue('notes', ++elCountTypes['note']);
    } else {
      if (width > 20) {
        setElementValue('coinsGt20', ++elCountTypes['coinsGt20']);
      } else {
        setElementValue('coinsLt20', ++elCountTypes['coinsLt20']);
      }
    }
  });
}

function amountToCash(amount) {
  if (typeof amount !== 'number' || amount < 0) return [];
  const result = [];
  let sum = 0;
  while (sum !== amount) {
    const diff = amount - sum;
    result.push(cash.find(({ value }) => {
      if (value > diff) return false;
      sum += value;
      return true;
    }));
  }
  return result;
}

function toInt(value) {
  return parseInt(value, 10);
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
  module.exports = amountToCash;
}
