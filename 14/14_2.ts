import {readSections} from '../common/io'

const inputSections = readSections('./input.txt')
const template = inputSections[0].split('')
const insertions = inputSections[1]
  .split('\n')
  .map((line) => line.split(' -> '))
  .map((parts) => ({match: parts[0], insert: parts[1]}))

// Set up pairs to count instead of each element individually
// This allows all similar matches to be computed at the same time
const pairCounts: Record<string, bigint> = Object.create(null)

// fill the template with initial state
for (let i = 0; i < template.length - 1; i++) {
  const pair = template[i] + template[i + 1]
  pairCounts[pair] = (pairCounts[pair] || 0n) + 1n
}

// Run steps
for (let i = 0; i < 40; i++) {
  const increases = Object.create(null)

  // Apply each insertion
  for (const {match, insert} of insertions) {
    // Compute how many to insert
    const insertCount = pairCounts[match] || 0n

    // Increment the 1st new match
    const newMatch1 = match.charAt(0) + insert
    increases[newMatch1] = (increases[newMatch1] || 0n) + insertCount

    // Increment the 2nd new match
    const newMatch2 = insert + match.charAt(1)
    increases[newMatch2] = (increases[newMatch2] || 0n) + insertCount

    // Remove the original match (it has been destroyed by splitting)
    pairCounts[match] = 0n
  }

  // Apply increases to the total
  for (let [key, increase] of Object.entries(increases)) {
    const hi = increase as bigint
    pairCounts[key] = (pairCounts[key] || 0n) + hi
  }
}

// Count elements
const elementCounts: Record<string, bigint> = Object.create(null)
for (const [pair, count] of Object.entries(pairCounts)) {
  // increase both elements
  const [elm1, elm2] = pair
  elementCounts[elm1] = (elementCounts[pair] || 0n) + count
  elementCounts[elm2] = (elementCounts[pair] || 0n) + count
}

// Divide counts by two, because each is duplicated in pairs
for (let [elem, count] of Object.entries(elementCounts)) {
  if (count) {
    // Increase odd by 1 to weird off-by-one bug
    if (count % 2n === 1n) {
      count++
    }

    // Compute correct amount
    elementCounts[elem] = count / 2n
  }
}

// Find most and least common
const elemCountArr = Array.from(Object.entries(elementCounts)).sort((e1, e2) => {
  const diff = e2[1] - e1[1]
  if (diff > 0) return 1
  if (diff < 0) return -1
  return 0
})

const mostCommon = elemCountArr[0]
const leastCommon = elemCountArr[elemCountArr.length - 1]

const result = mostCommon[1] - leastCommon[1]

console.log(
  `The most common element is ${mostCommon[0]} (Q=${mostCommon[1]}). Lest common element is ${leastCommon[0]} (Q=${leastCommon[1]}) \n The difference is ${result}`,
)
