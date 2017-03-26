"use strict"
console.log('isArray({}): ' + isArray({}));
console.log('isArray({}): ' + isArray(24));
console.log('isArray("hello world"): ' + isArray('hello world'));
console.log('isArray(true) ' + isArray(true));
console.log('isArray([]) ' + isArray([]));

console.log('range(): ' + range());
console.log('range(5): ' + range(5));
console.log('range(1, 5): ' + range(1, 5));
console.log('range(1, 10, 2): ' + range(1, 10, 2));
console.log('range(1, 10, 5, 40): ' + range(1, 10, 5, 40));

var array = [1, 4, 6, 8, 9, 15, 32];
console.log('sum([' + array +']): ' + sum(array));
console.log('last([' + array +']): ' + last(array));
console.log('excludeLast([' + array +']): ' + excludeLast(array));
console.log('excludeLast([' + array +'], 1): ' + excludeLast(array, 1));
console.log('excludeLast([' + array +'], 2): ' + excludeLast(array, 2));

function isArray(object){
  //version 1
  //return object instanceof Array;
  
  //version 2
  return Object.prototype.toString.call(object) == '[object Array]';
}

function range(rangeA, rangeB, step){
  var array = [];
  switch(arguments.length){
    case 1:
      for (var i = 0; i < rangeA; i++){
        array[i] = i;
      }
      return array;
    case 2:
      var iterations = rangeB - rangeA;
      var currentValue = rangeA;
      for (i = 0; i < iterations; i++){
        array[i] = currentValue;
        currentValue++;
      }
      return array;
    case 3:
      iterations = Math.floor((rangeB - rangeA)/step) + 1;
      currentValue = rangeA;
      for (i = 0; i < iterations; i++){
        array[i] = currentValue;
        currentValue += step;
      }
      return array;
    default:
    return 'wrong number of arguments';
  }
  
}

function sum(array){
  //version 1
  /*var sum = 0;
  for (var i = 0; i < array.length; i++){
    sum += array[i];
  }
  return sum;*/
  
  //version 2
  var sum = 0;
  array.forEach(function(item){
    sum += item;
  })
  return sum;
}

function last(array){
  return array[array.length - 1];
}

function  excludeLast(array, number){
  var arrayAfter;
  switch(arguments.length){
    case 1:
      arrayAfter = array.slice(0, -1);
      break;
    case 2:
      arrayAfter = array.slice(0, -number)
      break;
  }
  return arrayAfter;
}


