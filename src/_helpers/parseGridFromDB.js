export default function parseGridFromDB(grid, columns) {
  const newGrid = [];

  // Populate newGrid with an array per every table row
  for (let i = 0; i < grid.length; i += 1) {
    newGrid.push([]);
  }

  columns.forEach((column) => {
    const columnKey = column.key;

    grid.forEach((row, rowIndex) => {
      newGrid[rowIndex].push({ value: row[columnKey] });
    });
  });

  return newGrid;
}
