const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    // setting fields undefined on the fly on in db. these fields will not populate in response
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    return res.json(req.profile)
}

// exports.getAllUsers = (req, res) => {
//     User.find().exec((err, users) => {
//         if(err || !users){
//             return res.status(400).json({
//                 error : "No user found "
//             })
//         }

//         res.json(users)
//     })
// }