const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;
 
const WordSchema = new Schema({
  //author: ObjectId,
  word: { type: String, required: true },
  description: String,
  author: String,
  category: { type: String, required: true, max: [30, '最大30文字までです'] }
});

module.exports = mongoose.model('Word', WordSchema);