$(document).ready(function() {
  var calMemory = [];
  var currentInteger = "";

  $('.memory-clear-operator').on('click', clearAllMemory);
  $('.integer').on('click', addToInteger);
  $('.math-operator').on('click', recordMathOperator);
  $('#execute-operator').on('click', executeMathOperations);

  function addToInteger(e) {
    var value = getValue(e);
    currentInteger += value;
    setOutput(currentInteger);
  }

  function getValue(e) {
    return $(e.target).text();
  }

  function clearAllMemory() {
    calMemory = [];
    currentInteger = "";
    setOutput('');
  }

  function recordMathOperator(e) {
    var value = getValue(e);

    if (currentInteger !== "") {
      queCurrentInteger();
    }
    que(value);
  }

  function queCurrentInteger() {
    que(currentInteger);
    currentInteger = '';
  }

  function que(value) {
    calMemory.push(value);
  }

  function executeMathOperations() {
    // pre-calculation setup
    queCurrentInteger();

    // calculate answer
    var ints_and_ops = mapCalMemory();
    var total = calculate(ints_and_ops);

    // post calculation tear-down
    clearAllMemory();
    calMemory[0] = String(total);
    setOutput(total);
  }

  function calculate(ints_and_ops) {
    var total = undefined;

    for (var ii = 0; ii < ints_and_ops.length; ii++) {
      var currentVal = ints_and_ops[ii];

      if (typeof currentVal === 'number') {
        continue;
      } else {
        var leftSideNumber   = ints_and_ops[ii - 1];
        var rightSideNumber  = ints_and_ops[ii + 1];
        total = ints_and_ops[ii](leftSideNumber, rightSideNumber);
        ints_and_ops[ii + 1] = total;
      }
    }

    return total;
  }

  const MATH_OPERATIONS = {
    "/": function(intOne, intTwo) {
      return intOne / intTwo;
    },
    "X": function(intOne, intTwo) {
      return intOne * intTwo;
    },
    "-": function(intOne, intTwo) {
      return intOne - intTwo;
    },
    "+": function(intOne, intTwo) {
      return intOne + intTwo;
    }
  };

  function mapCalMemory() {
    return calMemory.map(function (currentValue, index, array) {
      if (MATH_OPERATIONS.hasOwnProperty(currentValue)) {
        return MATH_OPERATIONS[currentValue];
      } else {
        return Number(currentValue);
      }
    });
  }
});

function output() {
  return $('#output')
}

function setOutput(value) {
  output().attr('value', value);
}
