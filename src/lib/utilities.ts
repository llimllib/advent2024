//@ts-expect-error not sure how to make this accessible to ts
import { FileAttachment } from "observablehq:stdlib"

/** parse a string to a number if possible */
export function maybeNumber(str: string) {
  // +"" is 0, so special-case return ""
  if (str == "") {
    return str
  }
  const val = +str
  return isNaN(val) ? str : val
}

/** parse an input into lines and parse as many numbers as possible */
export function munge(str: string) {
  return str
    .trim()
    .split("\n")
    .map(line => line.split(/[\s:,=]+/).map(maybeNumber))
}

/** parse an input into a grid with one char per cell */
export function grid(input: string) {
  return input
    .trim()
    .split("\n")
    .map(row => row.split(""))
}

export async function inputDay(dayN: number, options: { parser?: any } = {}) {
  const parser = options.parser || munge
  // in observable, files must be explicit strings. So let's allocate a list of
  // our 25 days' input files
  const inputs = [
    null,
    FileAttachment("../input/01.txt"),
    FileAttachment("../input/02.txt"),
    FileAttachment("../input/03.txt"),
    FileAttachment("../input/04.txt"),
    FileAttachment("../input/05.txt"),
    FileAttachment("../input/06.txt"),
    FileAttachment("../input/07.txt"),
    FileAttachment("../input/08.txt"),
    FileAttachment("../input/09.txt"),
    FileAttachment("../input/10.txt"),
    FileAttachment("../input/11.txt"),
    FileAttachment("../input/12.txt"),
    FileAttachment("../input/13.txt"),
    FileAttachment("../input/14.txt"),
    FileAttachment("../input/15.txt"),
    FileAttachment("../input/16.txt"),
    FileAttachment("../input/17.txt"),
    FileAttachment("../input/18.txt"),
    FileAttachment("../input/19.txt"),
    FileAttachment("../input/20.txt"),
    FileAttachment("../input/21.txt"),
    FileAttachment("../input/22.txt"),
    FileAttachment("../input/23.txt"),
    FileAttachment("../input/24.txt"),
    FileAttachment("../input/25.txt"),
  ]
  return parser(await inputs[dayN].text())
}

export function transpose(matrix: any[][]) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

/** rotate the matrix 90* clockwise */
export function rotate(matrix: any[][]) {
  const width = matrix[0].length
  return transpose(matrix).map(row => row.map((_, col) => row[width - col - 1]))
}

/** convert a string to a matrix, rotate it, then join it back up */
export function rotateString(s: string) {
  return rotate(s.split("\n").map(row => row.split("")))
    .map(row => row.join(""))
    .join("\n")
}

/** return a new array without element `i` */
export function cut(arr: any[], i: number) {
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
}

/** clone a 2d matrix */
export function clone(m: any[][]) {
  return m.map(x => x.slice())
}

/** return an array of integers from start to end */
export function range(start: number, end: number) {
  if (end <= start) return []
  if (end === undefined) return [...Array(start)].map((_, i) => i)
  return [...Array(end - start)].map((_, i) => i + start)
}
