export const display = (knots) => {
  const allX = knots.map(([x]) => x);
  const allY = knots.map(([, y]) => y);

  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);

  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const grid = Array.from({ length: maxY - minY + 1 }, () =>
    Array.from({ length: maxX - minX + 1 }, () => ["x"])
  );

  for (let i = 0; i < knots.length; i++) {
    grid[knots[i][1] - minY][knots[i][0] - minX] = i;
  }

  console.log(
    grid
      .reverse()
      .map((line) => line.join(" "))
      .join("\n")
  );
};
