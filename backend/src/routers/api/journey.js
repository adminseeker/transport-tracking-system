const express = require("express");

const {mysql} = require("../../db/mysql");
const auth = require("../../middleware/auth");

const router = express.Router();

// id INT AUTO_INCREMENT PRIMARY KEY,
//     vehicle_id INT,
//     starting_point VARCHAR(255),
//     destination VARCHAR(255),
//     start_time TIMESTAMP,
//     end_time TIMESTAMP,
//     isActive INT,
//     FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE

router.post("/:id",auth,async (req,res)=>{
    try {
        const journey= req.body;
        if(req.user.isUpdater===1){
            await mysql.query("SELECT * FROM users INNER JOIN updaters ON users.id = updaters.user_id WHERE user_id= ? AND vehicle_id=?",[req.user.id,req.params.id],async (error,results,fields)=>{
                if(error) throw error;
                if( results.length==0){
                     res.status(400).json({msg:"No vehicle found!"});
                }else{
                    await mysql.query("INSERT INTO journey (vehicle_id,starting_point,destination,start_time,end_time,isActive) VALUES (?)",[[req.params.id,journey.starting_point,journey.destination,journey.start_time,journey.end_time,journey.isActive]],async (error,results,fields)=>{
                        if(error) throw error;
                        res.json({journey,user:req.user,journey_id:results.insertId});
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

router.get("/:id",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            await mysql.query("SELECT * FROM users INNER JOIN updaters ON users.id = updaters.user_id WHERE user_id= ? AND vehicle_id=?",[req.user.id,req.params.id],async (error,results,fields)=>{
                if(error) throw error;
                if( results.length==0){
                     res.status(400).json({msg:"No vehicle found!"});
                }else{
                    await mysql.query("SELECT * FROM journey WHERE vehicle_id = ? ",[req.params.id],(error,results,fields)=>{
                        if(error)throw error
                        const journeyString = JSON.stringify(results);
                        const journey = JSON.parse(journeyString);
                        res.json(journey);
                    })
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

router.patch("/:id1/update/:id2",auth,async (req,res)=>{
    try {
        const journey= req.body;
        if(req.user.isUpdater===1){
            await mysql.query("SELECT * FROM users INNER JOIN updaters ON users.id = updaters.user_id WHERE user_id= ? AND vehicle_id=?",[req.user.id,req.params.id1],async (error,results,fields)=>{
                if(error) throw error;
                if( results.length==0){
                     res.status(400).json({msg:"No vehicle found!"});
                }else{
                    await mysql.query("SELECT * FROM journey WHERE journey.id=?",[req.params.id2],async (error,results,fields)=>{
                        if(error) throw error;
                        if( results.length==0){
                            res.status(400).json({msg:"No journey found!"});
                       }else{
                            delete req.body.vehicle_id;
                            await mysql.query("UPDATE journey SET ? WHERE journey.id = ?",[req.body,req.params.id2],(error,results,fields)=>{
                                if(error) throw error;
                                res.json({msg:"update successfull!"});
                            });
                       }
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


module.exports = router;

