const map = new Map()
const object: any = new Object()

object.dieter = 123


map.delete("hi")

// console.log(map, object)

object.dieter = null
delete object["dieter"]

// console.log(object)

const set = new Set()
set.add("onur")
set.add("Onur")
console.log(set)