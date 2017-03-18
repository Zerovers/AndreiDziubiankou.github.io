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
  var c = a / b;
  if (c < 0) {
    return Math.ceil(c);
  } else {
    return Math.floor(c);
  }
}

console.log("plus without arguments = " + plus())
console.log("23 + 54 = " + plus(23, 54))
console.log("string + 45 = " + plus("string", 45))
console.log("minus with one argument(8) = " + minus(8))
console.log("string - 8 = " + minus("string", 8))
console.log("\"234\" - 15 = " + minus("234", 15))
console.log("2 * 6 = " + multiply(2, 6))
console.log("boolean(true) * 6 = " + multiply(true, 6))
console.log("boolean(true) * string = " + multiply(true, "string"))
console.log("18 / 4 = " + divide(18, 4))
console.log("\"32\" / 8 = " + divide("32", 8))
console.log("24 div 5 = " + absoluteDivide(24, 5))
console.log("25 div 5 = " + absoluteDivide(25, 5))
console.log("26 div 5 = " + absoluteDivide(26, 5))
console.log("-24 div 5 = " + absoluteDivide(-24, 5))
console.log("-25 div 5 = " + absoluteDivide(-25, 5))
console.log("-26 div 5 = " + absoluteDivide(-26, 5))
console.log("-24 div -5 = " + absoluteDivide(-24, -5))
console.log("-26 div 5 = " + absoluteDivide(-26, -5))
