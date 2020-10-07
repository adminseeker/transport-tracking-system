const mongoose = require("mongoose");

const TrackerSchema = mongoose.Schema({
    tracker_id:{
        type:String
    },
    location:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        },
        lastUpdated:{
            type:Date
        }
    }
})

module.exports = mongoose.model("Tracker",TrackerSchema);