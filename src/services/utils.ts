import preval from 'preval.macro';

export function getBuildUTCDate() {
  return preval`module.exports = new Date().toISOString().split('T')[0];`;
}

export function getBuildUTCTimestamp() {
  return preval`module.exports = new Date().toISOString();`;
}

export const IS_DEV_MODE: boolean = process.env.NODE_ENV === 'development';

export const initConsole = () => {
  // https://github.com/recharts/recharts/issues/3615#issuecomment-1636923358
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
};
