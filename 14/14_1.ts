import {Insertions, parseInput, Polymer} from './common'

function applyInsertion(polymer: Polymer, insertions: Insertions) {
  for (let curr = polymer; curr !== undefined && curr.next !== undefined; curr = curr.next) {
    // next element for comparison
    const next = curr.next

    // Match the first element
    const elem1Map = insertions[curr.element]
    if (!elem1Map) continue

    // Match the second Element
    const newElem = elem1Map[next.element]
    if (!newElem) continue

    // we matched to insert please
    curr.next = {
      element: newElem,
      next: next,
    }

    // Skip over the new element so that that we don't count it twice
    curr = curr.next
  }
}
function countElements(polymer: Polymer) {
  const counts: Record<string, number> = {}
  for (let curr = polymer; curr != undefined; curr = curr.next) {
    counts[curr.element] = (counts[curr.element] || 0) + 1
  }
  return counts
}

// parse Input
const {template, insertions} = parseInput('input.txt')

// run it 10 times
for (let i = 0; i < 40; i++) {
  applyInsertion(template, insertions)
}

// count elements
const elemCounts = countElements(template)

// Find most and least common
const elemCountsArr = Array.from(Object.entries(elemCounts)).sort((e1, e2) => e2[1] - e1[1])

const mostCommon = elemCountsArr[0]
const leastCommon = elemCountsArr[elemCountsArr.length - 1]
console.log(
  `The quantity difference between the most common and least common element is ${mostCommon[1] - leastCommon[1]}`,
)
