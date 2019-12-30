import JSXCAD from '../src/jsxcad';
import path from 'path';
import fs from 'fs';

it('has JSX properties', () => {
  expect(JSXCAD.Fragment).toBeDefined();
  expect(JSXCAD.createElement).toBeDefined();
});
