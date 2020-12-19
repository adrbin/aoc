import { promises } from 'fs';
import * as path from 'path';

export async function readFile(path, separator) {
  return (await promises.readFile(path, 'utf8'))
    .split(separator)
    .filter(x => x);
}

export async function runPuzzles(part1, part2, year, number, separator = '\n') {
  const inputFile = path.join(year.toString(), number.toString(), 'input.txt');
  const input = await readFile(inputFile, separator);
  console.time('part 1');
  const part1Result = part1(input);
  console.timeEnd('part 1');
  console.log(`part 1 result: ${part1Result}`);
  console.time('part 2');
  const part2Result = part2(input);
  console.timeEnd('part 2');
  console.log(`part 2 result: ${part2Result}`);
}
