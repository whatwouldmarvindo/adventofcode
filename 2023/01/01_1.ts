import {readLines} from '../utils.ts'

const lines = readLines('./01_input')
function matchOverlap(input, re) {
  var r = [], m;
  // Prevent infinite loops
  if (!re.global) re = new RegExp(
      re.source, (re+'').split('/').pop() + 'g'
  );
  while (m = re.exec(input)) {
      re.lastIndex -= m[0].length - 1;
      r.push(m[0]);
  }
  return r;
}

// Part 1

const onlyNumbers = /\d/g
// Also match overlapping numbers with positive lookahead
const numbersOrDigits = /\d|one|two|three|four|five|six|seven|eight|nine/g

const firstAndLastNumberOfLine = lines
  .map((line) => {
    console.log(line)
    const numbers = matchOverlap(line, numbersOrDigits) as string[]
    let [first, last] = [numbers[0], numbers[numbers?.length - 1]]
    if (first.length > 1) {
      first = wordToNumber(first)
    }
    if (last.length > 1) {
      last = wordToNumber(last)
    }
    console.log(first, last)
    return Number(`${first}${last}`)
  })
  .reduce((acc, curr) => {
    return acc + curr
  }, 0)

console.log(firstAndLastNumberOfLine)

function wordToNumber(word: any): string {
  const matcher: any = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  return matcher[word].toString()
}
