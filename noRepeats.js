// Note: Credit for permutation code:
// http://learn.roguecc.edu/IT/JMiller/JavaScript/permute.js

function allPermutations(input) {
  var permArr = [], usedChars = [];

  function permute(input) {
    var chars = input.split("");

    for (var i = 0; i < chars.length; i++) {
      var ch = chars.splice(i, 1);
      usedChars.push(ch);
      if (chars.length == 0) permArr[permArr.length] = usedChars.join("");
      permute(chars.join(""));
      chars.splice(i, 0, ch);
      usedChars.pop();
    }

  }

  permute(input);

  return permArr;
}

function permAlone(str) {
  var permutations = allPermutations(str);

  var noRepeats = permutations.filter(function(elm, idx, arr) {
    var repeated = false;

    elm.split('').forEach(function(currElm, idx, arr) {
      if (idx === 0) {
      } else {
        var prevElm = arr[idx - 1];

        if (prevElm == currElm) {
          repeated = true;
        }
      }
    });

    return !repeated;
  });

  return noRepeats.length;
}

var test = permAlone('aab');
console.log(test);
