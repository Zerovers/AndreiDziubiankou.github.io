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
  return (a / b)^0;
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
console.log("23 div 6 = " + absoluteDivide(23, 6))
console.log("-29 div 5 = " + absoluteDivide(-29, 5))
