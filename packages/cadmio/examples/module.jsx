import Cadmio, {Union, Difference, Intersection, Cube, Sphere} from 'cadmio';

const First = () => (
  <Difference>
    <Cube size={3} center={true} />
    <Sphere r={2} center={true} />
  </Difference>
);

const OpenJSCADLogo = (
  <Union>
    <First />
    <Intersection>
      <Sphere r={1.3} center={true} />
      <Cube size={2.1} center={true} />
    </Intersection>
  </Union>
);

export default Cadmio.finalize(OpenJSCADLogo, []);
