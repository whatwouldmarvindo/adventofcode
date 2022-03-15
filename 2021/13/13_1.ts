import {readSections} from '../common/io'
import {Data, fold, grid, parseInput, removeDuplicatePoints} from './common'

const data = readSections('input.txt')
const input: Data = parseInput(data)


fold(input)
input.grid = removeDuplicatePoints(input.grid)
console.log(`After 1 fold there are exactly ${input.grid.length} points left`)
