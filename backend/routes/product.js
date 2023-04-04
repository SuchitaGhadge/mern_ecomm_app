const express = require('express');
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct} = require('../controllers/product')
const {isSignedIn, isAdmin, isAuthenticated} = require('../controllers/authentication');
const {getUserById} = require('../controllers/user');

// all of param
router.param('userId', getUserById);
router.param('productId', getProductById);

// all of actual route
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

// read routes
router.get('product/:productId', getProduct);
router.get('product/photo/:productId', photo);

// delete route
router.delete('product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// update route
router.put('product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);

// listing route


module.exports = router;