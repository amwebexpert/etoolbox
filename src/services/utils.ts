import preval from 'preval.macro';

export function getBuildUTCDate() {
  return preval`module.exports = new Date().toISOString().split('T')[0];`;
}

export function getBuildUTCTimestamp() {
  return preval`module.exports = new Date().toISOString();`;
}

export const IS_DEV_MODE: boolean = process.env.NODE_ENV === 'development';
