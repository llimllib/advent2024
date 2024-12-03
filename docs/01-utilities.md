# Day 1 - utilities

I haven't done AoC in javascript before, so let's start defining some utilities. I'll build on this utility library as we go.

Parse a string into a number if possible, with as few false positives as possible

```js echo
/** parse str to a number if possible, otherwise return it as a string */
function maybeNumber(str) {
  // Number("") is 0, so special-case return ""
  if (str == "") {
    return str
  }
  const val = +str
  return isNaN(val) ? str : val
}

display(maybeNumber(""))
display(maybeNumber("12"))
// if you use Number or parseFloat, this will parse as 12
display(maybeNumber("12bananas"))
display(maybeNumber("testing"))
```

Munge a file by splitting it into lines, then splitting those lines by spaces, then parsing anything into a number that can be parsed into a number

```js echo
/** split str into lines, split the lines by spaces, and convert
 * anything to a number that can possibly be a number
 **/
function munge(str) {
  return str
    .trim()
    .split("\n")
    .map(line => line.split(/\s+/).map(maybeNumber))
}

display(munge("1234   4576\n9999      12345\n12bananas\t5555"))
```

For a given day, run `munge` on the input file for that day. The files array is due to [a restriction](https://observablehq.com/framework/files) in observable framework that files must be statically defined, so it can figure out what to import.

_updated_: day 3, added the `parser` option so you can pass in a parser

```js echo
async function inputDay(dayN, options = {}) {
  const parser = options.parser || munge
  // in observable, files must be explicit strings. So let's allocate a list of
  // our 25 days' input files. Skip zero so we can say inputDay(1) on the first
  // day
  const inputs = [
    null,
    FileAttachment("./input/01.txt"),
    FileAttachment("./input/02.txt"),
    FileAttachment("./input/03.txt"),
    FileAttachment("./input/04.txt"),
    FileAttachment("./input/05.txt"),
    FileAttachment("./input/06.txt"),
    FileAttachment("./input/07.txt"),
    FileAttachment("./input/08.txt"),
    FileAttachment("./input/09.txt"),
    FileAttachment("./input/10.txt"),
    FileAttachment("./input/11.txt"),
    FileAttachment("./input/12.txt"),
    FileAttachment("./input/13.txt"),
    FileAttachment("./input/14.txt"),
    FileAttachment("./input/15.txt"),
    FileAttachment("./input/16.txt"),
    FileAttachment("./input/17.txt"),
    FileAttachment("./input/18.txt"),
    FileAttachment("./input/19.txt"),
    FileAttachment("./input/20.txt"),
    FileAttachment("./input/21.txt"),
    FileAttachment("./input/22.txt"),
    FileAttachment("./input/23.txt"),
    FileAttachment("./input/24.txt"),
    FileAttachment("./input/25.txt"),
  ]
  return parser(await inputs[dayN].text())
}

display(await inputDay(1))
```

A function to transpose a 2d-array

```js echo
// https://stackoverflow.com/a/46805290/42559
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]))
}

display(transpose(await inputDay(1)))
```
