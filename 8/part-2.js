import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const grid = file
  .trim()
  .split("\n")
  .map((line) => line.split("").map((value) => parseInt(value)));

// Naive
// Ignore outer layer as its scenic value is always 0
let maxScenic = 0;
for (let x = 1; x < grid.length - 1; x++) {
  for (let y = 1; y < grid[0].length - 1; y++) {
    const height = grid[x][y];
    const distances = [0, 0, 0, 0];

    // Left
    for (let i = x - 1; i >= 0; i--) {
      distances[0]++;
      if (grid[i][y] >= height) {
        break;
      }
    }

    // Right
    for (let i = x + 1; i < grid.length; i++) {
      distances[1]++;
      if (grid[i][y] >= height) {
        break;
      }
    }

    // Top
    for (let i = y - 1; i >= 0; i--) {
      distances[2]++;
      if (grid[x][i] >= height) {
        break;
      }
    }

    // Bottom
    for (let i = y + 1; i < grid[0].length; i++) {
      distances[3]++;
      if (grid[x][i] >= height) {
        break;
      }
    }

    maxScenic = Math.max(
      maxScenic,
      distances.reduce((sum, value) => sum * value, 1)
    );
  }
}

console.log(maxScenic);
