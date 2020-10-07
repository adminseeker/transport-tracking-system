const mongoose = require("mongoose");

const TrackerSchema = mongoose.Schema({
    vehicle_id:{
        type:Number
    },
    tracker_id:{
        type:String
    },
    location:[{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        },
        time:{
            type:Date
        }
    }]
})

module.exports = mongoose.model("Tracker",TrackerSchema);