import debugUtil from 'debug';
import chalk from 'chalk';

const debug = debugUtil('jsxcad');

export function log(...obj) {
  debug(...obj);
}
