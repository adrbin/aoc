import { runPuzzles } from '../../utils.js';

function puzzleA(input) {
  const timestamp = parseInt(input[0]);
  const ids = {};
  const results = input[1]
    .split(',')
    .map(x => {
      const id = parseInt(x);
      if (!id) return;
      const nextTime = Math.ceil(timestamp / id) * id;
      const difference = nextTime - timestamp;
      ids[difference] = id;
      return difference;
    })
    .filter(x => x);

  const min = Math.min(...results);
  return min * ids[min];
}

function puzzleB(input) {
  const ids = input[1].split(',').map(x => parseInt(x));
  let step = ids[0];
  let timestamp = ids[0];
  for (let i = 1; i < ids.length; i++) {
    if (!ids[i]) continue;

    while ((timestamp + i) % ids[i] !== 0) {
      timestamp += step;
    }
    step *= ids[i];
  }

  return timestamp;
}

// eslint-disable-next-line no-unused-vars
function puzzleB2(input) {
  const ids = input[1].split(',').map(x => parseInt(x));
  // let i = ids[0];
  let i = Math.ceil(100000000000000 / ids[0]) * ids[0];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let success = true;
    for (let j = 1; j <= ids.length; j++) {
      if (!ids[j]) continue;

      if (i + (j % ids[j]) !== 0) {
        success = false;
        break;
      }
    }
    if (success) {
      return i;
    }
    i += ids[0];
  }
}

runPuzzles(puzzleA, puzzleB, 2020, 13);
