const mongoose = require('mongoose');

const { Schema } = mongoose;

const { tables } = require('../../src/config/_tables');
const { mappingTable } = require('../../src/config/_mappingTable');
const { fieldTypes } = require('../_helpers/fieldTypes');

const schemasObj = {};

// Set up Mongoose schema for every table
tables.forEach((table) => {
  const specs = {
    status: { type: String, reguired: true },
    dateActivated: { type: Date, required: false },
    dateDeactivated: { type: Date, required: false },
  };
  table.fields.forEach((field) => {
    specs[field.fieldKey] = {
      type: fieldTypes[field.fieldType],
      required: field.required,
    };
  });
  const schema = new Schema(specs, { collection: table.collection });
  schema.set('toJSON', { virtuals: true });
  schemasObj[`/api/${table.url}`] = mongoose.model(table.collection, schema);

  // Set up Mongoose schema for associated mapping table
  if (table.withMapping === true) {
    const specsMappingTable = {
      setId: { type: String, required: true },
      status: { type: String, reguired: true },
      dateActivated: { type: Date, required: false },
      dateDeactivated: { type: Date, required: false },
    };
    mappingTable.fields.forEach((field) => {
      specsMappingTable[field.fieldKey] = {
        type: fieldTypes[field.fieldType],
        required: field.required,
      };
    });
    const schemaMappingTable = new Schema(specsMappingTable, { collection: `${table.collection}mapping` });
    schemaMappingTable.set('toJSON', { virtuals: true });
    schemasObj[`/api/${table.url}-mapping`] = mongoose.model(`${table.collection}mapping`, schemaMappingTable);
  }
});

// Set up Mongoose schema for Aircraft Types (select field only - no CRUD UI)
const specsAircraftTypes = {
  type: { type: String, reguired: true },
  group: { type: String, reguired: true },
  suffix: { type: String, reguired: true },
};

const schemaAircraftTypes = new Schema(specsAircraftTypes, { collection: 'aircrafttypes' });
schemaAircraftTypes.set('toJSON', { virtuals: true });
schemasObj['/api/aircraft-types'] = mongoose.model('aircrafttypes', schemaAircraftTypes);

module.exports = schemasObj;
