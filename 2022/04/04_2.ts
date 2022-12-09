import {inputData, testData} from './04_common.ts'

// const data = testData
const data = inputData

let counter = 0
//overlap: 98:99--50:97
//50:60--50:60

data.forEach(([[fFirst, fSecond], [sFirst, sSecond]]) => {
  let o = false
  if (isBetween(fFirst, sFirst, sSecond)) {
    console.log('1 overlap: %s:%s--%s:%s', fFirst, fSecond, sFirst, sSecond)
    o = true
  }
  if (isBetween(fSecond, sFirst, sSecond)) {
    console.log('2 overlap: %s:%s--%s:%s', fFirst, fSecond, sFirst, sSecond)
    o = true
  }
  if (isBetween(sFirst, fFirst, fSecond)) {
    console.log('3 overlap: %s:%s--%s:%s', fFirst, fSecond, sFirst, sSecond)
    o = true
  }
  if (isBetween(sSecond, fFirst, fSecond)) {
    console.log('4 overlap: %s:%s--%s:%s', fFirst, fSecond, sFirst, sSecond)
    o = true
  }
  if (o) {
    counter++
  }
})
// 17:17 -> 16:20
// 1

function isBetween(n: number, start: number, end: number) {
  if (n >= start && n <= end) {
    return true
  } else return false
}

console.log(counter)

//943 too high
//911 too high
//673 too low