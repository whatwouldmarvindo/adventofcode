import {dayData, grab, testData} from './05_common.ts'

const {instructions, towers}: dayData = testData

instructions.forEach(({amount, from, to}) => {
  const crates = grab(amount, towers[from])
  towers[to] = putOneByOne(crates, towers[to])
})

function putOneByOne(crates: string[], tower: string[]) {
  return (tower = [...crates, ...tower])
}
let result = ''

for (const key in towers) {
  if (Object.prototype.hasOwnProperty.call(towers, key)) {
    const tower = towers[key]
    result += tower[0]
  }
}

