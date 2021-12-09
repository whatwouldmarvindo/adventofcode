const io = require('../common/io.ts');

type Input = { patterns: string[][], outputs: string[]}

const inputs: Input[] = io.readLines('input.txt').map((entry) => {
  const [patterns, outputs] = entry.split('|');
  return {
    patterns: patterns
      .trim()
      .split(' ')
      .map((pattern) => pattern.split('').sort()),
    outputs: outputs
      .trim()
      .split(' ')
      .map((output) => output.split('').sort().join('')),
  };
});

const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function decode(input) {
  console.log(input);

  // solve know letterns
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
