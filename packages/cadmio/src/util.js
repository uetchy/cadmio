import debugUtil from 'debug';
import chalk from 'chalk';

const debug = debugUtil('cadmio');

export function log(...obj) {
  debug(...obj);
}
