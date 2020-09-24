const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/",auth,async (req,res)=>{
    try {
        const vehicle= req.body;
        if(req.user.isUpdater===1){
            const[results] = await mysql.query("SELECT vehicle_number FROM vehicles WHERE vehicle_number = ?",[vehicle.vehicle_number]);
            if( results.length!==0 && results[0].vehical_number===vehicle.vehical_number){
                return res.status(400).json({msg:"This vehicle number already exists!"});
            }else{
                const[vehicleResults] = await mysql.query("INSERT INTO vehicles (vehicle_name,vehicle_type,vehicle_color,image_url,vehicle_number) VALUES (?)",[[vehicle.vehicle_name,vehicle.vehicle_type,vehicle.vehicle_color,vehicle.image_url,vehicle.vehicle_number]]);
                const vehicle_id = vehicleResults.insertId;
                const[updaterResults] = await mysql.query("INSERT INTO updaters (user_id,vehicle_id) VALUES (?)",[[req.user.id,vehicle_id]]);
                res.json({vehicle,user:req.user,updater_id:updaterResults.insertId});
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
            const[results] = await mysql.query("SELECT * FROM vehicles INNER JOIN updaters ON updaters.vehicle_id = vehicles.id AND updaters.user_id= ? ",[req.user.id]);
            const vehiclesString = JSON.stringify(results);
            const vehicles = JSON.parse(vehiclesString);
            res.json(vehicles);
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.patch("/update/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results] = await mysql.query("SELECT * FROM vehicles JOIN updaters ON vehicles.id=updaters.vehicle_id WHERE vehicles.id = ? AND updaters.user_id = ?;",[req.params.id,req.user.id]);
            const vehicleString = JSON.stringify(results);
            const vehicle = JSON.parse(vehicleString);
            if(vehicle.length===0){
                return res.json({msg:"no vehicle found!"});
            }
            else{
                if(req.body.vehicle_number){
                    const[results] = await mysql.query("SELECT vehicle_number FROM vehicles WHERE vehicle_number = ?",[req.body.vehicle_number]);
                    if( results.length!==0 && results[0].vehical_number===vehicle.vehical_number){
                            return res.status(400).json({msg:"This vehicle number already exists!"});
                    }else{
                        const[results] = await mysql.query("UPDATE vehicles SET ? WHERE vehicles.id = ?",[req.body,req.params.id]);
                            res.json({msg:"update successfull!"});
                    }
                }
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

