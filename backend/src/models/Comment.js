const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    rating:{
        type:Number,
        default:0
    },
    content:{
        type:String
    },
    journey_id:{
        type:Number,
        require:true
    },
    user_id:{
        type:Number,
        require:true
    }
})

module.exports = mongoose.model("Comment",CommentSchema);