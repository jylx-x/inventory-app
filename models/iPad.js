var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IPadSchema = new Schema(
  {
    name: {type: String, required: true},
    img: String,
    description: String,
    category: String,
    price: String,
    number_in_stock: Number
  }
)

// Virtual for iPad's URL
IPadSchema
.virtual('url')
.get(function() {
  return '/browse/iPad/' + this._id
})

module.exports = mongoose.model('IPad', IPadSchema)