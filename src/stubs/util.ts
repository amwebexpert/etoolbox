// Stub for Node.js util module for browser compatibility
// httpsnippet uses util.debuglog which is not available in browser
// stream-browserify and other Node.js modules use util.inherits

export const debuglog = () => () => {};
export const deprecate = <T extends (...args: unknown[]) => unknown>(fn: T) => fn;
export const format = (...args: unknown[]) => args.join(" ");
export const inspect = (obj: unknown) => JSON.stringify(obj, null, 2);
export const isDeepStrictEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
export const promisify = <T extends (...args: unknown[]) => unknown>(fn: T) => fn;

// Node.js style prototype inheritance - required by stream-browserify and other modules
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inherits = (ctor: any, superCtor: any) => {
  if (superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
  }
};

export const types = {
  isArrayBuffer: (val: unknown): val is ArrayBuffer => val instanceof ArrayBuffer,
  isDate: (val: unknown): val is Date => val instanceof Date,
  isRegExp: (val: unknown): val is RegExp => val instanceof RegExp,
};

export default {
  debuglog,
  deprecate,
  format,
  inherits,
  inspect,
  isDeepStrictEqual,
  promisify,
  types,
};
