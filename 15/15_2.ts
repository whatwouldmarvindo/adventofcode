import {readIntsGrid} from '../common/io'
import {dijikstra, getNodeAt, Grid, linkPoints, Node} from './common'

const gridNums = readIntsGrid('./input.txt')
const initialSize = gridNums.length
for (let y = 0; y < initialSize; y++) {
  const row1 = gridNums[y]
  for (let rY = 0; rY < 5; rY++) {
    const y2 = rY * initialSize + y
    const row2 = gridNums[y2] || (gridNums[y2] = [])
    for (let x = 0; x < initialSize; x++) {
      for (let rX = 0; rX < 5; rX++) {
        // Skip 0,0 (don't project into the source)
        if (rY === 0 && rX === 0) {
          continue
        }

        // Compute location to project to
        const x2 = rX * initialSize + x

        // Compute the new risk value
        const increase = rX + rY
        let newRisk = row1[x] + increase
        if (newRisk > 9) {
          newRisk -= 9
        }

        // Project the value
        row2[x2] = newRisk
      }
    }
  }
}

let grid: Grid = gridNums.map((row) =>
  row.map((risk) => ({
    risk,
    pathRisk: Infinity,
    visited: false,
    up: null,
    down: null,
    left: null,
    right: null,
    prev: null,
  })),
)

grid = linkPoints(grid)

const fastestWay = dijikstra(grid)
// const newGrid = input.map((row) => row.map((node) => node.risk).join(''))
// console.log(newGrid.join('\n'))

console.log(`The fastes way is ${fastestWay}`)
