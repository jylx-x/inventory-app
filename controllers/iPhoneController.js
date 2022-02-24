const { body, validationResult } = require('express-validator');

var iPhone = require('../models/iPhone');

exports.iPhone_list = function(req, res, next) {
  iPhone.find({}, function(err, iPhones) {
    if (err) {return next(err)}
    res.render('category', {title:'iPhones', category: iPhones})
  })
}

exports.iPhone_detail = function(req, res, next) {
  iPhone.findById(req.params.id, function(err, iPhone) {
    if(err) {return next(err)}
    res.render('product', {product: iPhone})
  })
}

exports.iPhone_create_get = function(req, res) {
  res.render('item_form', {title: 'Add new iPhone item'});
}

exports.iPhone_create_post = [
  body('name').trim().isLength({ min: 1}).escape().withMessage('Item name is required'),
  body('img').optional({checkFalsy:true}),
  body('description').optional({checkFalsy:true}),
  body('price').optional({checkFalsy:true}).isNumeric().withMessage('Price must be written with numbers'),
  body('number_in_stock').optional({checkFalsy:true}).isNumeric({no_symbols: false}).withMessage('Stock must be written with numbers and not have symbols'),

  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('item_form', {title: 'Add new iPhone item', item: req.body, errors: errors.array() });
      return
    }
    else {
      var item = new iPhone(
        {
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock
        }
      );

      item.save(function (err) {
        if (err) { return next(err);}
        res.redirect(item.url)
      })
    }
  }
]

exports.iPhone_delete_get = function(req, res) {
  iPhone.findById(req.params.id, function(err, iphone) {
    if(err) {return next(err); }
    if(iphone == null) {
      res.redirect('/browse/iPhone')
    }
    res.render('item_delete', {title: 'Delete iPhone: ' + iphone.name, item: iphone})
  })
}

exports.iPhone_delete_post = function(req, res) {
  iPhone.findByIdAndRemove(req.body.itemid, function deleteItem(err) {
    if (err) {return next(err)}

    res.redirect('/browse/iPhone')
  })
}

exports.iPhone_update_get = function(req, res) {
  iPhone.findById(req.params.id, function(err, iphone) {
    if(err) {return(err); }
    if(iphone == null) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('item_form', {title: 'Update iPhone: ' + iphone.name, item: iphone})
  })
}

exports.iPhone_update_post = [
  body('name').trim().isLength({ min: 1}).escape().withMessage('Item name is required'),
  body('img').optional({checkFalsy:true}),
  body('description').optional({checkFalsy:true}),
  body('price').optional({checkFalsy:true}).isNumeric().withMessage('Price must be written with numbers'),
  body('number_in_stock').optional({checkFalsy:true}).isNumeric({no_symbols: false}).withMessage('Stock must be written with numbers and not have symbols'),

  (req, res, next) => {
    const errors = validationResult(req);

    var item = new iPhone(
      {
      name: req.body.name,
      img: req.body.img,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id
      }
    );

    if(!errors.isEmpty()) {
      res.render('item_form', {title: 'Update iPhone: ' + item.name, item: req.body, errors: errors.array() });
      return
    }
    else {
      iPhone.findByIdAndUpdate(req.params.id, item, {}, function (err, thisItem) {
        if (err) {return next(err)}

        res.redirect(thisItem.url)
      })
    }
  }
]