const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }  
});

module.exports = mongoose.model("ForgotPassword",ForgotPasswordSchema);