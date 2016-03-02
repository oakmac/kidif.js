# kidif.js [![Build Status](https://travis-ci.org/oakmac/kidif.js.svg?branch=master)](https://travis-ci.org/oakmac/kidif.js)

> **K**idif **I**s **D**ata **I**n **F**iles

Kidif files are a simple way to store structured data when you need raw strings.

## Rationale

Most data formats (JSON, EDN, YAML, etc) have special escape rules for strings,
making them difficult to write and edit when you care about raw, unescaped text.

Kidif files are well-suited to things like examples or test cases where you want
to use existing text-management tools (git, file system, etc), but store raw
text in a structured way.

Kidif files are designed to be *simple*. The idea is simple, the format is
simple, and the parser is simple.

Kidif files are **not** a good data exchange format; please extract the data
from your kidif files and then transfer it over the wire using something
appropriate for your application.

Kidif files were inspired by how [chessboard.js stores examples].

## File Format

Kidif files consist of only three things: **comments**, **titles**, and **sections**

A quick example:

```
===== Foo

bar

===== Another Section

Hello world!

```

When parsed by kidif, this file will produce the following JavaScript Object
(show here as JSON):

```json
{
  "foo": "bar",
  "anotherSection": "Hello world!"
}
```

Notice that by default, the section titles are converted to camelCase and the
section text is trimmed of whitespace.

A file with repeat titles will convert each section into an array of strings.

```
NOTE: any text above the first title line will be ignored

===== Activity

Plan the hackathon

===== People

Charles

===== People

Lucy

```

Produces the following:

```json
{
  "lyrics": "Plan the hackathon",
  "sisters": [
    "Charles",
    "Lucy"
  ]
}
```

Note that the delimiter for title lines **must** start on the first character of
the line.

You can disable the camelCase titles, choose not to trim section whitespace, or
pass a custom delimiter by passing an options argument to the `kidif` function.
See the [Usage section] for more information.

## FAQ

#### Do Kidif files have an character escape sequence?

No. Any line of text that is not a comment or a title line will be treated
exactly as it is.

#### What should I use as a file extension?

Use a file extension that is appropriate for the content in the file. For
example, `basic.example` or `filters.test`.

#### What if I need more structure than kidif supports?

Then you probably shouldn't be using kidif files ;)

Serious answer: kidif files are _intentionally_ simple and limited in what they
support. They are not the solution for every use case.

#### Can I have comments in a kidif file?

Yes. Anything above the first title line will be ignored.

#### Does kidif execute asynchronously?

No. Everything in kidif happens synchronously. Kidif is designed to be used by
things like build and test scripts where simplicity trumps speed.

## Usage

Basic usage:

```js
var kidif = require('kidif');

// the first argument to kidif() should be a glob string; it is passed
// directly to the node-glob library: https://github.com/isaacs/node-glob
var myExamples = kidif('examples/*.example');

console.log(myExamples); // prints your examples
```

You can optionally pass a JavaScript Object as a second argument:

* `camelCaseTitles`: boolean, default is `true`, will convert titles to camelCase strings
* `delimiter`: string, default is `=====`, the string to use as a title delimiter
* `trimSections`: boolean, default is `true`, will trim all the whitespace in sections

An example with options:

```
~~~ Foo Bar



x
~~~ Fizzle
a

b

```

```js
var examples2 = kidif('examples2/*.example', {
  camelCaseTitles: false,
  delimiter: '~~~',
  trimSections: false
});
```

Will produce the following:

```json
{
  "Foo Bar": "\n\n\nx\n",
  "Fizzle": "a\n\nb\n\n"
}
```

## Development Setup

```sh
# install node_modules
npm install

# run the tests
npm test
```

## License

[ISC License]

[chessboard.js stores examples]:https://github.com/oakmac/chessboardjs/tree/master/examples
[Usage section]:#usage
[ISC License]:LICENSE.md
