export default function formatTableCell(field, fieldValue) {
  const formatFunctions = {
    radioDouble: (fieldData, value) => {
      return value ? 'Yes' : 'No';
    },
    date: (specs, value) => {
      if (specs.fieldKey === 'effFrom') {
        return new Date(value).toLocaleDateString('en-GB');
      }
      if (value == null) {
        return '- Open -';
      }
      return new Date(value).toLocaleDateString('en-GB');
    },
  };
  const { fieldType } = field;
  if (fieldType in formatFunctions) {
    return formatFunctions[fieldType](field, fieldValue);
  }
  return fieldValue;
}
