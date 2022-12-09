import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const visited = new Set(["0,0"]);
const head = [0, 0];
const tail = [0, 0];

const go = {
  U: (coords) => coords[1]++,
  D: (coords) => coords[1]--,
  L: (coords) => coords[0]--,
  R: (coords) => coords[0]++,
};

const isAdjacent = (a, b) => {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
};

for (const line of file.split("\n")) {
  const [direction, countString] = line.split(" ");
  const count = parseInt(countString);

  for (let i = 0; i < count; i++) {
    go[direction](head);

    // Only move the tail if it's not currently adjacent
    if (isAdjacent(head, tail)) {
      continue;
    }

    go[direction](tail);

    // Go to the same line or column as the head depending on
    // which direction we're moving to
    const index = +!(direction === "U" || direction === "D");
    tail[index] = head[index];

    // Keep a set of all visited items
    visited.add(tail.join(","));
  }
}

console.log(visited.size);
