const express = require("express");

const {mysql} = require("../../db/mysql");
const Tracker = require("../../models/Tracker");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/:id1/:id2",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[checkResults] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( checkResults.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }
            const[results] = await mysql.query("SELECT id FROM users WHERE email IN (?) AND isUpdater = 0;",[req.body.emails]);
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

router.get("/me/journey",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===0){
            const[results] = await mysql.query("SELECT * FROM journey INNER JOIN passengers ON journey.id = passengers.journey_id INNER JOIN vehicles ON journey.vehicle_id = vehicles.id  WHERE passengers.user_id=?",[req.user.id]);
            if(results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }
            const journeysString = JSON.stringify(results);
            const journeys = JSON.parse(journeysString);
            res.json(journeys);
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/me/track/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===0){
            const[results] = await mysql.query("SELECT * FROM journey INNER JOIN passengers ON journey.id = passengers.journey_id INNER JOIN vehicles ON journey.vehicle_id = vehicles.id  WHERE passengers.user_id=? AND journey.id=?",[req.user.id,req.params.id]);
            if(results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }
            const journeyString = JSON.stringify(results[0]);
            const journey = JSON.parse(journeyString);
            if(journey.isActive){
                const tracker = await Tracker.findOne({tracker_id:journey.tracker_id});
                return res.json(tracker.location);
            }
            else if(journey.tracker_id==null){
                return res.json({msg:"No tracking available"});
            }
            else{
                return res.json({msg:"Your journey is inActive"});
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:id1/:id2",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[checkResults] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( checkResults.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }
            else{
                const[results,fields] = await mysql.query("SELECT passengers.id,user_id,first_name,last_name,email,date_of_birth,gender,journey_id FROM users INNER JOIN passengers ON users.id = passengers.user_id WHERE journey_id=?;",[req.params.id2]);
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

router.delete("/:id1/:id2/:id3",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }else{
                const[results,fields] = await mysql.query("DELETE FROM passengers WHERE id = ?",[req.params.id3]);
                if(results.affectedRows==0){
                    return res.json({msg:"no journey found!"})
                };
                res.json({msg:"deleted passenger successfully!"});
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id1/:id2/all",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }else{
                const[results,fields] = await mysql.query("DELETE FROM passengers WHERE journey_id=",[req.params.id2]);
                if(results.affectedRows==0){
                    return res.json({msg:"no journey found!"})
                };
                res.json({msg:"deleted passengers successfully!"});
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

