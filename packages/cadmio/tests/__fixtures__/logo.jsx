import Cadmio, {
  Union,
  Difference,
  Intersection,
  Cube,
  Sphere,
} from '../../lib/cadmio';

const First = ({size}) => {
  console.log('First', size);
  return (
    <Intersection>
      <Cube size={size} center={true} />
      <Cube size={size} center={false} />
    </Intersection>
  );
};

const OpenJSCADLogo = () => {
  console.log('OpenJSCADLogo');
  return <First size={1} />;
};

export default Cadmio.finalize(OpenJSCADLogo, []);
