const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/authentication')
router.param('userId', getUserById);
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser) //param name should be same as above
// router.get('/users', getAllUsers)
router.put('/user/:userId',isSignedIn, isAuthenticated, updateUser )
router.get('/orders/user/:userId',isSignedIn, isAuthenticated, userPurchaseList )
module.exports = router;