export default function assignLimitsType(grid) {

  let currentLimitsType = null;

  const newGrid = grid.map((row) => {
    if (row.limitsType) {
      currentLimitsType = row.limitsType;
      return row;
    }

    // Only apply Limits Type to those rows having at least 1 non-null value
    let isRowEmpty = true;

    for (let i = 0; i < Object.keys(row).length; i += 1) {
      const column = Object.keys(row)[i];
      const value = row[column];
      if (value) {
        isRowEmpty = false;
        break;
      }
    }

    if (!isRowEmpty) {
      const newRow = { ...row };
      newRow.limitsType = currentLimitsType;
      return newRow;
    }

    return row;
  });

  return newGrid;
}
