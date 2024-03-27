export const constructDateFocusProperties = (stateObject, fieldArray) => {
  const newStateObject = Object.assign({}, stateObject);
  fieldArray.forEach((field) => {
    if (field.fieldType === 'date') {
      newStateObject[`${field.fieldKey}Focus`] = null;
    }
  });
  return newStateObject;
};
