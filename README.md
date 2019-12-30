![Logo](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/banner.png)

## JSXCAD

JSXCAD is a new way of "writing" 3DCAD like a code. It offers familiar JSX syntax that is transpiling into [OpenJSCAD](https://github.com/jscad/OpenJSCAD.org).

![Conversion](https://raw.githubusercontent.com/uetchy/jsxcad/master/.github/conversion.png)

> **Users beware:** JSXCAD is under the alpha stage. Many APIs are missing. Please do not attempt to deploy it on your production environment unless you are fully aware of what it means.

## Install

Install `jsxcad` via npm.

```shell
npm install -g jsxcad
```

## Usage

Write your 3D model and save it as `logo.jsx`.

```jsx
import JSXCAD, {Union, Difference, Intersection, Cube, Sphere} from 'jsxcad';

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

Compile `logo.jsx` with `jsxcad` command.

```shell
jsxcad -f stl -o ./logo.stl ./logo.jsx
```

Now you got `logo.stl`!
