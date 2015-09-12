import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel';
import autoprefixer from '../src';

const fixturesDir = path.join(__dirname, 'fixtures');

function caseReader(fixtureDirName) {
  const fixtureDir = path.join(fixturesDir, fixtureDirName);

  const actualPath = path.join(fixtureDir, 'actual.js');
  const expectedPath = path.join(fixtureDir, 'expected.js');

  return {
    actual() {
      return transformFileSync(actualPath, {
        plugins: [autoprefixer]
      }).code.toString().trim();
    },

    expected() {
      return fs.readFileSync(expectedPath).toString().trim();
    }
  }
}

describe('finds and process `autoprefix` call', () => {
  fs.readdirSync(fixturesDir).forEach((name) => {
    it(`should ${name}`, () => {
      const read = caseReader(name);

      assert.equal(read.actual(), read.expected());
    });
  });
})
