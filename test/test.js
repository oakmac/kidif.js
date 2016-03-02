const assert = require('assert');
const kidif = require('../kidif.js');

// Things that need to be tested:
// - default parse with no options
// - repeat titles that get turned into arrays
// - custom delimeter values
// - camelCase conversion
// - trim whitespace vs not

const ex1a = {
  alphaBravo: 'charlie delta\necho foxtrot'
};

const ex1b = {
  alphaBravo: 'one two\n   three four',
  sierraTango: 'VICTOR WHISKEY'
};

const ex1c = {
  alphaBravo: [
    'one two\n   three four',
    'fizzle'
  ],
  sierraTango: [
    'VICTOR WHISKEY',
    'MIKE   \nNOVEMBER'
  ],
  charlieDelta: 'Echo Golf'
};

const ex1Expected = [ex1a, ex1b, ex1c];
const ex1Input = kidif('test/ex1/*.test');

function testParsing() {
  it('defaults', function() {
    assert.deepEqual(ex1Expected, ex1Input);
  });

  // it('with options', function() {
  //   assert.deepEqual(z, z);
  // });
}

describe('kidif parsing', testParsing);
