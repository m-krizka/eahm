const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  token: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RegToken', schema);
