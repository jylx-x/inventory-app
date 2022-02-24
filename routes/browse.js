var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController.js');
var iPadController = require('../controllers/iPadController.js');
var iPhoneController = require('../controllers/iPhoneController.js');
var macController = require('../controllers/macController.js');

// CATEGORY ROUTES //

router.get('/', category_controller.category_index);

// IPAD ROUTES //

router.get('/iPad/create', iPadController.iPad_create_get);

router.post('/iPad/create', iPadController.iPad_create_post);

router.get('/iPad/:id/delete', iPadController.iPad_delete_get);

router.post('/iPad/:id/delete', iPadController.iPad_delete_post);

router.get('/iPad/:id/update', iPadController.iPad_update_get);

router.post('/iPad/:id/update', iPadController.iPad_update_post);

router.get('/iPad/:id', iPadController.iPad_detail);

router.get('/iPad', iPadController.iPad_list);

// IPHONE ROUTES //

router.get('/iPhone/create', iPhoneController.iPhone_create_get);

router.post('/iPhone/create', iPhoneController.iPhone_create_post);

router.get('/iPhone/:id/delete', iPhoneController.iPhone_delete_get);

router.post('/iPhone/:id/delete', iPhoneController.iPhone_delete_post);

router.get('/iPhone/:id/update', iPhoneController.iPhone_update_get);

router.post('/iPhone/:id/update', iPhoneController.iPhone_update_post);

router.get('/iPhone/:id', iPhoneController.iPhone_detail)

router.get('/iPhone', iPhoneController.iPhone_list);

// MAC ROUTES //

router.get('/mac/create', macController.mac_create_get);

router.post('/mac/create', macController.mac_create_post);

router.get('/mac/:id/delete', macController.mac_delete_get);

router.post('/mac/:id/delete', macController.mac_delete_post);

router.get('/mac/:id/update', macController.mac_update_get);

router.post('/mac/:id/update', macController.mac_update_post);

router.get('/mac/:id', macController.mac_detail);

router.get('/mac', macController.mac_list);

module.exports = router;

