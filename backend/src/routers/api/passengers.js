const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/:id1/:id2",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[checkResults] = await mysql.query("SELECT * FROM users INNER JOIN updaters ON users.id = updaters.user_id WHERE user_id= ? AND vehicle_id=?",[req.user.id,req.params.id1]);
            if( checkResults.length==0){
                return res.status(400).json({msg:"No vehicle found!"});
            }
            const[results,fields] = await mysql.query("SELECT id FROM users WHERE email IN (?) AND isUpdater = 0;",[req.body.emails]);
            if( results.length==0){
                return res.status(400).json({msg:"No passengers found!"});
            }else{
                const uidString = JSON.stringify(results);
                const uids = JSON.parse(uidString);
                const uidArray = uids.map((uid)=>(uid.id));
                const values = uids.map((uid)=>{
                    return [uid.id, parseInt(req.params.id2)];
                })
                const [verifyResults] = await mysql.query("SELECT * FROM passengers WHERE user_id IN (?) AND journey_id = ?",[uidArray,req.params.id2]);
                if(verifyResults.length!==0){
                    return res.json({msg:"repeated passengers!",passengers:verifyResults});
                }
                const [insertResults] = await mysql.query("INSERT INTO passengers (user_id,journey_id) VALUES ?",[values]);
                res.json({msg:"Added passengers successfully!"}) 
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});

module.exports = router;

