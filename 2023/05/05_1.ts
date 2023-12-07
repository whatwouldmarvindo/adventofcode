type Input = {
  seeds: number[]
  maps: Map[]
}
type Map = {
  source: string
  destination: string
  ranges: Range[]
}

type Range = {
  source: number
  destination: number
  length: number
}

function parseInput2(location: string): Input {
  const fileText = Deno.readTextFileSync(location)

  const s = fileText.split('\n')[0].split(': ')[1].split(' ').map(Number)
  const seeds: Number[] = []

  for (let i = 0; i < s.length; i += 2) {
    const element = s[i]
    const seedRange = s[i + 1]

    for (let j = 0; j < seedRange; j++) {
      seeds.push(element + j)
    }
  }

  const [_, ...rawMaps] = fileText.split('\n\n')
  const maps = rawMaps.map((chunk) => {
    const [category, ...lines] = chunk.split('\n')
    const [source, destination] = category.split(' ')[0].split('-to-')

    const ranges = lines
      .map((line) => line.split(' ').map(Number))
      .map(([source, destination, length]) => ({source, destination, length}))
    return {source, destination, ranges}
  })

  return {seeds, maps} as Input
}

function parseInput(location: string): Input {
  const fileText = Deno.readTextFileSync(location)

  const seeds = fileText.split('\n')[0].split(': ')[1].split(' ').map(Number)

  const [_, ...rawMaps] = fileText.split('\n\n')
  const maps = rawMaps.map((chunk) => {
    const [category, ...lines] = chunk.split('\n')
    const [source, destination] = category.split(' ')[0].split('-to-')

    const ranges = lines
      .map((line) => line.split(' ').map(Number))
      .map(([source, destination, length]) => ({source, destination, length}))
    return {source, destination, ranges}
  })

  return {seeds, maps} as Input
}

let currentlyLowestLocation = Infinity

function mapToDestination(
  category: string,
  value: number,
  input: Input,
): {category: string; value: number} {
  const map: Map = input.maps.find((map) => map.source === category)

  if (map === undefined) {
    if (value < currentlyLowestLocation) {
      currentlyLowestLocation = value
    }
    return {category, value}
  }

  const range: Range = map.ranges.find((range) => {
    const sourceEnd = range.destination + range.length - 1
    if (range.destination > value || sourceEnd < value) {
      return false
    } else {
      return true
    }
  })

  // no map found, mapping 1 to 1
  if (range === undefined) {
    return mapToDestination(map.destination, value, input)
  }

  const difference = value - range.destination
  const destinationValue = range.source + difference

  return mapToDestination(map.destination, destinationValue, input)
}

const input = parseInput('05_input')

// const smallesLocation = input.seeds
//   .map((seed) => mapToDestination('seed', seed, input))
//   .map((v) => v.value)
//   .reduce((prev, curr) => {
//     if (curr > prev) {
//       return prev
//     } else return curr
//   }, Infinity)

for (let i = 0; i < input.seeds.length; i += 2) {
  const progress = i / input.seeds.length
  console.log(`${progress * 100}%`)
  const seed = input.seeds[i]
  const range = input.seeds[i + 1]

  for (let j = 0; j < range; j++) {
    const actualSeed = seed + j
    mapToDestination('seed', actualSeed, input)
  }
}

console.log(currentlyLowestLocation)
