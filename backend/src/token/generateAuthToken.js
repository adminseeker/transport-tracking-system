const jwt = require("jsonwebtoken");

const generateAuthToken = (user,cb)=>{
    jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"5m"},(error,token)=>{
        if(error) throw error;
        cb(token);
    });
}

module.exports = generateAuthToken;