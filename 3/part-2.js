import { readFile } from "node:fs/promises";

const charCodeA = "A".charCodeAt(0);
const charCodea = "a".charCodeAt(0);

const getPriority = (char) => {
  // upper case : lower case
  const code = char.charCodeAt(0);
  return 1 + (code < charCodea ? code - charCodeA + 26 : code - charCodea);
};

const input = await readFile("./input", "utf-8");
const lines = input.split("\n");
const groupSize = 3;

let sum = 0;

for (let i = 0; i < lines.length; i += groupSize) {
  const elements = lines
    .slice(i, i + groupSize)
    .map((string) => string.split(""));

  const difference = new Set(
    elements[0].filter(
      (char) => elements[1].includes(char) && elements[2].includes(char)
    )
  );

  if (difference.size !== 1) {
    throw new Error("problem in the algorithm");
  }

  const char = [...difference][0];
  sum += getPriority(char);
}

console.log(sum);
