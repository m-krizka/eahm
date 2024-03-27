function validateRecord(record, apiUrl) {
  const fields = {
    '/api/maximum-weights': {
      registration: {
        required: true,
        regex: /^[a-zA-Z0-9]{1,3}(-)?(–)?[a-zA-Z0-9]{1,9}$/,
        errorMessage: 'Registration field must contain 3 to 12 characters, including a dash (optional)',
      },
      setName: {
        required: true,
        regex: /^[a-zA-Z0-9]{1,3}(-)?(–)?[a-zA-Z0-9]{1,27}$/,
        errorMessage: 'Set Name field must include 1 to 30 characters',
      },
      mfw: {
        required: false,
        regex: /^\d{4,7}$/,
        errorMessage: 'MFW from must be a valid number between 4 and 7 digits',
      },
      mzfw: {
        required: true,
        regex: /^\d{4,7}$/,
        errorMessage: 'MZFW from must be a valid number between 4 and 7 digits',
      },
      mtow: {
        required: true,
        regex: /^\d{4,7}$/,
        errorMessage: 'MTOW from must be a valid number between 4 and 7 digits',
      },
      mtw: {
        required: true,
        regex: /^\d{4,7}$/,
        errorMessage: 'MTW from must be a valid number between 4 and 7 digits',
      },
      mlw: {
        required: true,
        regex: /^\d{4,7}$/,
        errorMessage: 'MLW from must be a valid number between 4 and 7 digits',
      },
    },
  };

  if (!fields.hasOwnProperty(apiUrl)) return []; // eslint-disable-line
  const errors = [];

  const fieldKeys = Object.keys(fields[apiUrl]);

  fieldKeys.forEach((fieldKey) => {
    const fieldValue = record[fieldKey];
    const selectedField = fields[apiUrl][fieldKey];
    // If field is required, it must be populated and must pass the test
    if (selectedField.required) {
      if (fieldValue !== '' && fieldValue !== null) {
        if (!selectedField.regex.test(fieldValue)) {
          errors.push(selectedField.errorMessage);
        }
      } else {
        errors.push(selectedField.errorMessage);
      }
    // If field is not required but is populated, it must pass the test
    } else if (fieldValue !== '' && fieldValue !== null) {
      if (!selectedField.regex.test(fieldValue)) {
        errors.push(selectedField.errorMessage);
      }
    }
  });

  return errors;
}

module.exports = {
  validateRecord,
};
