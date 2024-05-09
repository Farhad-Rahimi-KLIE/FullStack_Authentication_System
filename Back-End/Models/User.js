const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
});

const UserMoodel = mongoose.model("users", UserSchema);

module.exports = UserMoodel;