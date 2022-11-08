module.exports = function curry(fn) {
  return function curried(...args) {
    const arity = fn.length === args.length;
    const overArity = fn.length < args.length;

    if (arity || overArity) {
      return fn.call(this, ...args);
    }

    return curried.bind(this, ...args);
  };
};
