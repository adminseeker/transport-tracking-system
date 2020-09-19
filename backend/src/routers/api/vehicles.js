const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/",auth,async (req,res)=>{
    try {
        const vehicle= req.body;
        if(req.user.isUpdater===1){
            await mysql.query("SELECT vehicle_number FROM vehicles WHERE vehicle_number = ?",[vehicle.vehicle_number],async (error,results,fields)=>{
                if(error) throw error;
                if( results.length!==0 && results[0].vehical_number===vehicle.vehical_number){
                     res.status(400).json({msg:"This vehicle number already exists!"});
                }else{
                    await mysql.query("INSERT INTO vehicles (vehicle_name,vehicle_type,vehicle_color,image_url,vehicle_number) VALUES (?)",[[vehicle.vehicle_name,vehicle.vehicle_type,vehicle.vehicle_color,vehicle.image_url,vehicle.vehicle_number]],async (error,results,fields)=>{
                        if(error) throw error;
                        const vehicle_id = results.insertId;
                        await mysql.query("INSERT INTO updaters (user_id,vehicle_id) VALUES (?)",[[req.user.id,vehicle_id]],(error,results,fields)=>{
                            if(error) throw error;
                            res.json({vehicle,user:req.user,updater_id:results.insertId});
                        });
                    });
                }
            });

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
            await mysql.query("SELECT * FROM vehicles INNER JOIN updaters ON updaters.vehicle_id = vehicles.id AND updaters.user_id= ? ",[req.user.id],(error,results,fields)=>{
                if(error)throw error
                const vehiclesString = JSON.stringify(results);
                const vehicles = JSON.parse(vehiclesString);
                res.json(vehicles);
            })
        }else{
            res.json({msg:"Authorization Error!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});




module.exports = router;

