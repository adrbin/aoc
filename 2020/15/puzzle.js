import { runPuzzles } from '../../utils.js';

function part1(input) {
  return findNumber(input, 2020);
}

function findNumber(input, targetTurn) {
  input = input.map(x => parseInt(x));
  let turn = 1;
  const numbers = new Array(targetTurn);
  for (const number of input.slice(0, input.length - 1)) {
    numbers[number] = turn++;
  }

  turn = input.length;
  let previousNumber = input[input.length - 1];
  while (turn < targetTurn) {
    if (previousNumber in numbers) {
      const previousOccurence = numbers[previousNumber];
      numbers[previousNumber] = turn;
      previousNumber = turn - previousOccurence;
    } else {
      numbers[previousNumber] = turn;
      previousNumber = 0;
    }
    turn++;
  }

  return previousNumber;
}

function part2(input) {
  return findNumber(input, 30000000);
}

runPuzzles(part1, part2, 2020, 15, ',');
