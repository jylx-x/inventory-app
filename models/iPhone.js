var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IPhoneSchema = new Schema(
  {
    name: {type: String, required: true},
    img: String,
    description: String,
    category: String,
    price: String,
    number_in_stock: Number
  }
)

// Virtual for iPhone's URL
IPhoneSchema
.virtual('url')
.get(function() {
  return '/browse/iPhone/' + this._id;
})

module.exports = mongoose.model('IPhones', IPhoneSchema)