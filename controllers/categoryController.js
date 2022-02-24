var Category = require('../models/category');
var iPad = require('../models/iPad');
var iPhone = require('../models/iPhone');
var Mac = require('../models/mac');

var async = require('async');

exports.category_index = function(res, res) {
  Category.find({}, function(err, categories) {
    res.render('index', {title:'Apple Inventory App', error: err, categories: categories})
  })
}
