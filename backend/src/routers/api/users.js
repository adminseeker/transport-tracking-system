const express = require("express");
const bcrypt = require("bcryptjs");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const router = express.Router();

router.post("/",async (req,res)=>{

    try {
        const user_body = req.body;
        await mysql.query("SELECT email AS email FROM users WHERE email = ?",[user_body.email],async (error,results,fields)=>{
            if(error) throw error;
            if(results.length!==0 && results[0].email===user_body.email){
                res.status(400).json({msg:"email already exists!"});
            }else{
                const salt = await bcrypt.genSalt(10);
                user_body.password = await bcrypt.hash(user_body.password,salt);
                await mysql.query("INSERT INTO users (first_name,last_name,email,passwd,gender,date_of_birth,isUpdater) VALUES (?)",[[user_body.first_name,user_body.last_name,user_body.email,user_body.password,user_body.gender,user_body.date_of_birth,user_body.isUpdater]],(error,results,fields)=>{
                if(error) throw error;
                user_body.id = results.insertId;
                let user = {id:user_body.id,email:user_body.email,isUpdater:user_body.isUpdater};
                generateAuthToken(user,(token)=>{
                    delete user_body.password;
                    user = user_body;
                    res.json({user,token});
                    });
                });   
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});


module.exports = router;

