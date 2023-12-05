import {readGrid} from '../utils.ts'
import {findNumbers} from './03_1.ts'

const input = readGrid('./03_input')

function findGears(input: string[][]) {
  const gears: {i: number; j: number}[] = []
  input.forEach((line, i) => {
    line.forEach((point, j) => {
      if (point === '*') {
        gears.push({i, j})
      }
    })
  })
  return gears
}

const gears: {i: number; j: number}[] = findGears(input)
const numbers: {i: number; j: number; id: number}[] = findNumbers(input)

// console.log(gears)
// console.log(numbers)

function gearHasTwoAdjacentNumbers(
  {i, j}: {i: number; j: number},
  numbers: {i: number; j: number; id: number}[],
) {
  const adjacentNumbersId = new Set<number>()
  const possibleAdjacentNumberLocations = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ]
  possibleAdjacentNumberLocations.forEach(([posI, posJ]) => {
    const num = numbers.find((numm) => {
      return posI == numm.i && posJ == numm.j
    })
    if (num) {
      adjacentNumbersId.add(num?.id)
    }
  })

  let values = 1

  if (adjacentNumbersId.size == 2) {
    adjacentNumbersId.forEach((id) => {
      values = values * idToValue(id, numbers)
    })
    return values
  }
  
  return 0
}

// gearHasTwoAdjacentNumbers(gears[0], numbers)

const v = gears.map((gear) => {
  return gearHasTwoAdjacentNumbers(gear, numbers)
})

console.log(v)

function idToValue(id: number, numbers: {i: number; j: number; id: number}[]) {
  let index = numbers.findIndex((num) => num.id === id)
  if (index == -1) {
    console.log('not found')
    return 0
  }
  const value = []
  while (numbers[index].id === id) {
    value.push(input[numbers[index].i][numbers[index].j])
    index++
  }
  return Number(value.join(''))
}

console.log(v.reduce((acc, curr) => acc + curr, 0))