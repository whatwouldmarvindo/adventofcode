import {readLines} from '../common/io'

const input = readLines('input.txt')

const pairs = {
  "{" : "}",
  "(" : ")",
  "<" : ">",
  "[" : "]"
}

let invalidChars: string[] = []


for(const line of input) {
  let expectedCharList: string[] = []
  for(const char of line) {
    if (pairs[char]) {
      expectedCharList.push(pairs[char])
    } else if (char == expectedCharList[expectedCharList.length - 1]) {
      expectedCharList.pop()
    } else {
      invalidChars.push(char)
      break
    }
  }
}



const sum = invalidChars.reduce((sum: number, char) => {
  switch (char) {
    case ")":
      return sum + 3
    case "]":
      return sum + 57
    case "}":
      return sum + 1197
    case ">":
      return sum + 25137
  }
}, 0)

console.log(`The syntax error score is ${sum}`)