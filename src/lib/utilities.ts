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

/** find a symbol in a 2d array or throw */
export function find(map: string[][], symbol: string) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] == symbol) return [row, col]
    }
  }
  throw new Error(`Unable to find ${symbol}`)
}

type vector2d = [number, number]

/** distance for 2d vectors */
export function distance(v1: vector2d, v2: vector2d) {
  return Math.abs(v1[0] - v2[0]) + Math.abs(v1[1] - v2[1])
}

/** equality for 2d vectors */
export function eq(v1: vector2d, v2: vector2d) {
  return v1[0] == v2[0] && v1[1] == v2[1]
}

/** addition of 2d vectors */
export function add(pt: vector2d, dir: vector2d) {
  return [pt[0] + dir[0], pt[1] + dir[1]]
}

export class HashMap extends Map {
  constructor(entries: [[any, any]]) {
    super()
    entries?.map(([e, v]) => this.set(this.hash(e), v))
  }

  hash(key: any) {
    if (Array.isArray(key)) {
      return key.join(",")
    }
    return key
  }

  set(key: any, value: any) {
    return super.set(this.hash(key), value)
  }

  get(key: any) {
    return super.get(this.hash(key))
  }

  has(key: any) {
    return super.has(this.hash(key))
  }

  delete(key: any) {
    return super.delete(this.hash(key))
  }
}
