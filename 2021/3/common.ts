import {readLines} from '../common/io'

export type Bits = 0 | 1

export function loadBits(path) {
  return readLines(path).map((line) => line.split('').map((v) => (v == '1' ? 1 : 0)))
}

export function pivotBits(bits: Bits[][]): Bits[][] {
  const pivoted = []
  for (let i = 0; i < bits[0].length; i++) {
    pivoted.push(bits.map((l) => l[i]))
  }
  return pivoted
}

export function getMostCommonBit(pivot: Bits[][]): Bits[] {
  return pivot
  // Use an under/over Algo to find the most common bit
  // 1s increase the sum, 0s decrease it.
    .map((bit) =>
      bit.reduce((val, b) => {
        if (b === 1) return val + 1
        else return val - 1
      }, 0),
    )
    // If the value is positive then the MCB is 1 (or a tie)
    // if the value is negative then the MCB is 0
    .map((weight) => (weight >= 0 ? 1 : 0))
}
