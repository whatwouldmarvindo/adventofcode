import {readInts} from '../common/io'

const input: string = readInts('./test.txt')

console.log(input)
let version = input.substring(0, 2)
let typeID = input.substring(3, 5)

version = '123'

console.log(`version: ${version}, id: ${typeID}`)


