export default function parseGridToDB(grid, columns) {
  const parsedGrid = [];

  // Populate parsedGrid with an object per every table row
  for (let i = 0; i < grid.length; i += 1) {
    parsedGrid.push({});
  }

  columns.forEach((column, columnIndex) => {
    const columnKey = column.key;

    // Store each value under column key
    grid.forEach((row, rowIndex) => {
      parsedGrid[rowIndex][columnKey] = row[columnIndex].value;
    });
  });

  return parsedGrid;
}
