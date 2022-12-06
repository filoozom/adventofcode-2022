import { readFile } from "node:fs/promises";

const input = await readFile("./input", "utf-8");
let count = 0;

for (const line of input.split("\n")) {
  const [[a, b], [x, y]] = line
    .split(",")
    .map((element) => element.split("-").map((string) => parseInt(string)));

  if (
    (a <= x && b >= x) ||
    (a <= y && b >= y) ||
    (x <= a && y >= a) ||
    (x <= b && y >= b)
  ) {
    count++;
  }
}

console.log(count);
