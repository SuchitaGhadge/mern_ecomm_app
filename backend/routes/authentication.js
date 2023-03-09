 var express = require('express');
const { signout, signup } = require('../controllers/authentication');
 var router = express.Router();

 router.post("/signup", signup)
 router.get("/signout", signout)

 module.exports = router;