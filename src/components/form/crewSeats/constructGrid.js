export default function constructGrid(columns) {
  const grid = [];
  for (let i = 0; i < 10; i += 1) {
    grid.push([]);
    for (let j = 0; j < columns.length; j += 1) {
      grid[grid.length - 1].push({ value: null });
    }
  }

  return grid;
}
