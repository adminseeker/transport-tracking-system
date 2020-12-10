const express = require("express");
const bcrypt = require("bcryptjs");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const router = express.Router();

router.post("/",async (req,res)=>{

    try {
        const user_body = req.body;
        const[results,fields] = await mysql.query("SELECT email AS email FROM users WHERE email = ?",[user_body.email])
        if(results.length!==0 && results[0].email===user_body.email){
            return res.json({msg:"Email already registered!"});
        }else{
            const salt = await bcrypt.genSalt(10);
            user_body.password = await bcrypt.hash(user_body.password,salt);
            const[results,fields] = await mysql.query("INSERT INTO users (first_name,last_name,email,passwd,gender,date_of_birth,isUpdater) VALUES (?)",[[user_body.first_name,user_body.last_name,user_body.email,user_body.password,user_body.gender,user_body.date_of_birth,user_body.isUpdater]]);
            user_body.id = results.insertId;
            let user = {id:user_body.id,email:user_body.email,isUpdater:user_body.isUpdater};
            generateAuthToken(user,(token)=>{
                delete user_body.password;
                user = user_body;
                res.json({token});
            }); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});

router.patch("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
    const updates = req.body;
    if(updates.email || updates.isUpdater){
        return res.json({"msg":"This field cannot be Updated!"})
    }
    const[results] = await mysql.query("UPDATE users SET ? WHERE id = ?",[updates,user.id]);
    const JSONstring = JSON.stringify(results);
    const result = JSON.parse(JSONstring);
    if(result.changedRows==1){
        return res.json({"code":"1","msg":"Updated Successfully!"})
    }
        res.json({"code":"0","msg":"Error in updating account!"})
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.patch("/password",auth,async (req,res)=>{
    try {
    let newPassword = req.body.newPassword;
    const password = req.body.password;
    if(newPassword && password){
        const [results] =await mysql.query("SELECT * FROM users WHERE id = ?",[req.user.id]);
        const JSONstring = JSON.stringify(results[0]);
        const user = JSON.parse(JSONstring);
        if(!user){
            return res.json({"msg":"invalid user!"});
        }
        const isMatch = await bcrypt.compare(password,user.passwd);
        if(!isMatch){
            return res.json({code:"0",msg:"incorrect current password!"});
        }
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword,salt);
        const[updatedResults] = await mysql.query("UPDATE users SET passwd = ? WHERE id = ?",[newPassword,user.id]);
        const JSONstring2 = JSON.stringify(updatedResults);
        const result = JSON.parse(JSONstring2);
        if(result.changedRows==1){
            return res.json({code:"1","msg":"Password Changed Successfully!"});
        }
            return res.json({code:"2","msg":"Error in changing password!"});
            
        }
            return res.json({code:"2","msg":"Error in changing password!"});

    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

router.delete("/",auth,async (req,res)=>{
    try {

        const[results] =await mysql.query("DELETE FROM users WHERE id = ?",[req.user.id]);
        const JSONstring = JSON.stringify(results);
        const result = JSON.parse(JSONstring);
        console.log(result);
        if(result.affectedRows==1){
            return res.json({code:"1","msg":"User deleted Successfully!"});
        }
            return res.json({code:"2","msg":"Error in deleting user!"});
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

module.exports = router;

