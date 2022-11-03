import {inverse} from 'https://deno.land/std@0.160.0/fmt/colors.ts'
import * as path from 'https://deno.land/std@0.97.0/path/mod.ts'

const year = getYear()
const day = getDay()
const basePath = new URL('.', Deno.mainModule).pathname

function getYear(): string {
  let yearInput: string
  do {
    const y = prompt('What year?')
    yearInput = toString(y)
  } while (!validateYear(yearInput))
  return yearInput
}

function toString(a: string | null): string {
  if (a === null) {
    return ''
  } else return a
}

function getDay(): string {
  let dayInput: string
  do {
    dayInput = prompt('What day?') as string
  } while (!validateDay(dayInput))
  dayInput = dayInput.padStart(2, '0')
  return dayInput
}

function validateYear(year: string): boolean {
  const firstYear = 2015
  const lastYear = new Date().getFullYear()
  const yearNum = parseInt(year)

  try {
    isInRange(yearNum, firstYear, lastYear)
  } catch (error) {
    if (error === Err.notANumber) {
      console.log(`Invalid Input :( ${inverse(year)} should be a number but it's not`)
    }
    if (error === Err.outOfRange) {
      console.error(`Thats an invalid input. It should be between ${firstYear} and ${lastYear}`)
    }
    return false
  }

  return true
}

function validateDay(day: string): boolean {
  const firstDay = 1
  const lastDay = 24
  const dayNum = parseInt(day)

  if (!isInRange(dayNum, firstDay, lastDay)) {
    throw new Error(`${Err.outOfRange}`)
  }

  return true
}

function isInRange(toCheck: number, lowEnd: number, highEnd: number) {
  const inRange = toCheck >= lowEnd && toCheck <= highEnd
  try {
    if (!inRange) {
      console.error(`Thats an invalid input. It should be between ${lowEnd} and ${highEnd}`)
    }
    return inRange
  } catch {
    return false
  }
}

function existFolder(name: string, path: string) {
  const folders = []

  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) {
      folders.push(dirEntry.name)
    }
  }
  return folders.includes(name)
}

await createYearFolder()
await createDayFolder()

async function createDayFolder() {
  if (!existFolder(day!, `${basePath}/${year!}/${day!}`)) {
    await Deno.mkdir(day!)
  }
}

async function createYearFolder() {
  if (!existFolder(year!, '.')) {
    await Deno.mkdir(year!)
  }
}
// let day = prompt('What day?')

// let folderString = ''
// if (day!.length < 2) {
//   folderString = `day0${day}`
// }

// console.log(`year ${year} and day ${day}`)

// if (folders.includes(day as string)) {
//   throw new Error('Day is already there')
// } else {
//   Deno.mkdir(`./day${day}`)
// }

enum Err {
  outOfRange,
  notANumber,
}
