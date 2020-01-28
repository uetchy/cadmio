import Cadmio, {
  Union,
  Difference,
  Intersection,
  Cube,
  Sphere,
  Translate,
} from 'cadmio';

const $fn = 100;

const build_bottom_plate = false;
const enclosure_height = 6.8;
// enclosure_height = 15;
const enclosure_size = 54;
const enclosure_thickness = 2;
const enclosure_radius = 5;
const inner_radius = 2.5;
const clasp_top_radius = 3;
const clasp_bottom_radius = 3.3;
const clasp_top_thickness = 0.8;
const clasp_bottom_thickness = 1.0;
const clasp_height = 1.2; // PCB thickness should be 1.2mm
const screw_size = 1.7;

const inner_size = enclosure_size - enclosure_thickness * 2;
const etct = enclosure_thickness - clasp_top_thickness;
const etbct = enclosure_thickness - clasp_bottom_thickness;
const center_position = enclosure_size / 2;
const spacer = 20;
const clasp_long = 10;
const clasp_short = 6.5;

const RoundedCube = (x, y, z, radius = 0) => (
  <Translate scale={[radius, radius, 0]}>
    <Minkowski>
      <Cube x={x - radius * 2} y={y - radius * 2} z={z - 0.1} />
      <Cylinder r={radius} h={0.1} />
    </Minkowski>
  </Translate>
);

const Enclosure = () => (
  <Difference>
    <RoundedCube
      x={enclosure_size}
      y={enclosure_size}
      z={enclosure_height}
      radius={enclosure_radius}
    />
    <Translate x={enclosure_thickness} y={enclosure_thickness} z={-1}>
      <RoundedCube
        x={inner_size}
        y={inner_size}
        z={enclosure_height + 2}
        radius={inner_radius}
        $fn={4}
      />
    </Translate>
  </Difference>
);

const Screw = () => {
  const top = 5;
  const width = 4;
  const z = 3.8;
  const distance_from_edge = 9;

  return (
    <Translate x={center_position} y={center_position - width / 2}>
      <For of={[-1, 2, 1]}>
        {(i) => (
          <For of={[-1, 2, 1]}>
            {(j) => (
              <Translate
                x={(inner_size / 2 - top / 2) * i}
                y={(inner_size / 2 - distance_from_edge - 2) * j}
                z={enclosure_height - z}>
                <Difference>
                  <Union>
                    <Translate scale={[(i * top) / 2 / 2, width / 2, z / 2]}>
                      <Cube x={top / 2} y={width} z={z} center={true} />
                    </Translate>
                    <Translate scale={[0, 2, 0]}>
                      <Cylinder h={z} r={width / 2} />
                    </Translate>
                  </Union>
                  <Translate scale={[0, 2, -1]}>
                    <Cylinder h={z + 2} r={screw_size / 2} />
                  </Translate>
                </Difference>
              </Translate>
            )}
          </For>
        )}
      </For>
    </Translate>
  );
};

const Main = () => {
  return (
    difference() {
      union() {
        enclosure();
        difference() {
          color("yellow") translate([etct, etct, enclosure_height])
            roundedCube(
              enclosure_size - etct * 2,
              enclosure_size - etct * 2,
              clasp_height,
              radius = clasp_top_radius);
          translate([2, 2, enclosure_height - 1])
            roundedCube(
              inner_size,
              inner_size,
              clasp_height + 2,
              radius = inner_radius, $fn=4);
          translate([
            center_position,
            center_position,
            enclosure_height + 0.7]) {
            cube([
                enclosure_size + spacer,
                enclosure_size-2-10*2,
                clasp_height
              ],
              center=true);
            cube([
                enclosure_size - 2 - clasp_short * 2,
                enclosure_size + spacer,
                clasp_height
              ],
              center=true);
          }
        }
        screw();
      }
      if (!build_bottom_plate) {
        translate([0, 0, 0]) difference() { // bottom clasp
           color("red") translate([etbct, etbct, -1])
            roundedCube(
              enclosure_size - etbct * 2,
              enclosure_size - etbct * 2,
              clasp_height+1,
              radius=clasp_bottom_radius);
          translate([ // centerize
            center_position,
            center_position,
            clasp_height/2]) {
            cube([
                enclosure_size + spacer,
                enclosure_size - enclosure_thickness - clasp_long*2,
                clasp_height
              ],
              center=true);
            cube([
                enclosure_size - enclosure_thickness - clasp_short*2,
                enclosure_size + spacer,
                clasp_height
              ],
              center=true);
          }
        }
        translate([9,-1,-1]) cube([6,4,2]); // opener hole
      }
      
    }
    
    if (build_bottom_plate) {
      translate([0, 0, 0]) color("blue") difference() { // bottom clasp
        translate([enclosure_thickness, enclosure_thickness, 0])
          cube([
            inner_size,
            inner_size,
            clasp_height
          ]);
      }
    }
  )
}

export default Cadmio.render(Main);
