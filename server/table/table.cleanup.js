function cleanupRecord(record, apiUrl) {
  const fields = {
    '/api/maximum-weights': {
      setName: (fieldValue) => {
        cleanedUpRecord.setName = fieldValue.toUpperCase();
      },
    },
  };

  if (!fields.hasOwnProperty(apiUrl)) return record; // eslint-disable-line

  const cleanedUpRecord = Object.assign({}, record);

  const fieldKeys = Object.keys(fields[apiUrl]);
  fieldKeys.forEach((fieldKey) => {
    const fieldValue = record[fieldKey];
    const cleanup = fields[apiUrl][fieldKey];
    cleanup(fieldValue);
  });

  return cleanedUpRecord;
}

module.exports = {
  cleanupRecord,
};
