function getHistory() {
  return document.getElementById('history-value').innerText;
}
function printHistory(num) {
  document.getElementById('history-value').innerText = num;
}
function printOutput(num) {
  document.getElementById('output-value').innerText = getFormattedNumber(num);
  /**if the value is empty we set the output to empty */
  if (num == '') {
    document.getElementById('output-value').innerText = num;
  } else {
    /**or else convert it to comma-separated comma value*/
    document.getElementById('output-value').innerText = getFormattedNumber(num);
  }
}
function getOutput() {
  return document.getElementById('output-value').innerText;
}
function getFormattedNumber(num) {
  if (num == '-') {
    return '';
  }
  var n = Number(num);
  var value = n.toLocaleString('en');
  return value;
}

/**convert the comma separated value back to the original number  */
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}
/**Operations */
var operator = document.getElementsByClassName('operator');
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function() {
    /**Identifying if the users is NaN*/
    var output = reverseNumberFormat(getOutput());
    /**Here the clear class is set to to an empty literal */
    if (this.id == 'clear') {
      printOutput('');
      printOutput('');
    } else if (this.id == 'backspace') {
      /**The backspace is set to remove the last character of the input value using a substring function*/
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == '' && history != '') {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != '' || history != '') {
        //condition?true:false
        output = output == '' ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == '=') {
          var result = eval(history);
          printOutput(result);
          printHistory('');
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput('');
        }
      }
    }
  });
}
/**Number operations - To test if the user input is a NaN*/
var number = document.getElementsByClassName('number');
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function() {
    /**Identifying if the users value is NaN*/
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output = output + this.id;
      printOutput(output);
    }
  });
}
