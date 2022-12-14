/**
 * this test suite was lifted directly from Ramda version 0.28.0 and ported to
 * Jest. source at: https://github.com/ramda/ramda/blob/master/test/curry.js
 *
 * thanks, Ramda! used under the library's MIT license
 *
 * removed a few tests, too … goal is parity with lodash/curry
 */
const curry = require('./simple-curry.js');

describe('curry', function () {
  test('curries a single value', function () {
    const curried = curry(function (a, b, c, d) {
      return (a + b * c) / d;
    });

    const partial = curried(12);
    expect(partial(3, 6, 2)).toEqual(15);
  });

  test('curries multiple values', function () {
    const curried = curry(function (a, b, c, d) {
      return (a + b * c) / d;
    });

    const part1 = curried(12, 3);
    expect(part1(6, 2)).toEqual(15);

    const part2 = curried(12, 3, 6);
    expect(part2(2)).toEqual(15);
  });

  test('preserves context', function () {
    const ctx = { x: 10 };
    const f = function (a, b) {
      return a + b * this.x;
    };
    const g = curry(f);

    expect(g.call(ctx, 2, 4)).toEqual(42);
    expect(g.call(ctx, 2).call(ctx, 4)).toEqual(42);
  });

  test('forwards extra arguments', function () {
    const f = function (a, b, c) {
      void c;
      return Array.prototype.slice.call(arguments);
    };
    const g = curry(f);

    expect(g(1, 2, 3)).toEqual([1, 2, 3]);
    expect(g(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1, 2)(3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2)(3, 4)).toEqual([1, 2, 3, 4]);
  });
});
