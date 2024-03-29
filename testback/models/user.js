const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },

    lastname : {
        type : String,
        maxlength : 32,
        trim : true
    }, 
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    userinfo : {
        type : String,
        trim : true
    },
    encrypt_password : {
        type : String,
        required : true
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchase : {
        type : Array,
        default : []
    }
}, {
    timestamps : true 
});

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {

    // authenticate
    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encrypt_password
    },

    securePassword : function(plainpassword){
        if(!plainpassword) return ""

        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex')
        } catch (error) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)