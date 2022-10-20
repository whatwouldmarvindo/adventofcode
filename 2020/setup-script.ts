const year = prompt('Whatyear', '2020')
let day = prompt('What day?')

let folderString = ''
if (day!.length < 2) {
  folderString = `day0${day}`
}

console.log(`year ${year} and day ${day}`)

const folders = []

for (const dirEntry of Deno.readDirSync('.')) {
  if (dirEntry.isDirectory) {
    folders.push(dirEntry.name)
  }
}

if (folders.includes(day as string)) {
  throw new Error('Day is already there')
} else {
  Deno.mkdir(`./day${day}`)
}
