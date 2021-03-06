![Logo](https://raw.githubusercontent.com/uetchy/cadmio/master/.github/banner.png)

# Cadmio

Cadmio is a new way of "writing" a 3D model. It offers familiar JSX syntax that is transpiling into [OpenJSCAD](https://github.com/jscad/OpenJSCAD.org).

> **Users beware:** Cadmio is under the alpha stage. Many APIs are missing. Please do not attempt to deploy it on your production environment unless you are fully aware of what it means.

## 📦 Install

Install `cadmio` via npm.

```shell
npm install -g cadmio
```

## 🚀 How to Use

![Workflow](https://raw.githubusercontent.com/uetchy/cadmio/master/.github/workflow.png)

Write your 3D model and save it as `logo.jsx`.

```jsx
import Cadmio, { Union, Difference, Intersection, Cube, Sphere } from 'cadmio';

const OpenJSCADLogo = (
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
);

const Logo = Cadmio.create(
  'Union',
  Cadmio.create('Difference'),
  Cadmio.create('Difference'),
);

export default Cadmio.render(Logo);
```

Compile `logo.jsx` with `cadmio` command.

```shell
cadmio -f stl -o ./logo.stl ./logo.jsx
```

Now you got `logo.stl`!

## Contributing

PRs welcome!

<p align="center">
<img src="https://raw.githubusercontent.com/uetchy/cadmio/master/.github/logo.png" width="200" />
</p>
