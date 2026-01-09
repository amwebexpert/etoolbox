/**
 * Node.js polyfills for browser compatibility
 *
 * Required by httpsnippet library used in the cURL converter feature.
 * This file must be imported FIRST in main.tsx before any other imports.
 */

// Polyfill for Node.js process object
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;

  win.process = win.process || {
    env: {},
    version: "",
    platform: "browser",
    browser: true,
    nextTick: (fn: () => void) => setTimeout(fn, 0),
  };

  win.global = win.global || window;
}

export {};
