const { body, validationResult } = require('express-validator');

var Mac = require('../models/mac');

exports.mac_list = function(req, res, next) {
  Mac.find({}, function(err, Macs) {
    if(err) {return next(err)}
    res.render('category', {title: 'Macs', category: Macs})
  })
}

exports.mac_detail = function(req, res, next) {
  Mac.findById(req.params.id, function(err, Mac) {
    if(err) {return next(err)}
    res.render('product', {product: Mac})
  })
}

exports.mac_create_get = function(req, res) {
  res.render('item_form', {title: 'Add new Mac item'})
}

exports.mac_create_post = [
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

exports.mac_delete_get = function(req, res, next) {
  Mac.findById(req.params.id, function(err, mac) {
    if(err) {return next(err); }
    if(mac == null) {
      res.redirect('/browse/Mac')
    }
    res.render('item_delete', {title: 'Delete Mac: ' + mac.name, item: mac})
  })
}

exports.mac_delete_post = function(req, res) {
  Mac.findByIdAndRemove(req.body.itemid, function deleteItem(err) {
    if (err) {return next(err)}

    res.redirect('/browse/Mac')
  })
}

exports.mac_update_get = function(req, res) {
  Mac.findById(req.params.id, function(err, mac) {
    if(err) {return(err); }
    if(mac == null) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('item_form', {title: 'Update Mac: ' + mac.name, item: mac})
  })
}

exports.mac_update_post = [
  body('name').trim().isLength({ min: 1}).escape().withMessage('Item name is required'),
  body('img').optional({checkFalsy:true}),
  body('description').optional({checkFalsy:true}),
  body('price').optional({checkFalsy:true}),
  body('number_in_stock').optional({checkFalsy:true}).isNumeric({no_symbols: false}).withMessage('Stock must be written with numbers and not have symbols'),

  (req, res, next) => {
    const errors = validationResult(req);

    var item = new Mac(
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
      res.render('item_form', {title: 'Update Mac: ' + item.name , item: req.body, errors: errors.array() });
      return
    }
    else {
      Mac.findByIdAndUpdate(req.params.id, item, {}, function (err, thisItem) {
        if (err) {return next(err)}

        res.redirect(thisItem.url)
      })
    }
  }
]