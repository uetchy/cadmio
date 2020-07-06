"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;

var _debug = _interopRequireDefault(require("debug"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)('jsxcad');

function log(...obj) {
  debug(...obj);
}
//# sourceMappingURL=util.js.map