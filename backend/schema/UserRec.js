const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserRecSchema = new Schema({
  user_id: String,
  recs: [String], /* ordered list of item ids */
  timestamp: Date
});

module.exports = UserRec = mongoose.model('userRec', UserRecSchema, 'userRecs');