![Logo](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/banner.png)

## JSXCAD

JSXCAD provides JSX syntax for [OpenJSCAD](https://github.com/jscad/OpenJSCAD.org).

> **Users beware:** JSXCAD is under the alpha stage. Many APIs are missing and no tooling provided. Please do not attempt to deploy it on your production environment unless you are fully aware of what it means.

## Install

Install `jsxcad` via npm.

```shell
npm install jsxcad @jscad/cli
npm install -D @babel/core @babel/cli @babel/plugin-transform-react-jsx babel-plugin-add-module-exports @babel/plugin-transform-modules-commonjs
```

Add `.babelrc` for compiling JSX syntax.

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "JSXCAD.createElement",
        "pragmaFrag": "JSXCAD.Fragment"
      }
    ],
    "@babel/plugin-transform-modules-commonjs",
    "add-module-exports"
  ]
}
```

Write your 3D model and save it as `logo.jsx`.

```jsx
import JSXCAD, { Union, Difference, Intersection, Cube, Sphere } from "jsxcad";

const OpenJSCADLogo = (
  <>
    <Union>
      <Difference>
        <Cube size={3} center={true} />
        <Sphere r={2} center={true} />
      </Difference>
      <Intersection>
        <Sphere r={1.3} center={true} />
        <Cube size={2.1} center={true} />
      </Intersection>
    </Union>
  </>
);

export default JSXCAD.render(OpenJSCADLogo);
```

Compile `logo.jsx` with babel and save it as `logo.jscad`, then pass it to `openjscad` to generate .stl model.

```shell
node_modules/.bin/babel logo.jsx > logo.jscad
node_modules/.bin/openjscad logo.jscad
```

![Screenshot 2](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/conversion.png)
