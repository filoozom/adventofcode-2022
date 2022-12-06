import { readFile } from "node:fs/promises";

const charCodeA = "A".charCodeAt(0);
const charCodeDiff = "X".charCodeAt(0) - charCodeA;

const input = await readFile("./input", "utf-8");
let score = 0;

const charToShape = (char) => {
  return char.charCodeAt(0) - charCodeA;
};

for (const line of input.split("\n")) {
  const [them, me] = line.split(" ");

  const themCode = charToShape(them);
  const meCode = me.charCodeAt(0) - charCodeDiff - charCodeA;

  // Score because of chosen schape
  score += meCode + 1;

  // Score if win or draw
  if (themCode === meCode) {
    score += 3;
  } else if (meCode === (themCode + 1) % 3) {
    score += 6;
  }
}

console.log(score);
