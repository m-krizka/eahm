export const constructRecordProperties = (fields) => {
  const constructedRecord = {};
  fields.forEach((field) => {
    constructedRecord[field.fieldKey] = field.defaultValue;
  });
  return constructedRecord;
};
