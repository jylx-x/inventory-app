const { body, validationResult } = require('express-validator');

var iPad = require('../models/iPad.js');

exports.iPad_list = function(req, res, next) {
  iPad.find({}, function(err, iPads) {
    if(err) {return next(err)} 
    res.render('category', {title: 'iPads', category: iPads})
  }) 
}

exports.iPad_detail = function(req, res) {
  iPad.findById(req.params.id, function(err, iPad) {
    if(err) {return next(err)}
    res.render('product', {product: iPad})
  })
}

exports.iPad_create_get = function(req, res) {
  res.render('item_form', {title: 'Add new iPad item'})
}

exports.iPad_create_post = [
  body('name').trim().isLength({ min: 1}).escape().withMessage('Item name is required'),
  body('img').optional({checkFalsy:true}),
  body('description').optional({checkFalsy:true}),
  body('price').optional({checkFalsy:true}),
  body('number_in_stock').optional({checkFalsy:true}).isNumeric({no_symbols: false}).withMessage('Stock must be written with numbers and not have symbols'),

  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('item_form', {title: 'Add new iPad item', item: req.body, errors: errors.array() });
      return
    }
    else {
      var item = new iPad(
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

exports.iPad_delete_get = function(req, res) {
  iPad.findById(req.params.id, function(err, ipad) {
    if(err) {return next(err); }
    if(ipad == null) {
      res.redirect('/browse/iPad')
    }
    res.render('item_delete', {title: 'Delete iPad: ' + ipad.name, item: ipad})
  })
}

exports.iPad_delete_post = function(req, res) {
  iPad.findByIdAndRemove(req.body.itemid, function deleteItem(err) {
    if (err) {return next(err)}

    res.redirect('/browse/iPad')
  })
}

exports.iPad_update_get = function(req, res) {
  iPad.findById(req.params.id, function(err, ipad) {
    if(err) {return(err); }
    if(ipad == null) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('item_form', {title: 'Update iPad: ' + ipad.name, item: ipad})
  })
}

exports.iPad_update_post = [
  body('name').trim().isLength({ min: 1}).escape().withMessage('Item name is required'),
  body('img').optional({checkFalsy:true}),
  body('description').optional({checkFalsy:true}),
  body('price').optional({checkFalsy:true}),
  body('number_in_stock').optional({checkFalsy:true}).isNumeric({no_symbols: false}).withMessage('Stock must be written with numbers and not have symbols'),

  (req, res, next) => {
    const errors = validationResult(req);

    var item = new iPad(
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
      res.render('item_form', {title: 'Update iPad: ' + item.name, item: req.body, errors: errors.array() });
      return
    }
    else {
      iPad.findByIdAndUpdate(req.params.id, item, {}, function (err, thisItem) {
        if (err) {return next(err)}

        res.redirect(thisItem.url)
      })
    }
  }
]