"use strict";
function addItUp(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
        return;
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 2.8;
var logResult = true;
var resultPhrase = 'Result is: ';
addItUp(number1, number2, logResult, resultPhrase);
