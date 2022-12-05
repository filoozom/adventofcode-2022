import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const lines = file.split(/\r?\n/);

let maxes = [];
let current = 0;

const updateMaxes = () => {
  if (maxes.length < 3) {
    maxes.push(current);
    return;
  }

  if (current > maxes[0]) {
    maxes[0] = current;
  }

  maxes = maxes.sort();
};

for (const line of lines) {
  if (!line) {
    updateMaxes();
    current = 0;
    continue;
  }

  current += Number(line);
}

console.log(maxes.reduce((a, b) => a + b, 0));
