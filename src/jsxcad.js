import debugUtil from "debug";
import CSG from "@jscad/csg/api";

const { color } = CSG.color;
const { circle, square, polygon, triangle } = CSG.primitives2d;
const {
  cube,
  sphere,
  cylinder,
  geodesicSphere,
  torus,
  polyhedron
} = CSG.primitives3d;
const {
  extrudeInOrthonormalBasis,
  extrudeInPlane,
  extrude,
  linear_extrude,
  rotate_extrude,
  rotateExtrude,
  rectangular_extrude
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
  chain_hull
} = CSG.transformations;
const debug = debugUtil("jsxcad");

/**
 * An properties for LinearExtrude
 * @typedef {Object<string, any>} LinearExtrudeProps
 * @property {number} [height=1]
 * @property {number} [slices=10]
 * @property {number} [twist=0]
 * @property {boolean} [center=false]
 */

/**
 * LinearExtrude
 * @param {{props: LinearExtrudeProps, csgObject: any}}
 */
export function LinearExtrude({ props, csgObject }) {
  return linear_extrude(props, csgObject);
}

export function Translate({ props, csgObject }) {
  return translate(props, csgObject);
}

export function Union({ csgObject }) {
  return union(csgObject);
}

export function Difference({ csgObject }) {
  return difference(csgObject);
}

export function Intersection({ csgObject }) {
  return intersection(csgObject);
}

export function Color({ props, csgObject }) {
  return color(props.rgb, csgObject);
}

export function Cylinder({ props }) {
  return cylinder(props);
}

export function Sphere({ props }) {
  return sphere(props);
}

export function Cube({ props }) {
  return cube(props);
}

export function Square({ props }) {
  return square(props);
}

export function Circle({ props }) {
  return circle(props);
}

function JSXCAD() {
  function render(element) {
    const { operatorFn, props } = element;
    debug("render", operatorFn, props);

    const childElements = props.children || [];
    const renderedChildren = childElements.map(childElement => {
      return render(childElement);
    });

    const { children: _, ...operatorProps } = props;
    return operatorFn({ csgObject: renderedChildren, props: operatorProps });
  }

  function createElement(operatorFn, config, ...args) {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];
    props.children = rawChildren.filter(c => c != null && c !== false);
    return { operatorFn, props };
  }

  function Fragment({ props, csgObject }) {
    return { main: params => csgObject, getParameterDefinitions: () => [] };
  }

  return {
    render,
    createElement,
    Fragment
  };
}

export default JSXCAD();
