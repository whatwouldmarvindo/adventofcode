import {readLines} from '../common/io'

type location = {i: number; j: number}

const data: number[][] = readLines('./input.txt').map((v) => {
  return v.split('').map((value) => parseInt(value))
})

let lowPos: location[] = [] // position of the low points

function getAdjacentCoordinates(data, {i, j}): location[] {
  const row = data[i]
  const adjacentLocations: location[] = []
  if (typeof row[j - 1] == 'number') adjacentLocations.push({j: j - 1, i: i})
  if (typeof row[j + 1] == 'number') adjacentLocations.push({j: j + 1, i: i})
  if (data[i - 1] && typeof data[i - 1][j] == 'number') adjacentLocations.push({j: j, i: i - 1})
  if (data[i + 1] && typeof data[i + 1][j] == 'number') adjacentLocations.push({j: j, i: i + 1})
  return adjacentLocations
}

for (let i = 0; i < data.length; i++) {
  const row = data[i]
  for (let j = 0; j < row.length; j++) {
    const value = row[j]
    let adjacentLocations = getAdjacentCoordinates(data, {i, j})
    if (adjacentLocations.length == adjacentLocations.filter(({i, j}) => data[i][j] > value).length) {
      lowPos.push({i: i, j: j})
    }
  }
}

function getBasinSize(currentBasin: location[]) {
  let newBasin: location[] = [...currentBasin]
  for (const position of currentBasin) {
    let adjacentPositions: location[] = getAdjacentCoordinates(data, position)
    const goodPos = adjacentPositions.filter(
      (v) => data[v.i][v.j] - 1 == data[position.i][position.j] && data[v.i][v.j] != 9,
    )
    newBasin = [...newBasin, ...getBasinSize(goodPos)]
  }
  return newBasin
}

let b = []
let allLocations: location[] = []

data.forEach((row, i) => {
  row.forEach((point, j) => {
    allLocations.push({i, j})
  })
})
let hi = allLocations.map((p) => getBasinSize([p]))
const uniqueNumbers: number[][] = hi.map((h) => h.map((p) => parseInt(`${p.i}${p.j}`)).sort((a, b) => a - b))
const basinSizes = uniqueNumbers.map((v) => new Set(v).size).sort((a, b) => b - a)

const sum = basinSizes[0] * basinSizes[1] * basinSizes[2]

console.log(`The three largest basins are: ${sum}`)
// console.log(`There are ${lows.length} low points`)
// 599256 -> too low