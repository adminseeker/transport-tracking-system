const express = require("express");
const connectToMongoDB = require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());

app.use("/api/auth/",require("./routers/api/auth"));
app.use("/api/users/",require("./routers/api/users"));
app.use("/api/vehicles/",require("./routers/api/vehicles"));
app.use("/api/journey/",require("./routers/api/journey"));
app.use("/api/passengers/",require("./routers/api/passengers"));

app.get("/",async (req,res)=>{
    await res.send("Welcome to transport tracking system!");
});

app.listen(port,()=>{
    console.log("Server started on port "+port);
});