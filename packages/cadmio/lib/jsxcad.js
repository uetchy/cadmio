"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intersection = Intersection;
exports.Cube = Cube;
exports.default = void 0;

var _api = _interopRequireDefault(require("@jscad/csg/api"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  color
} = _api.default.color;
const {
  circle,
  square,
  polygon,
  triangle
} = _api.default.primitives2d;
const {
  cube,
  sphere,
  cylinder,
  geodesicSphere,
  torus,
  polyhedron
} = _api.default.primitives3d;
const {
  extrudeInOrthonormalBasis,
  extrudeInPlane,
  extrude,
  linear_extrude,
  rotate_extrude,
  rotateExtrude,
  rectangular_extrude
} = _api.default.extrusions;
const {
  union,
  difference,
  intersection
} = _api.default.booleanOps;
const {
  translate,
  center,
  scale,
  rotate,
  transform,
  mirror,
  expand,
  contract,
  minkowski,
  hull,
  chain_hull
} = _api.default.transformations; // export function LinearExtrude({props, csgObject}) {
//   return linear_extrude(props, csgObject);
// }
// export function Translate({props, csgObject}) {
//   return translate(props, csgObject);
// }
// export function Union({csgObject}) {
//   return union(csgObject);
// }
// export function Difference({csgObject}) {
//   return difference(csgObject);
// }

function Intersection({
  csgObject
}) {
  return () => intersection(csgObject);
} // export function Color({props, csgObject}) {
//   return color(props.rgb, csgObject);
// }
// export function Cylinder({props}) {
//   return cylinder(props);
// }
// export function Sphere({props}) {
//   return sphere(props);
// }
// export function GeodesicSphere({props}) {
//   return geodesicSphere(props);
// }
// export function Square({props}) {
//   return square(props);
// }
// export function Circle({props}) {
//   return circle(props);
// }


function Cube(props) {
  (0, _util.log)('Cube', props);
  return () => cube(props);
}
/**
 * fn: Functional component (props) => fnOrElement
 * element: Object {csgGenFn, props}
 */


function JSXCAD() {
  function isCSG(obj) {
    return obj.hasOwnProperty('polygons');
  }

  function hasCSGRender(v) {
    return typeof v === 'function' && 'csgRender' in v.__proto__;
  }

  function isClass(v) {
    return typeof v === 'function' && 'render' in v.__proto__;
  } // convert functions into csg polygon object by invoking csgRender


  function render(element, config = {}) {
    (0, _util.log)(`render ${element.csgRender}`);
    const {
      csgRender,
      props
    } = element; // Aggregate children props and apply render method

    const childElements = props.children || [];
    const renderedChildren = childElements.map(childElement => {
      return render(childElement, props);
    });
    (0, _util.log)('rendered', renderedChildren, csgRender); // Generate and return CSG

    const {
      children: _,
      ...propsWithoutChildren
    } = props;
    return csgRender({
      csgObject: renderedChildren,
      props: propsWithoutChildren
    });
  }

  function createElement(fn, props = {}, ...args) {
    (0, _util.log)(`createElement ${fn}`);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : []; // const props = Object.assign({}, config);

    const children = rawChildren.filter(c => c != null && c !== false).map(child => createElement(child, config));
    const csgObject = fn({ ...props,
      csgObject: children
    });
    return csgObject;
  }

  function finalize(fn, definitions = []) {
    (0, _util.log)('finalize', fn);
    return {
      main: props => createElement(fn, props),
      getParameterDefinitions: () => definitions
    };
  }

  function Fragment() {}

  return {
    createElement,
    render,
    finalize,
    Fragment
  };
}

var _default = JSXCAD();

exports.default = _default;
//# sourceMappingURL=jsxcad.js.map