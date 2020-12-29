const express = require("express");

const {mysql} = require("../../db/mysql");
const Tracker = require("../../models/Tracker");
const auth = require("../../middleware/auth");
const moment = require("moment");

const Invite = require("../../models/Invite");
const mailer = require("../../mailer/mailer");


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

router.post("/:id1/:id2/passengers/invite",auth,async (req,res)=>{
    try{
        const user = req.user;
        if(user.isUpdater!==1){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const[checkResults] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( checkResults.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }
            const journeyString = JSON.stringify(checkResults[0]);
            const journey = JSON.parse(journeyString);
        const emails = req.body.emails.splice(",").map((email)=>email.trim());
        if(emails.length==0){
            return res.json({"code":"0","msg":"No emails!"})
        }
        let emailHTML = "<h2>You have been invited to join Tracknet for this journey from "+journey.starting_point+" to "+journey.destination + " departure at " +moment(journey.start_time).format('MMMM Do YYYY, h:mm:ss a') +" and estimated arrival time is at "+moment(journey.end_time).format('MMMM Do YYYY, h:mm:ss a') + ".</h2>\n <p>Your invite code is:</p> ";
        let subject = "Invite Code for Tracknet";
        let invites=[]
        for(let i=0;i<emails.length;i++){
            invites.push({user_email:emails[i],vehicle_id:req.params.id1,journey_id:req.params.id2,invite_id:Math.floor(100000 + Math.random() * 900000)})
        }
        await Invite.insertMany(invites); 
        invites.forEach(async (invite)=>{
            await mailer(invite.user_email,text="",html=emailHTML+"<h1>"+invite.invite_id+"</h1>",subject)
        })
        res.json({"code":"1","msg":"Invite Sent"});
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

router.post("/join",auth,async (req,res)=>{
    try{
        const user = req.user;
        if(user.isUpdater!==0){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const invite_id = req.body.invite_id;
        const invites = await Invite.find({user_email:user.email,invite_id});
        if(invites.length===0){
            return res.json({"code":"0","msg":"Invalid invite code"});
        }
        let found=false;
        let students = [{_id:user._id}];
        invites.forEach(async (invite)=>{
            if(invite.invite_id==invite_id){
                found=true;
                const [verifyResults] = await mysql.query("SELECT * FROM passengers WHERE user_id =? AND journey_id = ?",[req.user.id,invite.journey_id]);
                if(verifyResults.length!==0){
                    return res.json({msg:"Already Joined!"});
                }

                const [insertResults] = await mysql.query("INSERT INTO passengers (user_id,journey_id) VALUES (?)",[[req.user.id,invite.journey_id]]);
                await Invite.deleteMany({user_email:user.email,journey_id:invite.journey_id});
            }
        })
        if(!found){
            return res.json({"code":"0","msg":"Invalid invite code or you are not invited!"});
        }
        return res.json({"code":"1","msg":"join successfull!"});
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});


router.get("/me/journey",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===0){
            const[results] = await mysql.query("SELECT starting_point,destination,start_time,end_time,isActive,journey_id,vehicle_name,vehicle_type,vehicle_color,vehicle_number,image_url FROM journey INNER JOIN passengers ON journey.id = passengers.journey_id INNER JOIN vehicles ON journey.vehicle_id = vehicles.id  WHERE passengers.user_id=?",[req.user.id]);
            if(results.length==0){
                return res.json([]);
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
                return res.json({msg:"No journey found!"});
            }
            const journeyString = JSON.stringify(results[0]);
            const journey = JSON.parse(journeyString);
            if(journey.isActive && journey.isRunning!==0){
                const tracker = await Tracker.findOne({tracker_id:journey.tracker_id});
                if(!tracker){
                    return res.json({msg:"No tracking available"});
                }
                return res.json(tracker.location);
            }
            else if(journey.tracker_id==null || journey.tracker_id==""){
                return res.json({msg:"No tracking available"});
            }
            else{
                return res.json({msg:"Your journey is not active!"});
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
                const passengersString = JSON.stringify(results);
                const passengers = JSON.parse(passengersString);
                res.json(passengers);
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
                const[results,fields] = await mysql.query("DELETE FROM passengers WHERE journey_id=?",[req.params.id2]);
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

router.delete("/:id1/:id2/:id3",auth,async (req,res)=>{
    try {
        if(req.user.isUpdater===1){
            const[results,fields] = await mysql.query("SELECT * FROM journey INNER JOIN updaters ON updaters.vehicle_id = journey.vehicle_id  WHERE updaters.user_id = ? AND journey.id= ? AND journey.vehicle_id = ?",[req.user.id,req.params.id2,req.params.id1]);
            if( results.length==0){
                return res.status(400).json({msg:"No journey found!"});
            }else{
                const[results,fields] = await mysql.query("DELETE FROM passengers WHERE journey_id = ? AND user_id = ?",[req.params.id2,req.params.id3]);
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


module.exports = router;

