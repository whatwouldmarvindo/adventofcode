import {readIntsGrid} from '../common/io'

const octs = readIntsGrid('input.txt')
type grid = {xLength: number; yLength: number; octs: number[][]}
const input = {
  xLength: octs.length,
  yLength: octs[0].length,
  octs,
}
const vectors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 1],
]

function incrementOct(grid, x, y) {
  if (x >= 0 && x < grid.xLength) {
    if (y >= 0 && y < grid.yLength) {
      if (octs[x][y] !== 0) {
        octs[x][y]++
      }
    }
  }
}

function doStep(grid: grid): number {
  // gets returned later
  let flashes = 0

  // increment all by 1
  for (let x = 0; x < grid.xLength; x++) {
    for (let y = 0; y < grid.yLength; y++) {
      grid.octs[x][y]++
    }
  }

  // process until step is done
  let flashed
  do {
    flashed = false

    // Tick each octupus
    for (let x = 0; x < grid.xLength; x++) {
      for (let y = 0; y < grid.yLength; y++) {
        // check if octopus is ready to flash
        if (grid.octs[x][y] > 9) {
          // reset to 0
          grid.octs[x][y] = 0

          // let it flash
          for (let [vi, vj] of vectors) {
            incrementOct(grid, x + vi, y + vj)
          }

          // mark as flashed so that we can continue the step
          flashed = true
          flashes++
        }
      }
    }
  } while (flashed)
  return flashes
}

let totalFlashes = 0
for (let step = 0; step < 100; step++) {
  totalFlashes += doStep(input)
  // console.log(`${doStep(input)} flashes in step ${step + 1}`)
  if (step == 1) {
    console.log(input.octs[0])
  }
}

console.log(`Total flashes after 100 steps is ${totalFlashes}`)
// 1921 => too high
// 1613 => yeah right!!
