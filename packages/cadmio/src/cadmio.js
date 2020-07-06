import CSG from '@jscad/csg/api';
import { log } from './util';

const { color } = CSG.color;
const { circle, square, polygon, triangle } = CSG.primitives2d;
const {
  cube,
  sphere,
  cylinder,
  geodesicSphere,
  torus,
  polyhedron,
} = CSG.primitives3d;
const {
  extrudeInOrthonormalBasis,
  extrudeInPlane,
  extrude,
  linear_extrude,
  rotate_extrude,
  rotateExtrude,
  rectangular_extrude,
} = CSG.extrusions;
const { union, difference, intersection } = CSG.booleanOps;
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
  chain_hull,
} = CSG.transformations;

// export function LinearExtrude({props, csgObject}) {
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

// export function Color({props, csgObject}) {
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

export function Intersection({ csgObject }) {
  return () => intersection(csgObject);
}
// -> createElement(Intersection, null, createElement(Cube, {"size":3}))
//                     |-> polygon[]                   |-> polygon[]

export function Cube(props) {
  log('Cube', props);
  return () => cube(props);
}

function Func(props) {
  return createElement(Cube, props);
}

/**
 * fn: Functional component (props) => fnOrElement
 * element: Object {csgGenFn, props}
 */
function Cadmio() {
  function isCSG(obj) {
    return obj.hasOwnProperty('polygons');
  }

  function hasCSGRender(v) {
    return typeof v === 'function' && 'csgRender' in v.__proto__;
  }

  function isClass(v) {
    return typeof v === 'function' && 'render' in v.__proto__;
  }

  // convert functions into csg polygon object by invoking csgRender
  function render(element) {
    log(`render ${element.csgRender}`);

    const { csgRender, props } = element;

    // Aggregate children props and apply render method
    const childElements = props.children || [];
    const renderedChildren = childElements.map((childElement) => {
      return render(childElement, props);
    });

    log('rendered', renderedChildren, csgRender);

    // Generate and return CSG
    const { children: _, ...propsWithoutChildren } = props;
    return csgRender({
      csgObject: renderedChildren,
      props: propsWithoutChildren,
    });
  }

  function createElement(fn, props = {}, ...args) {
    log(`createElement ${fn}`);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];

    // const props = Object.assign({}, config);
    const children = rawChildren
      .filter((c) => c != null && c !== false)
      .map((child) => createElement(child, props));

    const csgFn = fn({ ...props });

    return { csgFn, props, children };
  }

  function finalize(fn, definitions = []) {
    log('finalize', fn);
    return {
      main: (props) => render(createElement(fn, props)),
      getParameterDefinitions: () => definitions,
    };
  }

  function Fragment() {}

  return {
    createElement,
    render,
    finalize,
    Fragment,
  };
}

export default Cadmio();
