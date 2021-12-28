import {readLines} from '../common/io'

type Point = {
  height: number
  isInBasin: boolean
  up?: Point
  down?: Point
  left?: Point
  right?: Point
  x: number
  y: number
}

type Grid = (Point | undefined)[][]
type Basin = Point[]

const grid: Grid = readLines('input.txt').map((line, x) =>
  line.split('').map((numStr, y) => {
    const height = parseInt(numStr)
    // 9s don't count so exclude them
    if (height == 9) return undefined
    return {height, isInBasin: false, x, y}
  }),
)

function getPointAt(x: number, y: number): Point | undefined {
  const row = grid[x]
  return row ? row[y] : undefined
}

// link all Points in grid
for (const row of grid) {
  for (const point of row) {
    // skip all excluded points (9s)
    if (!point) continue

    point.up = getPointAt(point.x, point.y + 1)
    point.down = getPointAt(point.x, point.y - 1)
    point.right = getPointAt(point.x + 1, point.y)
    point.left = getPointAt(point.x - 1, point.y)
  }
}

function mapBasin(root: Point) {
  const basins = []

  function mapBasinAt(point: Point) {
    // Skip out-of-bounds, excluded points, and nodes that have already been processed.
    if (!point || point.isInBasin) return

    // Add to basin
    point.isInBasin = true
    basins.push(point)

    // Add each neighbor
    mapBasinAt(point.up)
    mapBasinAt(point.right)
    mapBasinAt(point.down)
    mapBasinAt(point.left)
  }

  // Kick off flood fill from the first point
  mapBasinAt(root)
  return basins
}

function findAllBasins(): Basin[] {
  const basins: Basin[] = []

  for (const row of grid) {
    for (const point of row) {
      // Skip all excluded points and the ones that are already in a basin
      if (!point || point.isInBasin) continue

      const basin = mapBasin(point)
      basins.push(basin)
    }
  }

  return basins
}

const basins = findAllBasins()

basins.sort((b1, b2) => b2.length - b1.length)

const result = basins[0].length * basins[1].length * basins[2].length

console.log(`Multiplying the three largest basins gives: ${result}`)
