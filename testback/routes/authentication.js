var express = require('express');
const { signout, signup, signin, isSignedIn } = require('../controllers/authentication');
const { body } = require('express-validator');
var router = express.Router();

 router.post("/signup",[
    body('name', "name should be at least 2 char").isLength({min: 2}),
    body('email', "email is required").isEmail(),
    body('password', "password should be at least 3 char").isLength({min: 3})
 ], signup);

 router.post("/signin",[
    body('email', "email is required").isEmail(),
    body('password', "password should be at least 3 char").isLength({min: 1})
 ], signin);

 router.get("/signout", signout);

//  protected route
 router.get("/testroute", isSignedIn, (req, res) => {
   res.json(req.auth)
 })



 module.exports = router;