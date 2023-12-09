type NodesMap = Record<string, {left: string; right: string}>
const path = '/Users/marvinbeckert/dev/adventofcode/2023/08/08_input'

const file = Deno.readTextFileSync(path)
const [turnSequence, , ...nodes] = file.split('\n')

const nodesMap: Record<string, {L: string; R: string}> = nodes.reduce((acc, x) => {
  const self = x.substring(0, 3)
  const L = x.substring(7, 10)
  const R = x.substring(12, 15)

  acc = {...acc, [self]: {L, R}}

  return acc
}, {})

let current = 'AAA'
let steps = 0
let dirIndex = 0

while (current !== 'ZZZ') {
  dirIndex = dirIndex % turnSequence.length
  let turn = turnSequence[dirIndex]
  current = nodesMap[current][turn]
  steps++
  dirIndex++
}

console.log(steps)
