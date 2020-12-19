import { promises } from 'fs';
import * as path from 'path';

export async function readFile(path, separator) {
  return (await promises.readFile(path, 'utf8'))
    .split(separator)
    .filter(x => x);
}

export async function runPuzzles(
  puzzleA,
  puzzleB,
  year,
  number,
  separator = '\n'
) {
  const inputFile = path.join(year.toString(), number.toString(), 'input.txt');
  const input = await readFile(inputFile, separator);
  const puzzleAResult = puzzleA(input);
  console.log(`puzzle A result: ${puzzleAResult}`);
  const puzzleBResult = puzzleB(input);
  console.log(`puzzle B result: ${puzzleBResult}`);
}
