import {readIntsGrid} from '../common/io'

type Grid = Node[][]
type Node = {
  risk: number
  x: number
  y: number
  right?: Node
  left?: Node
  up?: Node
  down?: Node
  pathRisk: number
  prev?: Node
  visited: boolean
}

function getNodeAt(x: number, y: number): undefined | Node {
  const row = grid[x]
  if (row) {
    return row[y]
  } else {
    return undefined
  }
}

// fill grid
const grid: Grid = readIntsGrid('./input.txt').map((row, x) =>
  row.map((pos, y) => ({risk: pos, y, x, visited: false, pathRisk: Infinity})),
)

// Link points and initialize dijikstra algorythm
for (const row of grid) {
  for (const node of row) {
    node.up = getNodeAt(node.x, node.y - 1)
    node.down = getNodeAt(node.x, node.y + 1)
    node.right = getNodeAt(node.x + 1, node.y)
    node.left = getNodeAt(node.x - 1, node.y)
  }
}
// starting point has costs of 0
let current = grid[0][0]
grid[0][0].pathRisk = 0

current.prev = grid[0][0]
const exit = grid[grid.length - 1][grid[0].length - 1]

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
let prev = grid[0][0]
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
  current.prev = prev
  prev = nodeQueue.shift()
}

console.log(`The shortest way distance to the distance is ${exit.pathRisk}`)
// 740 -> too high :(
