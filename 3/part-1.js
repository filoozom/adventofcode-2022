import { readFile } from "node:fs/promises";

const charCodeA = "A".charCodeAt(0);
const charCodea = "a".charCodeAt(0);

const getPriority = (char) => {
  // upper case : lower case
  const code = char.charCodeAt(0);
  return 1 + (code < charCodea ? code - charCodeA + 26 : code - charCodea);
};

const input = await readFile("./input", "utf-8");
let sum = 0;

for (const line of input.split("\n")) {
  const { length } = line;
  const left = line.substring(0, length / 2).split("");
  const right = line.substring(length / 2).split("");
  const difference = new Set(left.filter((char) => right.includes(char)));

  if (difference.size !== 1) {
    throw new Error("problem in the algorithm");
  }

  const char = [...difference][0];
  sum += getPriority(char);
}

console.log(sum);
