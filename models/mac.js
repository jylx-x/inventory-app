var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MacSchema = new Schema(
  {
    name: {type: String, required: true},
    img: String,
    description: String,
    category: String,
    price: String,
    number_in_stock: Number
  }
)

// Virtual for Mac's URL
MacSchema
.virtual('url')
.get(function() {
  return '/browse/Mac/' + this._id;
})

module.exports = mongoose.model('Mac', MacSchema)