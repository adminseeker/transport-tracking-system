const express = require("express");

const {mysql} = require("../../db/mysql");
const Tracker = require("../../models/Tracker");

const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/",auth,async (req,res)=>{
    try {
        const vehicle= req.body;
        if(req.user.isUpdater===1){
            const[results] = await mysql.query("SELECT vehicle_number,tracker_id FROM vehicles WHERE vehicle_number = ?",[vehicle.vehicle_number]);
            if( results.length!==0 && results[0].vehicle_number===vehicle.vehicle_number ){
                return res.json({msg:"This vehicle number already exists!"});
            }
            else if( results.length!==0 && results[0].tracker_id===vehicle.tracker_id){
                return res.json({msg:"This tracker id already exists!"});
            }
            else{
                const[vehicleResults] = await mysql.query("INSERT INTO vehicles (vehicle_name,vehicle_type,vehicle_color,image_url,vehicle_number,tracker_id,isRunning) VALUES (?)",[[vehicle.vehicle_name,vehicle.vehicle_type,vehicle.vehicle_color,vehicle.image_url,vehicle.vehicle_number,vehicle.tracker_id,vehicle.isRunning]]);
                const vehicle_id = vehicleResults.insertId;
                const[updaterResults] = await mysql.query("INSERT INTO updaters (user_id,vehicle_id) VALUES (?)",[[req.user.id,vehicle_id]]);
                res.json({"msg":"Vehicle Added Successfully!!"});
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
});

router.get("/track/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results] = await mysql.query("SELECT * FROM vehicles INNER JOIN updaters ON updaters.vehicle_id = vehicles.id WHERE updaters.user_id= ? AND vehicles.id=?",[req.user.id,req.params.id]);
            if(results.length===0){
                return res.json({msg:"no vehicle found!"});
            }
            const vehicleString = JSON.stringify(results[0]);
            const vehicle = JSON.parse(vehicleString);
            if(vehicle.tracker_id==null || vehicle.tracker_id==""){
                return res.json({msg:"No tracking available"});
            }
            else{
                const tracker = await Tracker.findOne({tracker_id:vehicle.tracker_id});
                if(!tracker){
                    return res.json({msg:"No tracking available"});
                }
                return res.json(tracker.location);
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results] = await mysql.query("SELECT * FROM vehicles INNER JOIN updaters ON updaters.vehicle_id = vehicles.id WHERE updaters.user_id= ? ",[req.user.id]);
            const vehiclesString = JSON.stringify(results);
            const vehicles = JSON.parse(vehiclesString);
            if(vehicles.length===0){
                return res.json([]);
            }
            res.json(vehicles);
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.patch("/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            if(JSON.stringify(req.body)=="{}")
                return res.json({code:"0",msg:"nothing to update"});
            const[results] = await mysql.query("SELECT * FROM vehicles JOIN updaters ON vehicles.id=updaters.vehicle_id WHERE updaters.vehicle_id = ? AND updaters.user_id = ?;",[req.params.id,req.user.id]);
            const vehicleString = JSON.stringify(results);
            const vehicle = JSON.parse(vehicleString);
            if(vehicle.length===0){
                return res.json({code:"0",msg:"no vehicle found!"});
            }
            else{
                if(req.body.vehicle_number){
                    const[results] = await mysql.query("SELECT vehicle_number FROM vehicles WHERE vehicle_number = ?",[req.body.vehicle_number]);
                    if( results.length!==0 && results[0].vehicle_number===req.body.vehicle_number){
                            return res.json({code:"0",msg:"This vehicle number already exists!"});
                    }
                } 
                if(req.body.tracker_id){
                    const[results] = await mysql.query("SELECT tracker_id FROM vehicles WHERE tracker_id = ?",[req.body.tracker_id]);
                    if( results.length!==0 && results[0].tracker_id==req.body.tracker_id){
                        return res.json({code:"0",msg:"This tracker id already exists!"});
                    }
                }
                    
                const[results] = await mysql.query("UPDATE vehicles SET ? WHERE vehicles.id = ?",[req.body,req.params.id]);
                return res.json({code:"1",msg:"update successfull!"});         
                
            }
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results] =await mysql.query("SELECT * FROM vehicles JOIN updaters ON vehicles.id=updaters.vehicle_id WHERE vehicles.id = ? AND updaters.user_id = ?;",[req.params.id,req.user.id]);
            const vehicleString = JSON.stringify(results);
            const vehicle = JSON.parse(vehicleString);
            if(vehicle.length===0){
                return res.json({msg:"no vehicle found!"});
            }
            else{
                const[results] =await mysql.query("DELETE FROM vehicles WHERE vehicles.id = ?",[req.params.id]);
                res.json({msg:"deleted vehicle successfully!"})
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

