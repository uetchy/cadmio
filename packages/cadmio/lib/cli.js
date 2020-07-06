#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _vm = _interopRequireDefault(require("vm"));

var _path = _interopRequireDefault(require("path"));

var _module = _interopRequireDefault(require("module"));

var babel = _interopRequireWildcard(require("@babel/core"));

var _babelPresetJsxcad = _interopRequireDefault(require("babel-preset-jsxcad"));

var _prepareOutput = require("@jscad/core/io/prepareOutput");

var _convertToBlob = require("@jscad/core/io/convertToBlob");

var _yargs = _interopRequireDefault(require("yargs"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transpile JSX/ESM syntax into Node.js executable and obtain main function.
 */
function compileModule(modulePath) {
  const absoluteModulePath = _path.default.resolve(process.cwd(), modulePath);

  const moduleRoot = _path.default.dirname(absoluteModulePath);

  const code = _fs.default.readFileSync(absoluteModulePath, 'utf8').trim();

  if (!code) return undefined;
  (0, _util.log)('code', code);
  global.__filename = absoluteModulePath;
  global.__dirname = moduleRoot;
  (0, _util.log)(global.__dirname);
  const module = new _module.default(global.__filename);
  module.filename = global.__filename;
  module.paths = _module.default._nodeModulePaths(global.__dirname);
  global.exports = module.exports;
  global.module = module;
  global.require = module.require.bind(module);
  const transpiledCode = babel.transform(code, {
    filename: global.__filename,
    presets: [_babelPresetJsxcad.default],
    plugins: []
  }).code;
  (0, _util.log)('transpiled code', transpiledCode);

  const jsxcadModule = _vm.default.runInThisContext(transpiledCode, {
    filename: global.__filename
  }); // log('main', jsxcadModule.main());
  // log('getParameterDefinitions', jsxcadModule.getParameterDefinitions().length);


  return jsxcadModule;
}

async function convert(inputFile, outputFile, format) {
  const jsxcadModule = compileModule(inputFile);
  const solidData = (0, _convertToBlob.convertToBlob)((0, _prepareOutput.prepareOutput)(jsxcadModule.main(), {
    format
  }));

  _fs.default.writeFileSync(outputFile, solidData.asBuffer());
}

const argv = _yargs.default.scriptName('jsxcad').usage('Usage: $0 [options] <input>').option('format', {
  alias: 'f',
  default: 'stl',
  choices: ['stl'],
  describe: 'Output format'
}).option('output', {
  alias: 'o',
  describe: 'Output filename'
}).help('h').alias('h', 'help').argv;

if (argv._.length === 0) {
  console.log('No input specified. Run with --help to show help');
  process.exit(1);
}

const format = argv.format;
const inputFile = argv._[0];
const outputFile = argv.output || `${inputFile}.${format}`;
convert(inputFile, outputFile, format).catch(err => {
  console.error('Error! ->', err.message);
});
//# sourceMappingURL=cli.js.map