import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const stacks = [];
const isNumber = (input) => !isNaN(input);

for (const line of file.split(/\r?\n/)) {
  if (!line) {
    continue;
  }

  if (line.startsWith("move")) {
    const [count, from, to] = line
      .split(" ")
      .filter(isNumber)
      .map((string) => new Number(string));

    const add = stacks[from - 1].splice(stacks[from - 1].length - count);
    stacks[to - 1].push(...add);

    continue;
  }

  const elements = line
    .match(/.{1,4}/g)
    .map((string) => string.trim().replace(/[\[\]]/g, ""));

  if (elements[0] === "1") {
    continue;
  }

  for (let i = 0; i < elements.length; i++) {
    if (!elements[i]) {
      continue;
    }
    if (!stacks[i]) {
      stacks[i] = [];
    }
    stacks[i].unshift(elements[i]);
  }
}

console.log(stacks.map((stack) => stack[stack.length - 1]).join(""));
