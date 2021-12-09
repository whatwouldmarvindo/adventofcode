export const io = require('../common/io')

const data: number[][] = io.readLines('./input.txt').map((v) => {
  return v.split('').map(value => parseInt(value))
})

let lows: number[] = []
console.log(data[0])

for (let i = 0; i < data.length; i++) {
  const row = data[i]
  for (let j = 0; j < row.length; j++) {
    const value = row[j]

    const adjacentLocations = []
    if (typeof row[j - 1] == 'number') adjacentLocations.push(row[j - 1])
    if (typeof row[j + 1] == 'number') adjacentLocations.push(row[j + 1])
    if (data[i - 1] && typeof data[i - 1][j] == 'number') adjacentLocations.push(data[i - 1][j])
    if (data[i + 1] && typeof data[i + 1][j] == 'number') adjacentLocations.push(data[i + 1][j])

    if (adjacentLocations.length == adjacentLocations.filter((v) => v > value).length) {
      lows.push(value + 1)
    }
  }
}

const riskSum = lows.reduce((sum, v) => sum + v, 0)

console.log(`The sum of all risks is ${riskSum}`)