export default function orderSubtableRows(records) {
  // Return an array where rows are ordered: active, draft, inactive
  const helperObj = { active: [], draft: [], inactive: [] };
  records.forEach((record) => {
    helperObj[record.status].push(record);
  });
  return helperObj.active.concat(helperObj.draft).concat(helperObj.inactive);
}
