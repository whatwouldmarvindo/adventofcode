import {mapped} from './04_1.ts'

const cards = mapped.map(([winning, my]) => {
  return {my, winning, instances: 1}
})

const hi = cards.map(({winning, my, instances}, i) => {
  const copiesWon = my.filter((num) => winning.includes(num)).length
  console.log(`Card ${i + 1} won ${copiesWon} times and has ${instances} copies`)

  for (let j = 1; j <= copiesWon; j++) {
    const card = cards[i + j]
    card.instances += instances
  }

  return {my: my, winning: winning, instances: instances}
})

const res = hi.reduce((a, b) => a + b.instances, 0)

console.log(res)
