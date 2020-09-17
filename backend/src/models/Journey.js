const mongoose = require("mongoose");

const JourneySchema = mongoose.Schema({
    journey_id:{
        type:Number,
        require:true
    },
    path:[{
        location:{
            type:String
        }
    }]
})

module.exports = mongoose.model("Journey",JourneySchema);