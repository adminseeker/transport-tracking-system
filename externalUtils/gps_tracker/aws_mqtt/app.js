const mqtt = require("mqtt");
const connectToMongoDB = require("./dbConnector");
const Tracking = require("./Tracker_db");

connectToMongoDB();

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD 
});

client.on("connect", ()=>{
    console.log("Connected to aws6 mqtt server!");
  client.subscribe("test", ()=>{
    client.on("message", async (topic, message, packet)=>{
        const trackerData = message.toString();
        if(trackerData){
            const arrayTrackerData = trackerData.split(";");
            const tracker_id =arrayTrackerData[0];
            const location={
                latitude:arrayTrackerData[1],
                longitude:arrayTrackerData[2],
                lastUpdated:Date.now()
            }
            try {
                const tracking = await Tracking.findOne({tracker_id});
                if(!tracking){
                    const tracking = new Tracking({tracker_id,location});
                    await tracking.save();
                    console.log(tracking);
                }else{
                    const updated = await Tracking.findOneAndUpdate({tracker_id},{location});
                    console.log(updated);
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
  });

});