const mongoose = require("mongoose");

const JourneySchema = mongoose.Schema({
    journey_id:{
        type:Number,
        require:true
    },
    path:[{
        location_name:{
            type:String
        },
        location_data:{
            type:String
        }
    }]
})

module.exports = mongoose.model("Journey",JourneySchema);