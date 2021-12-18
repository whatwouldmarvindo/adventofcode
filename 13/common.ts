import {readSections} from '../common/io'
export type point = {x: number; y: number}
export type Data = {folds: [string, number][]; grid: point[]; width: point}
export type grid = Data['grid']
// ['y', 3]
export function parseInput(input: string[]): Data {
  const grid = parseGrid(input[0])
  return {
    grid: grid,
    folds: parseFolds(input[1]),
    width: getLength(grid),
  }
}

function parseFolds(input: string): [string, number][] {
  return input.split('\n').map((v) => {
    const number = parseInt(v.substring(v.indexOf('=') + 1))
    if (v.includes('y')) {
      return ['y', number]
    } else {
      return ['x', number]
    }
  })
}

export function fold({grid, folds}: Data) {
  const [fold, foldLine] = folds.shift()
  grid.map((point) => (point[fold] = point[fold] > foldLine ? 2 * foldLine - point[fold] : point[fold]))
}

export function removeDuplicatePoints(grid: grid): grid {
  grid = grid.map((v) => JSON.stringify(v)) as any
  const set = [...new Set(grid.map((v) => JSON.stringify(v) as any))]
  return set.map((v) => JSON.parse(v as any))
}

function parseGrid(grid: string): point[] {
  return grid
    .split('\n')
    .map((str) => str.split(',').map((v) => parseInt(v)))
    .map((v) => {
      return {x: v[0], y: v[1]}
    })
}

function getLength(grid: point[]): point {
  return grid.reduce(
    (sum, curr) => {
      sum.x = curr.x > sum.x ? curr.x : sum.x
      sum.y = curr.y > sum.y ? curr.y : sum.y
      return {x: sum.x + 1, y: sum.y + 1}
    },
    {x: 0, y: 0},
  )
}
