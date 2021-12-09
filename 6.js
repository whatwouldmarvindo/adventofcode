const start = [
  2, 5, 2, 3, 5, 3, 5, 5, 4, 2, 1, 5, 5, 5, 5, 1, 2, 5, 1, 1, 1, 1, 1, 5, 5, 1, 5, 4, 3, 3, 1, 2, 4, 2, 4, 5, 4, 5, 5, 5, 4, 4, 1, 3, 5, 1, 2, 2, 4,
  2, 1, 1, 2, 1, 1, 4, 2, 1, 2, 1, 2, 1, 3, 3, 3, 5, 1, 1, 1, 3, 4, 4, 1, 3, 1, 5, 5, 1, 5, 3, 1, 5, 2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1, 4, 3, 5, 3,
  5, 5, 1, 4, 4, 2, 5, 1, 5, 5, 4, 5, 5, 1, 5, 4, 4, 1, 3, 4, 1, 2, 3, 2, 5, 1, 3, 1, 5, 5, 2, 2, 2, 1, 3, 3, 1, 1, 1, 4, 2, 5, 1, 2, 4, 4, 2, 5, 1,
  1, 3, 5, 4, 2, 1, 2, 5, 4, 1, 5, 5, 2, 4, 3, 5, 2, 4, 1, 4, 3, 5, 5, 3, 1, 5, 1, 3, 5, 1, 1, 1, 4, 2, 4, 4, 1, 1, 1, 1, 1, 3, 4, 5, 2, 3, 4, 5, 1,
  4, 1, 2, 3, 4, 2, 1, 4, 4, 2, 1, 5, 3, 4, 1, 1, 2, 2, 1, 5, 5, 2, 5, 1, 4, 4, 2, 1, 3, 1, 5, 5, 1, 4, 2, 2, 1, 1, 1, 5, 1, 3, 4, 1, 3, 3, 5, 3, 5,
  5, 3, 1, 4, 4, 1, 1, 1, 3, 3, 2, 3, 1, 1, 1, 5, 4, 2, 5, 3, 5, 4, 4, 5, 2, 3, 2, 5, 2, 1, 1, 1, 2, 1, 5, 3, 5, 1, 4, 1, 2, 1, 5, 3, 5, 2, 1, 3, 1,
  2, 4, 5, 3, 4, 3,
];

const test = [3, 4, 3, 1, 2];

function lanternfish(fishes, timespan) {
  for (let i = 0; i < timespan; i++) {
    for (let j = 0; j < fishes.length; j++) {
      fish = fishes[j];
      if (fish == 0) {
        fishes[j] = 6;
        // will be discounted after
        fishes.push(9);
      } else {
        fishes[j] = fish - 1;
      }
    }
    console.log(fishes.length);
  }
  // console.log(fishes)
  return fishes.length;
}

// console.log(lanternfish(start, 256));
// console.log(lanternfish(test, 2))

function lFish(fishes, timespan) {
  // create array where index correlates to the days in which a new fish will be born and the value to the amount
  const days = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let j = 0; j < fishes.length; j++) {
    const fish = fishes[j];
    days[fish]++;
  }
  // every day
  for (let i = 0; i < timespan; i++) {
    // fishes that are ready create a new one
    days[9] = days[0]
    // those fish will then be 
    days[7] += days[0]
    days.shift();
  }
  let result = 0;
  return days.reduce((prev, curr) => {
    return prev+curr
  })
}

const amount = lFish(start, 256);
console.log(amount)



// 1 -> 0 -> 6,8 ->  5,7