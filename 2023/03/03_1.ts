/*
  We get the location of the numbers of the schematic. Then we check for each digit of the number, if there's a symbol adjacent to it. If there is, we save the number for later. Adding up all the saved numbers should give us the wanted result
*/

import {readGrid} from '../utils.ts'

const input = readGrid('./03_input')

export function findNumbers(input: string[][]) {
  const numbersLocation: {i: number; j: number; id: number}[] = []
  let counter = 0
  input.forEach((line, i) => {
    let readingNumber = false
    line.forEach((point, j) => {
      if (isNumber(point)) {
        if (!readingNumber) {
          readingNumber = true
          counter++
        }
        numbersLocation.push({i, j, id: counter})
      } else {
        readingNumber = false
      }
    })
  })
  return numbersLocation
}

function isNumber(point: string) {
  return !isNaN(Number(point))
}

const numbers = findNumbers(input)

const numbersWithSymbols = numbers
  .filter((location) => {
    return hasAdjacentSymbol(location)
  })
  .map(({id}) => id)
  .filter(onlyUnique)

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index
}

const includedValues = []

let currentlyReading: number[] = []
let currentId = -1

numbers.forEach(({i, j, id}) => {
  if (numbersWithSymbols.includes(id)) {
    if (currentId == id) {
      currentlyReading.push(input[i][j])
    } else {
      includedValues.push(Number(currentlyReading.join('')))
      currentlyReading = [input[i][j]]
      currentId = id
    }
  }
})

includedValues.push(Number(currentlyReading.join('')))

const sum = includedValues.reduce((acc, curr) => acc + curr, 0)


function hasAdjacentSymbol({i, j, id}: {i: number; j: number; id: number}): boolean {
  const adjacentSymbols = [
    input[i - 1]?.[j - 1],
    input[i - 1]?.[j],
    input[i - 1]?.[j + 1],
    input[i]?.[j - 1],
    input[i]?.[j + 1],
    input[i + 1]?.[j - 1],
    input[i + 1]?.[j],
    input[i + 1]?.[j + 1],
  ]

  const hasAdjacentSymbol = adjacentSymbols.some(
    (symbol) => symbol && isSymbol(symbol) && !isNumber(symbol),
  )
  return hasAdjacentSymbol
}

function isSymbol(symbol: string) {
  return symbol !== '.'
}
