const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const router = express.Router();

router.get("/",auth,async (req,res)=>{
    try {
        await mysql.query("SELECT * FROM users WHERE email = ?",[req.user.email],(error,results,fields)=>{
            const userString = JSON.stringify(results[0]);
            const user = JSON.parse(userString);
            delete user.passwd;
            res.json(user);
        });
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

router.post("/login",async (req,res)=>{
    try {
        await mysql.query("SELECT id,email,passwd FROM users WHERE email = ?",[req.body.email],(error,results,fields)=>{
            if(error) throw error;
            if(results.length==0){
                return res.json({msg:"Authentication Error!"});
            }
            const userString = JSON.stringify(results[0]);
            const user_data = JSON.parse(userString);
            const user = {id:user_data.id,email:user_data.email}
            if(user_data.passwd === req.body.password){
                generateAuthToken(user,(token)=>{
                res.json({token,user});
                });   
            }
            else{
                res.json({msg:"Authentication Error!"});
            }
            
        });
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

module.exports = router;