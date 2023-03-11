const User = require("../models/user");
const { validationResult } = require('express-validator');
exports.signup = (req, res) => {
    // console.log("REQ BODY", req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()}) 
        /*
         * 422 Unprocessable Content
         * The HyperText Transfer Protocol (HTTP) 422 Unprocessable Content response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
         */
    }
    const user = new User(req.body);

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err : "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
  
}

exports.signout  = (req, res) => {
    res.json({
        message : 'user signout success'
    })
}

/*
 * your server will respond like this: 
{
  "errors": [
    {
      "location": "body",
      "msg": "Invalid value",
      "param": "username"
    }
  ]
}
 */