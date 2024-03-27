export default function formatLimitsType(grid) {

  let currentLimitsType = null;

  const newGrid = grid.map((row, index) => {

    if (index === 0) {
      currentLimitsType = row.limitsType;
      return row;
    }

    if (row.limitsType && row.limitsType !== currentLimitsType) {
      currentLimitsType = row.limitsType;
      return row;
    }

    // Check if a row has at least one column filled in
    let isRowEmpty = true;
    for (let i = 0; i < Object.keys(row).length; i++) {
      const column = Object.keys(row)[i];
      const value = row[column];
      if (value) {
        isRowEmpty = false;
        break;
      }
    }

    if (!isRowEmpty) {
      const newRow = { ...row };
      newRow.limitsType = null;
      return newRow;
    }

    return row;
  });

  return newGrid;
}
