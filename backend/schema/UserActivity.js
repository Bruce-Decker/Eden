const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
  user_id: String,
  item_id: String,
  timestamp: Date
});

module.exports = UserActivity = mongoose.model('userActivity', UserActivitySchema);