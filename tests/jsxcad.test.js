import Cadmio from '../src/cadmio';
import path from 'path';
import fs from 'fs';

it('has JSX properties', () => {
  expect(Cadmio.Fragment).toBeDefined();
  expect(Cadmio.createElement).toBeDefined();
});
