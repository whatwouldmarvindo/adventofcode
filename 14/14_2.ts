import {readSections} from '../common/io'

function parseInput(path: string) {
  const sections = readSections(path)
  return {
    template: sections[0].split(''),
    insertions: sections[1]
      .split('\n')
      .map((line) => line.split(' -> '))
      .map((parts) => ({match: parts[0], insert: parts[1]})),
  }
}

const {template, insertions} = parseInput('./input.txt')

// track all pairs together instead of each individually
const pairs: Record<string, bigint> = {}

// fill up all pairs
for (let i = 0; i < template.length - 1; i += 1) {
  const pair = template[i].toString() + template[i + 1].toString()
  pairs[pair] = (pairs[pair] || 0n) + 1n
}

function step() {
  // wait for all insertions to complete 
  let newPairs: Record<string, bigint> = {}

  // Apply each insertion
  for (const {insert, match} of insertions) {
    if (pairs[match]) {
      const insertCount = (pairs[match] || 0n)
      // console.log(`this is the match: ${match}`)
      // console.log(`this is the insert: ${insert}`)
      const newPair1 = match[0] + insert
      const newPair2 = insert + match[1]
      // console.log(`found the match ${match} and gonna insert ${insert}`)
      newPairs[newPair1] = (newPairs[newPair1] || 0n) + insertCount
      newPairs[newPair2] = (newPairs[newPair2] || 0n) + insertCount

      // remove it from the "old" template so that it doesn't count again
      pairs[match] = 0n

      // remove it from the "new" template so it doesn't show up more than it should
      // newPairs[match] = (newPairs[match] || 1n) - 1n
    }
  }

  // add new pairs to existing pairs
  for (const key of Object.keys(newPairs)) {
    pairs[key] = (pairs[key] || 0n) + newPairs[key]
  }
}

for (let i = 0; i < 40; i++) {
  step()
}

// calculate quantity of each element
let elementCounts: Record<string, bigint> = {}
for (const key of Object.keys(pairs)) {
  // declare elements
  const el1 = key[0]
  const el2 = key[1]
  const quantity = pairs[key]
  elementCounts[el1] = (elementCounts[el1] || 0n) + quantity
  elementCounts[el2] = (elementCounts[el2] || 0n) + quantity
}

// fix elements being counted twice (unless they are at the border of the template)
for (const key of Object.keys(elementCounts)) {
  const quantity = elementCounts[key]
  if (quantity % 2n) {
    elementCounts[key] = (elementCounts[key] + 1n) / 2n
  } else {
    elementCounts[key] = elementCounts[key] / 2n
  }
}

// sort elements by quantity
const elemCountArr = Array.from(Object.entries(elementCounts)).sort((e1, e2) => {
  const diff = e2[1] - e1[1]
  if (diff > 0) return 1
  if (diff < 0) return -1
  return 0
})

const mostCommon = elemCountArr[0]
const leastCommon = elemCountArr[elemCountArr.length - 1]

const result = mostCommon[1] - leastCommon[1]

console.log(`The most common element is ${mostCommon[0]} with ${mostCommon[1]} occurrences. The least common is ${leastCommon[0]} with ${leastCommon[1]} occurrences. The resulting difference is ${result}`)
