import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
let processedClock = -20;
let clock = 0;
let x = 1;
let sum = 0;

for (const line of file.split("\n")) {
  const [op, val] = line.split(" ");

  // Increment clock
  clock += op === "noop" ? 1 : 2;

  // Process the signal every 40 clock cycles starting at 20
  if (clock - processedClock >= 40) {
    // Set the latest processed clock (20 + multiple of 40)
    processedClock = (Math.floor(clock / 40 - 0.5) + 0.5) * 40;

    // Increment the sum
    sum += x * processedClock;
  }

  // Increment x
  if (op === "addx") {
    x += parseInt(val);
  }
}

console.log(sum);
