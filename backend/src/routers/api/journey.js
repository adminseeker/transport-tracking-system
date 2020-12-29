const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");

const moment = require("moment");

const router = express.Router();

router.post("/:id",auth,async (req,res)=>{
    try {
        const journey= req.body;
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT * FROM users INNER JOIN updaters ON users.id = updaters.user_id WHERE user_id= ? AND vehicle_id=?",[req.user.id,req.params.id]);
            if( results.length==0){
                return res.status(400).json({msg:"No vehicle found!"});
            }else{
                const[results,fields] = await mysql.query("INSERT INTO journey (vehicle_id,starting_point,destination,start_time,end_time,isActive) VALUES (?)",[[req.params.id,journey.starting_point,journey.destination,journey.start_time,journey.end_time,journey.isActive]]);
                res.json({msg:"Journey Added Successfully"});
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});

router.get("/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT journey.id,journey.vehicle_id,starting_point,destination,start_time,end_time,isActive FROM journey INNER JOIN updaters ON journey.vehicle_id = updaters.vehicle_id WHERE updaters.user_id = ? AND journey.vehicle_id=?;",[req.user.id,req.params.id]);
            if( results.length==0){
                    return res.json([]);
            }else{
                const journeyString = JSON.stringify(results);
                const journey = JSON.parse(journeyString);
                
                res.json(journey);
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.patch("/:id1/:id2",auth,async (req,res)=>{
    try {
        const journey= req.body;
        if(req.user.isUpdater===1){
            if(JSON.stringify(req.body)=="{}")
                return res.json({code:"0",msg:"nothing to update"});
            const[results,fields] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( results.length==0){
                return res.json({code:"0",msg:"No journey found!"});
            }else{
                delete req.body.vehicle_id;
                const[results,fields] = await mysql.query("UPDATE journey SET ? WHERE journey.id = ?",[req.body,req.params.id2]);
                res.json({code:"1",msg:"update successfull!"});
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});

router.delete("/:id1/:id2",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }else{
                const[results,fields] = await mysql.query("DELETE FROM journey WHERE journey.vehicle_id = ? AND journey.id = ?",[req.params.id1,req.params.id2]);
                if(results.affectedRows==0){
                    return res.json({msg:"no journey found!"})
                };
                res.json({msg:"deleted journey  successfully!"});
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

