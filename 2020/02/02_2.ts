import {data} from './shared.ts'

let valid = 0

data.forEach(({letter, max, min, password}) => {
  const firstValid = password.charAt(min - 1) === letter
  const secondValid = password.charAt(max - 1) === letter
  if (firstValid && !secondValid) {
    valid++
  } else if (!firstValid && secondValid) {
    valid++
  }
})

console.log(`there are ${valid} valid passwords heree`)