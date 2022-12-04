import {data} from './01_common.ts'

const mostCaloriesCarried = data.reduce((prev, curr) => (curr < prev ? prev : curr))

console.log(mostCaloriesCarried)
