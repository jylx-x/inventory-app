var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    name: {type: String, required: true},
    description: String,
    img: String
  }
);

// Virtual for category's URL
CategorySchema
.virtual('url')
.get(function () {
  return '/browse/' + this.name;
})

module.exports = mongoose.model('Category', CategorySchema);