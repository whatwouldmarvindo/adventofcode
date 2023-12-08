type line = {hand: string; bid: number; strength: number}
function parseInput(path: string): line[] {
  const fileText = Deno.readTextFileSync(path)
  const lines = fileText.split('\n')
  return lines.map((line) => {
    const [hand, bid] = line.split(' ')
    return {hand, bid: Number(bid), strength: 0}
  })
}

function compareCards(a: line, b: line): number {
  if (a.strength === 0) {
    evaluateCardStrength(a)
  }
  if (b.strength === 0) {
    evaluateCardStrength(b)
  }

  if (a.strength === b.strength) {
    return highCard(a.hand, b.hand)
  } else {
    return b.strength - a.strength
  }
}

function evaluateCardStrength(a: line) {
  const hand1 = a.hand
  const order = [isFiveOfAKind, isFourOfAKind, isFullHouse, isTriple, isTwoPair, isPair]
  const highScore = order.length + 1

  for (let i = 0; i < order.length; i++) {
    const f = order[i]
    if (f(hand1)) {
      a.strength = highScore - i
      console.log(`${hand1} is ${f.name}`)
      break
    }
  }

  // no match found, set strength to 1 which resembles highcard
  if (a.strength === 0) {
    a.strength = 1
  }
}

function isFiveOfAKind(hand: string): boolean {
  const cards = hand.split('')
  // sort cards so that J is always the last card
  sortJToBack(cards)
  const card = cards[0]
  return cards.every((c) => c === card || c === 'J')
}

function sortJToBack(cards: string[]) {
  cards.sort((a, b) => {
    if (a === 'J') {
      return 1
    } else if (b === 'J') {
      return -1
    } else {
      return 0
    }
  })
}

function isFourOfAKind(hand: string): boolean {
  if (hand.length === 3) {
    return false
  }
  const cards = hand.split('')
  sortJToBack(cards)
  const card = cards.shift()
  console.log(`card: ${card} and cards: ${cards}`)
  if (cards.filter((c) => c === card || c === 'J').length === 3) {
    return true
  } else {
    return isFourOfAKind(cards.join(''))
  }
}

function isFullHouse(hand: string): boolean {
  const triple = hasTriple(hand)
  if (!triple.status) {
    return false
  }

  const handWithoutTriple = hand
    .split('')
    .filter((c) => c !== triple.card && c !== 'J')
    .join('')

  return hasPair(handWithoutTriple).status
}

function isTwoPair(hand: string) {
  const firstPair = hasPair(hand)
  if (firstPair.status === false) {
    return false
  }

  // remove the first pair from the hand
  const cards = hand.split('').filter((c) => c !== firstPair.card && c !== 'J')

  return hasPair(cards.join('')).status
}

function hasPair(hand: string): {status: boolean; card?: string} {
  if (hand.length <= 1) {
    return {status: false}
  }
  const cards = hand.split('')
  sortJToBack(cards)
  const firstCard = cards.shift()
  if (cards.find((c) => c === firstCard || c === 'J')) {
    return {status: true, card: firstCard}
  } else {
    return hasPair(cards.join(''))
  }
}

function hasTriple(hand: string): {status: boolean; card?: string} {
  if (hand.length === 2) {
    return {status: false}
  }
  const cards = hand.split('')
  sortJToBack(cards)
  const firstCard = cards.shift()
  if (cards.filter((c) => c === firstCard || c === 'J').length === 2) {
    return {status: true, card: firstCard}
  } else {
    return hasTriple(cards.join(''))
  }
}

function isPair(hand: string): boolean {
  return hasPair(hand).status
}

function isTriple(hand: string): boolean {
  return hasTriple(hand).status
}

console.log(isTriple('J345A'))

function highCard(hand1: string, hand2: string) {
  const hands1 = hand1.split('')
  const hands2 = hand2.split('')

  const pointMap = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    J: 1,
  }

  for (let i = 0; i < hands1.length; i++) {
    const card1 = hands1[i]
    const card2 = hands2[i]
    if (pointMap[card1] > pointMap[card2]) {
      return -1
    } else if (pointMap[card1] < pointMap[card2]) {
      return 1
    }
  }
  return 0
}

const input = parseInput('./07_input')

const sorted = input.toSorted(compareCards)
console.log(sorted)

const res = sorted.toReversed().reduce((prev, cur, i) => {
  const total = cur.bid * (i + 1) + prev
  return total
}, 0)

console.log(res)
