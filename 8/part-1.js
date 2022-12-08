import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const grid = file
  .trim()
  .split("\n")
  .map((line) => line.split("").map((value) => parseInt(value)));

const visible = new Set();

const checkLines = (fromRight) => {
  for (let x = 0; x < grid.length; x++) {
    let biggest = -1;
    let stop = false;

    for (let y = 0; y < grid[0].length && !stop; y++) {
      const index = fromRight ? grid[0].length - y - 1 : y;
      [biggest, stop] = check(x, index, biggest);
    }
  }
};

const checkColumns = (fromBottom) => {
  for (let y = 0; y < grid[0].length; y++) {
    let biggest = -1;
    let stop = false;

    for (let x = 0; x < grid.length && !stop; x++) {
      const index = fromBottom ? grid.length - x - 1 : x;
      [biggest, stop] = check(index, y, biggest);
    }
  }
};

const check = (x, y, biggest) => {
  const value = grid[x][y];

  if (value > biggest) {
    visible.add(`${x}-${y}`);
    biggest = value;
  }

  return [biggest, biggest === 9];
};

// Efficiently goes through all lines and columns
// Breaks as soon as a tree is too high
// Complexity is O(4 * m * n) where m = number of lines and n = number of columns
checkLines(false);
checkLines(true);
checkColumns(false);
checkColumns(true);

console.log(visible.size);
