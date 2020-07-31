#!/usr/bin/env node

import fs from 'fs';
import vm from 'vm';
import path from 'path';
import yargs from 'yargs';
import Module from 'module';
import * as babel from '@babel/core';
import { prepareOutput } from '@jscad/core/io/prepareOutput';
import { convertToBlob } from '@jscad/core/io/convertToBlob';
import { log } from './util';
import babelPresetCadmio from 'babel-preset-cadmio';

/**
 * Transpile JSX/ESM syntax into Node.js executable and obtain main function.
 */
function compileModule(modulePath) {
  const absoluteModulePath = path.resolve(process.cwd(), modulePath);
  const moduleRoot = path.dirname(absoluteModulePath);
  const code = fs.readFileSync(absoluteModulePath, 'utf8').trim();
  if (!code) return undefined;
  log('code', code);

  global.__filename = absoluteModulePath;
  global.__dirname = moduleRoot;

  log(global.__dirname);

  const module = new Module(global.__filename);
  module.filename = global.__filename;
  module.paths = Module._nodeModulePaths(global.__dirname);

  global.exports = module.exports;
  global.module = module;
  global.require = module.require.bind(module);

  const transpiledCode = babel.transform(code, {
    filename: global.__filename,
    presets: [babelPresetCadmio],
    plugins: [],
  }).code;
  log('transpiled code', transpiledCode);

  const cadmioModule = vm.runInThisContext(transpiledCode, {
    filename: global.__filename,
  });
  // log('main', cadmioModule.main());
  // log('getParameterDefinitions', cadmioModule.getParameterDefinitions().length);

  return cadmioModule;
}

async function convert(inputFile, outputFile, format) {
  const cadmioModule = compileModule(inputFile);
  const solidData = convertToBlob(
    prepareOutput(cadmioModule.main(), { format }),
  );
  fs.writeFileSync(outputFile, solidData.asBuffer());
}

const argv = yargs
  .scriptName('cadmio')
  .usage('Usage: $0 [options] <input>')
  .option('format', {
    alias: 'f',
    default: 'stl',
    choices: ['stl'],
    describe: 'Output format',
  })
  .option('output', {
    alias: 'o',
    describe: 'Output filename',
  })
  .help('h')
  .alias('h', 'help').argv;

if (argv._.length === 0) {
  console.log('No input specified. Run with --help to show help');
  process.exit(1);
}

const format = argv.format;
const inputFile = argv._[0];
const outputFile = argv.output || `${inputFile}.${format}`;

convert(inputFile, outputFile, format).catch((err) => {
  console.error('Error! ->', err.message);
});
