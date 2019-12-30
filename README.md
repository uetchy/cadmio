![Logo](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/banner.png)

## JSXCAD

JSXCAD is a new way of "writing" 3DCAD like a code. It offers familiar JSX syntax that is transpiling into [OpenJSCAD](https://github.com/jscad/OpenJSCAD.org).

![Conversion](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/conversion.png)

> **Users beware:** JSXCAD is under the alpha stage. Many APIs are missing and no tooling provided. Please do not attempt to deploy it on your production environment unless you are fully aware of what it means.

## Install

Install `jsxcad` via npm.

```shell
npm install -g jsxcad babel-preset-jsxcad
npm install -g @jscad/cli @babel/core @babel/cli
```

## Usage

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

Compile `logo.jsx` with babel and save it as `logo.jscad`.

```shell
babel --presets jsxcad logo.jsx > logo.jscad
```

You can also create `.babelrc` file to specify presets:

```json
{
  "presets": ["jsxcad"]
}
```

Then pass compiled `logo.jscad` to `openjscad` to generate .stl model.

```shell
openjscad logo.jscad
```
