import { runPuzzles } from '../../utils.js';

function puzzleA(input) {
  let oldArray = input;
  let newArray = input;
  do {
    oldArray = newArray;
    newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
      newArray[i] = [];
      for (let j = 0; j < oldArray[0].length; j++) {
        let nearSeatsCount = 0;
        if (oldArray[i - 1] && oldArray[i - 1][j - 1] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i - 1] && oldArray[i - 1][j] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i - 1] && oldArray[i - 1][j + 1] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i][j - 1] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i][j + 1] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i + 1] && oldArray[i + 1][j - 1] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i + 1] && oldArray[i + 1][j] === '#') {
          nearSeatsCount++;
        }
        if (oldArray[i + 1] && oldArray[i + 1][j + 1] === '#') {
          nearSeatsCount++;
        }

        if (nearSeatsCount === 0 && ['L', '#'].includes(oldArray[i][j])) {
          newArray[i][j] = '#';
        } else if (nearSeatsCount >= 4 && oldArray[i][j] === '#') {
          newArray[i][j] = 'L';
        } else {
          newArray[i][j] = oldArray[i][j];
        }
      }
    }
  } while (!compareArrays(oldArray, newArray));

  return count(newArray, '#');
}

function compareArrays(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[0].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function count(array, symbol) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      if (array[i][j] === symbol) {
        sum++;
      }
    }
  }

  return sum;
}

function puzzleB(input) {
  let oldArray = input;
  let newArray = input;
  do {
    oldArray = newArray;
    newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
      newArray[i] = [];
      for (let j = 0; j < oldArray[0].length; j++) {
        let nearSeatsCount = 0;
        if (isOccupied(oldArray, i, j, -1, -1)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, -1, 0)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, -1, 1)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, 0, -1)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, 0, 1)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, 1, -1)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, 1, 0)) {
          nearSeatsCount++;
        }
        if (isOccupied(oldArray, i, j, 1, 1)) {
          nearSeatsCount++;
        }

        if (nearSeatsCount === 0 && ['L', '#'].includes(oldArray[i][j])) {
          newArray[i][j] = '#';
        } else if (nearSeatsCount >= 5 && oldArray[i][j] === '#') {
          newArray[i][j] = 'L';
        } else {
          newArray[i][j] = oldArray[i][j];
        }
      }
    }
  } while (!compareArrays(oldArray, newArray));

  return count(newArray, '#');
}

function isOccupied(array, y, x, dy, dx) {
  x += dx;
  y += dy;
  while (array[y] && array[y][x]) {
    if (array[y][x] === '#') {
      return true;
    }
    if (array[y][x] === 'L') {
      return false;
    }
    x += dx;
    y += dy;
  }

  return false;
}

runPuzzles(puzzleA, puzzleB, 2020, 11);
