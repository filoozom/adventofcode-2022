import { readFile } from "node:fs/promises";

const file = await readFile("./input", "utf8");
const size = 4;
const buffer = [];

for (let i = 0; i < file.length; i++) {
  buffer.push(file[i]);

  if (buffer.length > size) {
    buffer.shift();
  }

  if (new Set(buffer).size === size) {
    console.log(i + 1);
    break;
  }
}
