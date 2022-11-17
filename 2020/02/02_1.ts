import {data} from './shared.ts'

let validPasswords = 0

data.forEach(({letter, max, min, password}) => {
  const letterCount: number = password.split('').filter((l) => l === letter).length
  if (letterCount >= min && letterCount <= max) {
    validPasswords++
  }
})

console.log(`there are ${validPasswords} valid passwords`)
