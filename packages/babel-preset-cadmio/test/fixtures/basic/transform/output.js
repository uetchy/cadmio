'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _cadmio = _interopRequireDefault(require('cadmio'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const Component = _cadmio.default.createElement(
  _cadmio.default.Fragment,
  null,
  _cadmio.default.createElement(_cadmio.Sphere, {
    r: 2,
    center: true,
  }),
);

var _default = _cadmio.default.render(Component);

exports.default = _default;
module.exports = exports.default;
