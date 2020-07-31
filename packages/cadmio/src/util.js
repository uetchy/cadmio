import debugUtil from 'debug';

const debug = debugUtil('cadmio');

export function log(...obj) {
  debug(...obj);
}
