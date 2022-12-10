import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const drawing = Array.from({ length: 6 }, () => []);

let clock = 0;
let x = 1;

for (const line of file.split("\n")) {
  const [op, val] = line.split(" ");
  let increment = op === "noop" ? 1 : 2;

  // Draw a pixel for each clock
  for (let i = 0; i < increment; i++) {
    const drawClock = clock + i;

    const line = Math.floor(drawClock / 40);
    const column = drawClock % 40;

    drawing[line][column] = column >= x - 1 && column <= x + 1 ? "X" : ".";
  }

  // Increment clock
  clock += op === "noop" ? 1 : 2;

  // Increment x
  if (op === "addx") {
    x += parseInt(val);
  }
}

console.log(drawing.map((line) => line.join("")).join("\n"));
