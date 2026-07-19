const mongoose = require('mongoose');
const { Schema } = mongoose;

const SelectionSchema = new Schema({
  sheetId: { type: String },
  rows: { type: Array, required: true }, // store row objects
  createdAt: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model('Selection', SelectionSchema);
