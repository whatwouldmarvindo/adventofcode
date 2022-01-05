import {readIntsGrid} from '../common/io'

export type Grid = Node[][]

export type Node = {
  risk: number
  right?: Node | null
  left?: Node | null
  up?: Node | null
  down?: Node | null
  prev?: Node | null
  pathRisk: number
  visited: boolean
}

export function getNodeAt(x: number, y: number, grid: Grid): null | Node {
  const row = grid[x]
  if (row) {
    return row[y]
  } else {
    return null
  }
}

export function linkPoints(grid: Grid): Grid {
  for (let x = 0; x < grid.length; x++) {
    const row = grid[x]
    for (let y = 0; y < row.length; y++) {
      const node = row[y]
      node.up = getNodeAt(x, y - 1, grid)
      node.down = getNodeAt(x, y + 1, grid)
      node.right = getNodeAt(x + 1, y, grid)
      node.left = getNodeAt(x - 1, y, grid)
    }
  }
  return grid
}

export function dijikstra(grid: Grid): number {
  let current = grid[0][0]
  grid[0][0].pathRisk = 0

  current.prev = grid[0][0]

  function updatePathRisk(from: Node, to: Node) {
    const newRisk = from.pathRisk + to.risk
    if (newRisk < to.pathRisk) {
      to.pathRisk = newRisk
      to.prev = from
      to.visited = false
      nodeQueue.push(to)
    }
  }

  let nodeQueue: Node[] = []
  nodeQueue.push(grid[0][0])

  // Loop until all nodes have been visited
  while (nodeQueue.length > 0) {
    const current = nodeQueue[0]

    if (current.visited) {
      nodeQueue.shift()
      continue
    }

    if (current.up) {
      updatePathRisk(current, current.up)
    }
    if (current.down) {
      updatePathRisk(current, current.down)
    }
    if (current.left) {
      updatePathRisk(current, current.left)
    }
    if (current.right) {
      updatePathRisk(current, current.right)
    }

    current.visited = true
  }
  return grid[grid.length - 1][grid[0].length - 1].pathRisk
}
