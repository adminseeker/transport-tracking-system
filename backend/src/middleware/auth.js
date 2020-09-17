const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{
    try {
        const token = req.header("x-auth-token");
        await jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
            if(error) throw error;
            req.user=decoded.user;
            req.token=token;
            next();
        });
    } catch (error) {
        res.status(401).json({error:"Invalid Token!"});
    }
};

module.exports = auth;