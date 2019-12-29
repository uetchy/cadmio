import debugUtil from "debug";
import CSG from "@jscad/csg/api";

const { color } = CSG.color;
const { cube, sphere, cylinder } = CSG.primitives3d;
const { square, circle } = CSG.primitives2d;
const { linear_extrude } = CSG.extrusions;
const { union, difference, intersection } = CSG.booleanOps;
const { translate } = CSG.transformations;
const debug = debugUtil("jsxcad");

export function Union({ props, csgObject }) {
  return union(csgObject);
}

export function Difference({ props, csgObject }) {
  return difference(csgObject);
}

export function Intersection({ props, csgObject }) {
  return intersection(csgObject);
}

export function Color({ props, csgObject }) {
  return color(props.rgb, csgObject);
}

export function Cylinder({ props, csgObject }) {
  return cylinder(props);
}

export function Sphere({ props, csgObject }) {
  return sphere(props);
}

export function Cube({ props, csgObject }) {
  return cube(props);
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
