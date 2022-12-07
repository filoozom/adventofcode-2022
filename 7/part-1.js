import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const cwd = [];
const hierarchy = {};

const SIZE_KEY = "_size";
const MAX_SIZE = 100_000;

const addSize = (object, keys, value) => {
  let copy = object;
  for (const key of keys) {
    copy = copy[key] ||= {};
  }
  copy[SIZE_KEY] = (copy[SIZE_KEY] || 0) + value;
};

// Two parties because it's more efficient than bubbling up in real time
// Create the hierarchy
for (const line of file.split("\n")) {
  const parts = line.split(" ");

  // Commands
  if (parts[0] === "$") {
    // cd
    if (parts[1] === "cd") {
      switch (parts[2]) {
        case "/":
          cwd.length = 0;
          break;

        case "..":
          cwd.pop();
          break;

        default:
          cwd.push(parts[2]);
      }
    }

    // Ignore ls
    continue;
  }

  // ls result (ignore directories)
  if (parts[0] !== "dir") {
    addSize(hierarchy, cwd, parseInt(parts[0]));
  }
}

// Bubble the sums up
const bubbleUp = (hierarchy) => {
  if (!hierarchy[SIZE_KEY]) {
    hierarchy[SIZE_KEY] = 0;
  }

  for (const [key, value] of Object.entries(hierarchy)) {
    if (key === SIZE_KEY) {
      continue;
    }

    hierarchy[SIZE_KEY] += bubbleUp(value)[SIZE_KEY] || 0;
  }

  return hierarchy;
};

const sum = bubbleUp(hierarchy);

// Find directories that are under a certain size
const calculateSum = (hierarchy) => {
  let sum = 0;

  for (const value of Object.values(hierarchy)) {
    if (value[SIZE_KEY] < MAX_SIZE) {
      sum += value[SIZE_KEY];
    }

    // Recursion
    sum += calculateSum(value);
  }

  return sum;
};

console.log(calculateSum(sum));
