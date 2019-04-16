const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemRecSchema = new Schema({
  item_id: String,
  recs: [String], /* ordered list of item ids */
  timestamp: Date
});

module.exports = ItemRec = mongoose.model('itemRec', ItemRecSchema);