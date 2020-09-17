const express = require("express");
const bcrypt = require("bcryptjs");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const router = express.Router();

router.post("/",async (req,res)=>{

    try {
        const user_body = req.body;
        await mysql.query("SELECT email AS email FROM users WHERE email = ?",[user_body.email],(error,results,fields)=>{
            if(error) throw error;
            if( results.length!==0 && results[0].email===user_body.email){
                return res.status(400).json({msg:"email already exists!"});
            }
        });
        const salt = await bcrypt.genSalt(10);
        user_body.password = await bcrypt.hash(user_body.password,salt);
        await mysql.query("INSERT INTO users (first_name,last_name,email,passwd,gender,date_of_birth) VALUES (?)",[[user_body.first_name,user_body.last_name,user_body.email,user_body.password,user_body.gender,user_body.date_of_birth]],(error,results,fields)=>{
            if(error) throw error;
            let user = {id:user_body.id,email:user_body.email};
            generateAuthToken(user,(token)=>{
                delete user_body.password;
                user = user_body;
                res.json({user,token});
            });
        });   
    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});


module.exports = router;

