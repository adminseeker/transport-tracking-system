const mongoose = require("mongoose");

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log("Connected to MongoDB Database!");
    } catch (error) {
        console.log("Connection to MongoDB failed!");
        console.log(error);   
    }
}

module.exports = connectToMongoDB;