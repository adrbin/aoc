import { runPuzzles } from '../../utils.js';

function part1(input) {
  const coefficients = [-1, 0, 1];
  let cube = new Set();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === '#') {
        cube.add(`0,${i},${j}`, '#');
      }
    }
  }

  for (let turn = 1; turn <= 6; turn++) {
    const newCube = new Set();
    for (
      let i = -(turn + input.length + 1);
      i <= turn + input.length + 1;
      i++
    ) {
      for (
        let j = -(turn + input.length + 1);
        j <= turn + input.length + 1;
        j++
      ) {
        for (
          let k = -(turn + input.length + 1);
          k <= turn + input.length + 1;
          k++
        ) {
          let count = 0;
          for (const x of coefficients) {
            for (const y of coefficients) {
              for (const z of coefficients) {
                if (x === 0 && y === 0 && z === 0) {
                  continue;
                }
                if (cube.has(`${i + x},${j + y},${k + z}`)) {
                  count++;
                }
              }
            }
          }
          if (count === 3 || (count === 2 && cube.has(`${i},${j},${k}`))) {
            newCube.add(`${i},${j},${k}`, '#');
          }
        }
      }
    }

    cube = newCube;
  }

  return [...cube.values()].filter(value => value).length;
}

function part2(input) {
  const coefficients = [-1, 0, 1];
  let cube = new Set();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === '#') {
        cube.add(`0,0,${i},${j}`, '#');
      }
    }
  }

  for (let turn = 1; turn <= 6; turn++) {
    const newCube = new Set();
    for (
      let i = -(turn + input.length + 1);
      i <= turn + input.length + 1;
      i++
    ) {
      for (
        let j = -(turn + input.length + 1);
        j <= turn + input.length + 1;
        j++
      ) {
        for (
          let k = -(turn + input.length + 1);
          k <= turn + input.length + 1;
          k++
        ) {
          for (
            let l = -(turn + input.length + 1);
            l <= turn + input.length + 1;
            l++
          ) {
            let count = 0;
            for (const x of coefficients) {
              for (const y of coefficients) {
                for (const z of coefficients) {
                  for (const w of coefficients) {
                    if (x === 0 && y === 0 && z === 0 && w === 0) {
                      continue;
                    }
                    if (cube.has(`${i + x},${j + y},${k + z},${l + w}`)) {
                      count++;
                    }
                  }
                }
              }
            }
            if (
              count === 3 ||
              (count === 2 && cube.has(`${i},${j},${k},${l}`))
            ) {
              newCube.add(`${i},${j},${k},${l}`, '#');
            }
          }
        }
      }
    }

    cube = newCube;
  }

  return [...cube.values()].filter(value => value).length;
}

runPuzzles(part1, part2, 2020, 17);
