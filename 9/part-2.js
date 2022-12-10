import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const visited = new Set(["0,0"]);
const knots = Array.from({ length: 10 }, () => [0, 0]);

const go = {
  U: (coords) => coords[1]++,
  D: (coords) => coords[1]--,
  L: (coords) => coords[0]--,
  R: (coords) => coords[0]++,
};

const isAdjacent = (a, b) => {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
};

// We need to always round to 0, which works differently for
// positive and negative numbers in JavaScript
const round = (value) => {
  return value >= 0 ? Math.floor(value) : Math.ceil(value);
};

for (const line of file.split("\n")) {
  const [direction, countString] = line.split(" ");
  const count = parseInt(countString);

  for (let i = 0; i < count; i++) {
    // Move the head to the appropriate direction
    go[direction](knots[0]);

    for (let knot = 1; knot < knots.length; knot++) {
      const previous = knots[knot - 1];
      const current = knots[knot];

      // Only move the tail if it's not currently adjacent
      if (isAdjacent(previous, current)) {
        break;
      }

      // There's always one axis with a distance of +/-2
      // The other one has a distance of 0 or +/-1
      const xDistance = current[0] - previous[0];
      const yDistance = current[1] - previous[1];

      // Update the current item to move towards the previous one
      current[0] = previous[0] + round(xDistance / 2);
      current[1] = previous[1] + round(yDistance / 2);

      // Sanity check
      if (!isAdjacent(previous, current)) {
        console.error("adjacency lost", { previous, current });
        process.exit(1);
      }

      // Keep a set of all items visited by the tail
      if (knot === knots.length - 1) {
        visited.add(current.join(","));
      }
    }
  }
}

console.log(visited.size);
