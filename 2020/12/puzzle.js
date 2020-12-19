import { runPuzzles } from '../../utils.js';

function part1(input) {
  const directions = ['E', 'S', 'W', 'N'];
  let x = 0,
    y = 0,
    direction = 0;
  for (const line of input) {
    const order = line[0];
    const value = parseInt(line.substring(1));

    const makeMove = dir => {
      switch (dir) {
        case 'N':
          y += value;
          return;
        case 'S':
          y -= value;
          return;
        case 'W':
          x -= value;
          return;
        case 'E':
          x += value;
          return;
        case 'L':
          direction = mod(direction - value / 90, 4);
          return;
        case 'R':
          direction = mod(direction + value / 90, 4);
          return;
        case 'F':
          makeMove(directions[direction]);
          return;
        default:
          console.log(`Something wrong: ${direction}`);
      }
    };

    makeMove(order);
  }

  return Math.abs(x) + Math.abs(y);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function part2(input) {
  let x = 0,
    y = 0,
    wx = 10,
    wy = 1;
  for (const line of input) {
    const order = line[0];
    const value = parseInt(line.substring(1));

    switch (order) {
      case 'N':
        wy += value;
        break;
      case 'S':
        wy -= value;
        break;
      case 'W':
        wx -= value;
        break;
      case 'E':
        wx += value;
        break;
      case 'L':
        for (let i = 0; i < value; i += 90) {
          [wx, wy] = [-wy, wx];
        }
        break;
      case 'R':
        for (let i = 0; i < value; i += 90) {
          [wx, wy] = [wy, -wx];
        }
        break;
      case 'F':
        x += wx * value;
        y += wy * value;
        break;
      default:
        console.log(`Something wrong: ${order}`);
    }
  }

  return Math.abs(x) + Math.abs(y);
}

runPuzzles(part1, part2, 2020, 12);
