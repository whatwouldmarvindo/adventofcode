import {getMostCommonBit, loadBits, pivotBits} from './common'

let bits = loadBits('input.txt')

let oxyBits = bits
for (let i = 0; oxyBits.length > 1; i++) {
  const pivot = pivotBits(oxyBits)
  const mcbs = getMostCommonBit(pivot)

  // remove any input that don't match the MCB
  oxyBits = oxyBits.filter((bit) => bit[i] === mcbs[i])
}

let co2Bits = bits
for (let i = 0; co2Bits.length > 1; i++) {
  const pivot = pivotBits(co2Bits)
  const mcbs = getMostCommonBit(pivot)

  // remove any input that don't match the MCB
  co2Bits = co2Bits.filter((bit) => bit[i] !== mcbs[i])
}

const oxygen = parseInt(oxyBits[0].join(''), 2)
const co2 = parseInt(co2Bits[0].join(''), 2)

const life = oxygen * co2

console.log(`Day 3 Part2: Oxygen: ${oxygen} CO2=${co2} Life = [${life}]`)
