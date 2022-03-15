import {readLines} from '../common/io'

const input: [string, number][] = readLines('input.txt')
  .map((line) => line.split(' '))
  .map(([dir, number]) => [dir, parseInt(number)])

let position = {horizontal: 0, depth: 0}

for (const [dir, amount] of input) {
  if (dir == 'forward') {
    position.horizontal = position.horizontal + amount
  }
  if (dir == 'down') {
    position.depth = position.depth + amount
  }
  if (dir == 'up') {
    position.depth = position.depth - amount
  }
}

const result = position.depth * position.horizontal

console.log(`Day 2 Part1: Multiplying the final horizontal position ${position.horizontal} and depth position ${position.depth} results in ${result}`)
