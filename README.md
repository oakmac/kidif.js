# kidif.js

**K**idif **I**s **D**ata **I**n **F**iles

Kidif files are a way to store structured data when you need raw strings.

## Tell me more!

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

Kidif files consist of only two things: **titles** and **sections**

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

TODO: show example using options

A file with repeat titles will convert each section into an array of strings.

```
NOTE: any text above the first title line will be ignored

===== Lyrics

The snow glows white on the mountain tonight, not a footprint to be seen.

===== Sisters

Anna

===== Sisters

Elsa

```

Produces the following:

```json
{
  "lyrics": "The snow glows white on the mountain tonight, not a footprint to be seen.",
  "sisters": [
    "Anna",
    "Elsa"
  ]
}
```

TODO: show an example showing escaped strings

## FAQ

#### What should I use as a file extension?

TODO: write this

#### What if I need more structure than kidif supports?

TODO: write this

#### Can I have comments in a kidif file?

Yes, anything above the first section title will be ignored and can be
considered space for a comment.

## Usage

Basic usage:

```js
var kidif = require('kidif');

// the first argument to kidif() should be a glob string; it is passed
// directly to the node-glob library: https://github.com/isaacs/node-glob
var myExamples = kidif.parse('examples/*.exmpl');

console.log(myExamples); // prints your examples
```

## API

TODO: expand on this section

* `camelCaseTitles`: boolean, default is `true`, will convert titles to `camelCase` strings
* `delimiter`: string, default is `=====`, the string to use as a title delimiter
* `trimSections`: boolean, default is `true`

## Development Setup

TODO: write this section

## License

[ISC License]

[chessboard.js stores examples]:https://github.com/oakmac/chessboardjs/tree/master/examples
[ISC License]:LICENSE.md
