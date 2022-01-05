import {readSections} from '../common/io'
import {Data, fold, getLength, parseInput, removeDuplicatePoints} from './common'

const input: Data = parseInput(readSections('input.txt'))

function printPaper({grid}: Data) {
  const width = getLength(grid)
  let paper = []
  for (let i = 0; i <= width.y; i++) {
    paper.push([])
    for (let j = 0; j < width.x; j++) {
      paper[i].push('*')
    }
  }


  console.log(paper)
  console.log(getLength(input.grid))

  for (const {x, y} of grid) {
    paper[y][x] = '#'
  }
}

while (input.folds.length > 0) {
  fold(input)
}

input.grid = removeDuplicatePoints(input.grid)

console.log(input)


printPaper(input)
