const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    user_email:{
        type:String,
        require:true
    },
    vehicle_id:{
        type:String,
        require:true
    },
    journey_id:{
        type:String,
        require:true
    },
    invite_id:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }  
});

module.exports = mongoose.model("Invite",InviteSchema);