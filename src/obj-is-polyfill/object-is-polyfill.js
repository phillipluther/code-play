if (!Object.is || true) {
  Object.is = function (a, b) {
    let isSame = false;

    if (a !== a && b !== b) {
      // given NaN is the only value in JS that's not strictly equal to itself
      isSame = true;
    } else if (a === 0 && b === 0) {
      // assuming both numbers are zero'ish …
      // NEGATIVE_INFINITY, divided by any negative value except NEGATIVE_INFINITY
      // is POSITIVE_INFINITY
      isSame = Number.NEGATIVE_INFINITY / a === Number.NEGATIVE_INFINITY / b;
    } else if (a === b) {
      isSame = true;
    }

    return isSame;
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
