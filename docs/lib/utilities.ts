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

export function munge(str: string) {
  return str
    .trim()
    .split("\n")
    .map(line => line.split(/\s+/).map(maybeNumber))
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

export function transpose(matrix: number[][]) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

/** return a new array without element `i` */
export function cut(arr: any[], i: number) {
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
}
