export const mappingTable = {
  type: 'mappingTable',
  fields: [
    {
      fieldName: 'Registration',
      fieldKey: 'registration',
      fieldType: 'select',
      required: true,
      defaultValue: '',
    },
    {
      fieldName: 'Effective From',
      fieldKey: 'effFrom',
      fieldType: 'date',
      required: true,
      defaultValue: null,
    },
    {
      fieldName: 'Effective To',
      fieldKey: 'effTo',
      fieldType: 'date',
      required: false,
      defaultValue: null,
    },
    {
      fieldName: 'Status',
      fieldKey: 'status',
      fieldType: 'string',
      required: true,
      defaultValue: null,
    },
  ],
};
