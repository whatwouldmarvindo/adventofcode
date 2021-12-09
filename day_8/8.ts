const fs = require('fs');

const data: {patterns: string[]; ouputs: string[]}[] = fs
  .readFileSync('./test.txt', 'utf-8')
  .split('\n')
  .filter((l) => l.length > 0)
  .map((entry: string) => {
    const [patterns, outputs] = entry.split('|');
    return {
      patterns: patterns
        .trim()
        .split(' ')
        .map((pattern) => pattern.split('').sort()),
      outputs: outputs
        .trim()
        .split('')
        .map((output) => output.split('').sort().join('')),
    };
  });

  data.forEach(decode)

const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function decode(input) {
  // solve know letterns
  console.log(input)
  const pattern1 = input.patterns.find((p) => p.length === 2);
  const pattern4 = input.patterns.find((p) => p.length === 4);
  const pattern7 = input.patterns.find((p) => p.length === 3);

  const possibleMaps = {
    a: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && pattern7.includes(d)),
    b: allSegments.filter((d) => !pattern1.includes(d) && pattern4.includes(d) && !pattern7.includes(d)),
    c: allSegments.filter((d) => pattern1.includes(d) && pattern4.includes(d) && pattern7.includes(d)),
    d: allSegments.filter((d) => !pattern1.includes(d) && pattern4.includes(d) && !pattern7.includes(d)),
    e: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && !pattern7.includes(d)),
    f: allSegments.filter((d) => pattern1.includes(d) && pattern4.includes(d) && pattern7.includes(d)),
    g: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && !pattern7.includes(d)),
  };

  // Now that we've narrowed the input, we can brute force the rest...

  const possibilities = [];

  function bruteForceRemainingF(a, b, c, d, e) {
    for (const f of possibleMaps.f) {
      if (f !== a && f !== b && f !== c && f !== d && f !== e) {
        bruteForceRemainingG(a, b, c, d, e, f);
      }
    }
  }

  function bruteForceRemainingG(a, b, c, d, e, f) {
    for (const g of possibleMaps.g) {
      console.log();
    }
  }
  function bruteForceRemainingE(a, b, c, d) {
    for (const e of possibleMaps.e) {
      if (e !== a && e !== b && e !== c && e !== d) {
        bruteForceRemainingF(a, b, c, d, e);
      }
    }
  }
  function bruteForceRemainingD(a, b, c) {
    for (const d of possibleMaps.d) {
      if (d !== a && d !== b && d !== c) {
        bruteForceRemainingE(a, b, c, d);
      }
    }
  }
  function bruteForceRemainingC(a, b) {
    for (const c of possibleMaps.c) {
      if (c !== a && c !== b) {
        bruteForceRemainingD(a, b, c);
      }
    }
  }
  function bruteForceRemainingB(a) {
    for (const b of possibleMaps.b) {
      if (b !== a) {
        bruteForceRemainingC(a, b);
      }
    }
  }
  function bruteForceRemainingA() {
    for (const a of possibleMaps.a) {
      console.log('hi');
      bruteForceRemainingB(a);
    }
  }

  // Start brute forcing from digit "a"
  bruteForceRemainingA();

  // populate map so that every segment is mapped to the signal
}

// Part 2
// decode();
// Part 1
// console.log(`Unique digits: ${calcUniqueDigits(data)}`)

// we can easily identify number 1, 4, 7 and 8
// we also know which signal should trigger segment a
// we only need number 0, 2, 3, 5, 6 and 9 now

// 0 -> legth 6, same as number 1, has a something that is not in the other two with length 6 -> solved
// 2 -> length 5
// 5 -> length 5
// 3 -> length 5, has same as number 1  -> solved
// 6 -> length 6                        -> solved
// 9 -> length 6, has same as number 1  -> solved

// how can I distinguish 2 and 5?
//
