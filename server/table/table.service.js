const db = require('../_helpers/db.js');
const { validateRecord } = require('./table.validation');
const { cleanupRecord } = require('./table.cleanup');

async function getAll(req, apiUrl) {
  const filters = {};

  Object.keys(req.query).forEach((filter) => {
    filters[filter.slice(1)] = req.query[filter];
  });

  delete filters.offset;
  delete filters.limit;

  const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
  let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;
  if (limit > 50) limit = 50;
  const totalCount = await db[apiUrl].find().count();
  const records = await db[apiUrl].find(filters).sort({ _id: 1 }).skip(offset).limit(limit);
  return {
    metadata: { totalCount },
    records,
  };
}

async function getById(id, apiUrl) {
  const result = await db[apiUrl].findById(id).select('-hash');
  return result;
}

async function create(userParams, apiUrl) {
  let newRecord = Object.assign({}, userParams);

  // Validation
  const err = validateRecord(newRecord, apiUrl);
  if (err.length !== 0) throw { message: err };

  newRecord.status = 'draft';
  newRecord = cleanupRecord(newRecord, apiUrl);
  const tableRecord = new db[apiUrl](newRecord);
  await tableRecord.save();
}

async function update(id, userParams, apiUrl) {
  const newRecord = Object.assign({}, userParams);

  if (newRecord.toSetStatus) {
    handleSetStatus(id, newRecord, apiUrl);
    return;
  }

  // Update record
  const err = validateRecord(newRecord);
  if (err.length !== 0) throw { message: err };

  let recordToSave = cleanupRecord(newRecord, apiUrl);
  const schema = db[apiUrl];
  const currentRecord = await schema.findById(id);
  if (!currentRecord) throw new Error('Record not found');

  recordToSave = Object.assign(currentRecord, recordToSave);
  await recordToSave.save();
}

async function _delete(id, apiUrl) {
  await db[apiUrl].findByIdAndRemove(id);
}

async function handleSetStatus(id, newRecord, apiUrl) {
  const statusChangeDates = {
    active: 'dateActivated',
    inactive: 'dateDeactivated',
  };
  const dateToChange = statusChangeDates[newRecord.status];

  const currentRecord = await db[apiUrl].findById(id);
  if (!currentRecord) throw new Error('Record not found');

  const recordToSave = Object.assign(currentRecord, newRecord);
  recordToSave[dateToChange] = new Date();
  delete recordToSave.toSetStatus;
  await recordToSave.save();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
