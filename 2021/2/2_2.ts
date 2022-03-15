import {parseInput} from './common'

const input = parseInput('input.txt')

let pos = {h: 0, d: 0, a: 0}

for (const [dir, amount] of input) {
  if (dir == 'down') {
    pos.a += amount
  }
  if (dir == 'up') {
    pos.a -= amount
  }
  if (dir == 'forward') {
    pos.h += amount
    pos.d += pos.a * amount
  }

}

const result = pos.h * pos.d
console.log(`Day2 Part 2 = ${result}`)