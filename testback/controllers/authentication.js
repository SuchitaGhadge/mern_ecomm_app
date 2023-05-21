const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt } = require('express-jwt');  //newer version format

exports.signup = (req, res) => {
  // console.log("REQ BODY", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    /*
     * 422 Unprocessable Content
     * The HyperText Transfer Protocol (HTTP) 422 Unprocessable Content response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
     */
  }
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user ) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        error : "Email and Password do not match"
      })  
    }

    // create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

    // put token in cookie
    res.cookie("token", token, { expiresIn: '1h' });

    // send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role }})
    
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout success"
  });
};

// protected route
exports.isSignedIn = expressjwt({
  secret : process.env.SECRET_KEY,
  userProperty : "auth",
  algorithms: ["HS256"]   //required in newer version of express-jwt
});

//  custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker){
    return res.status(403).json({
      error : "ACCESS DENIED"
    })
  }
  next();
}

exports.isAdmin = (req, res,next) => {
  if(req.profile.role !== 1){
    return res.status(403).json({
      error : "You are not ADMIN, Access Denied"
    })
  }
  next();
}

/*
 * your server will respond like this in signup: 
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
