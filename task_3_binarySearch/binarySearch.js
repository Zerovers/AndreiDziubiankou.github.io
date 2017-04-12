var array = [-25, -15, -12, -3, 0, 1, 4, 6, 19, 32, 56];

console.log('with recursion');
console.log('binarySearch([' + array + '], -25): ' + binarySearch(array, -25));
console.log('binarySearch([' + array + '], 56): ' + binarySearch(array, 56));
console.log('binarySearch([' + array + '], 0): ' + binarySearch(array, 0));
console.log('binarySearch([' + array + '], -12): ' + binarySearch(array, -12));
console.log('binarySearch([' + array + '], -19): ' + binarySearch(array, -19));
console.log('binarySearch([' + array + '], 12): ' + binarySearch(array, 12));
console.log('binarySearch([' + array + '], 19): ' + binarySearch(array, 19));
console.log('binarySearch([], 0): ' + binarySearch([], 0));

console.log('with while');
console.log('binarySearch([' + array + '], -25): ' + binarySearchWhile(array, -25));
console.log('binarySearch([' + array + '], 56): ' + binarySearchWhile(array, 56));
console.log('binarySearch([' + array + '], 0): ' + binarySearchWhile(array, 0));
console.log('binarySearch([' + array + '], -12): ' + binarySearchWhile(array, -12));
console.log('binarySearch([' + array + '], -19): ' + binarySearchWhile(array, -19));
console.log('binarySearch([' + array + '], 12): ' + binarySearchWhile(array, 12));
console.log('binarySearch([' + array + '], 19): ' + binarySearchWhile(array, 19));
console.log('binarySearch([], 0): ' + binarySearch([], 0));
;
function binarySearch(array, key, start, end){
<<<<<<< HEAD
  if (end < start){
=======
  //with while
  /*var low = 0;
    var high = array.length - 1;
    while (low <= high){
      var mid = parseInt((low + high) / 2);
      var midValue = array[mid];

      if (midValue < key)
          low = mid + 1;
      else if (midValue > key)
          high = mid - 1;
      else
          return mid;
    }
    return -1; */

  //with recursion
   if (end < start){
>>>>>>> bcb1d286a1f34480d850c9246425c6804fd285e0
    return -1
  }
  var low = start || 0;
  var high = end || array.length - 1;
  var mid = parseInt((low + high) / 2);
  var midValue = array[mid];
  if (key == midValue) {
        return mid;
    } else if (key < midValue){
        return binarySearch(array, key, low, mid - 1);
    } else {
        return binarySearch(array, key, mid + 1, high);
    }
<<<<<<< HEAD
=======
}

function binarySearchWhile(array, key){
  var low = 0;
  var high = array.length - 1;
  while (low <= high){
    var mid = parseInt((low + high) / 2);
    var midValue = array[mid];

    if (midValue < key)
        low = mid + 1;
    else if (midValue > key)
        high = mid - 1;
    else
        return mid;
  }
  return -1;
>>>>>>> bcb1d286a1f34480d850c9246425c6804fd285e0
}

function binarySearchWhile(array, key){
  var low = 0;
  var high = array.length - 1;
  while (low <= high){
    var mid = parseInt((low + high) / 2);
    var midValue = array[mid];

    if (midValue < key)
        low = mid + 1;
    else if (midValue > key)
        high = mid - 1;
    else
        return mid;
  }
  return -1;
}
