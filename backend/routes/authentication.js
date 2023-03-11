var express = require('express');
const { signout, signup } = require('../controllers/authentication');
const { body } = require('express-validator');
var router = express.Router();

 router.post("/signup",[
    body('name', "name should be at least 2 char").isLength({min: 2}),
    body('email', "email is required").isEmail(),
    body('password', "password should be at least 3 char").isLength({min: 3})
 ], signup)
 router.get("/signout", signout)

 module.exports = router;