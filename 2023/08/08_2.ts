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

const startingNodes = Object.keys(nodesMap).filter((x) => x.endsWith('A'))

const steppings = startingNodes.map((x) => {
  let current = x
  let steps = 0
  let dirIndex = 0

  while (!current.endsWith('Z')) {
    dirIndex = dirIndex % turnSequence.length
    let turn = turnSequence[dirIndex]
    current = nodesMap[current][turn]
    steps++
    dirIndex++
  }

  return steps
})

// what is gcd?
const gcd = (a: number, b: number): number => {
  if (b === 0) return a
  return gcd(b, a % b)
}

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b)
}
const totalSteps = steppings.reduce((acc, x) => lcm(acc, x), 1)
console.log(totalSteps)
