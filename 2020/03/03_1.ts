const input = Deno.readTextFileSync('./2020/03/03_test')
  .split('\n')
  .map((line) => line.split(''))

type Pointer = {
  column: number
  row: number
}

let trees = 0
let column = 0
let row = 0

while (row < input.length) {
  if (input[row][column] === '#') {
    trees++
  }
  console.log(`current row: ${row}, current column: ${column}, current place is ${input[row][column]} and ${trees} trees`)
  nextStep()
}

function nextStep() {
  row++
  column += 3
  const inputWidth = input[0].length
  if (column > inputWidth) {
    column = (column - inputWidth) - 1
  }
}
console.log(trees)

function draw() {
  const field = input.map((row) => row.join(''))
  console.log('hi')
  console.log(field.join('\n'))
}
