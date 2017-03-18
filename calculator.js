function plus(a, b){
    return a + b;
}

function minus(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function absoluteDivide(a, b){
    return Math.floor((a / b));
}

alert("plus without arguments = " + plus())
alert("minus with one argument(8) = " + minus(8))
alert("2 * 6 = " + multiply(2, 6))
alert("18/4 = " + divide(18, 4))
alert("23 div 6 = " + absoluteDivide(23, 6))