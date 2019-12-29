import JSXCAD, {
  Union,
  Difference,
  Intersection,
  Cube,
  Sphere
} from "../jsxcad";

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
