const assert = require('assert');
const kidif = require('../kidif.js');

// Things that need to be tested:
// - trim whitespace vs not

//------------------------------------------------------------------------------
// Test 1 - Defaults
//------------------------------------------------------------------------------

const test1a = {
  alphaBravo: 'charlie delta\necho foxtrot'
};

const test1b = {
  alphaBravo: 'one two\n   three four',
  sierraTango: 'VICTOR WHISKEY'
};

const test1c = {
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

const test1Expected = [test1a, test1b, test1c];
const test1Input = kidif('test/tests1/*.test');

//------------------------------------------------------------------------------
// Test 2 - Custom Delimiter
//------------------------------------------------------------------------------

const test2a = {
  alphaBravo: 'charlie delta\necho foxtrot'
};

const test2b = {
  alphaBravo: 'one two\n   three four',
  sierraTango: 'VICTOR WHISKEY'
};

const test2Expected = [test2a, test2b];
const test2Input = kidif('test/tests2/*.test', {delimiter: '~~~~'});

//------------------------------------------------------------------------------
// Test 3 - Camel Case Conversion
//------------------------------------------------------------------------------

const test3a = {
  'Alpha Bravo': 'charlie delta\necho foxtrot'
};

const test3b = {
  'Alpha Bravo': 'one two\n   three four',
  'Sierra Tango': 'VICTOR WHISKEY'
};

const test3Expected = [test3a, test3b];
const test3Input = kidif('test/tests3/*.test', {camelCaseTitles: false});

//------------------------------------------------------------------------------
// Test 4 - Trimming whitespace
//------------------------------------------------------------------------------

const test4a = {
  alphaBravo: '\ncharlie delta\necho foxtrot\n\n'
};

const test4b = {
  alphaBravo: '\none two\n   three four\n\n\n\n\n\n\n',
  sierraTango: '\nVICTOR WHISKEY\n\n'
};

const test4Expected = [test4a, test4b];
const test4Input = kidif('test/tests4/*.test', {trimSections: false});

//------------------------------------------------------------------------------
// Test 5 - All options at once
//------------------------------------------------------------------------------

const test5a = {
  'Foo Bar': '\n\n\nx\n',
  'Fizzle': 'a\n\nb\n\n'
};

const test5Expected = [test5a];
const test5Input = kidif('test/tests5/*.test', {
  camelCaseTitles: false,
  delimiter: '~~~',
  trimSections: false
});

//------------------------------------------------------------------------------
// Run the tests
//------------------------------------------------------------------------------

function testParsing() {
  it('defaults', function() {
    assert.deepEqual(test1Expected, test1Input);
  });

  it('custom delimiter', function() {
    assert.deepEqual(test2Expected, test2Input);
  });

  it('camelCase conversion', function() {
    assert.deepEqual(test3Expected, test3Input);
  });

  it('trim section whitespace', function() {
    assert.deepEqual(test4Expected, test4Input);
  });

  it('all options at once', function() {
    assert.deepEqual(test5Expected, test5Input);
  });
}

describe('kidif parsing', testParsing);
