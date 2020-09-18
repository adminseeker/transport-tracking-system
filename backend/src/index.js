const express = require("express");
const connectToMongoDB = require("./db/mongoose");
const {connectToMySQL} = require("./db/mysql");

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();
connectToMySQL();

app.use(express.json());

app.use("/api/auth/",require("./routers/api/auth"));
app.use("/api/users/",require("./routers/api/users"));
app.use("/api/vehicles/",require("./routers/api/vehicles"));

app.get("/",async (req,res)=>{
    await res.send("Welcome to transport tracking system!");
});

app.listen(port,()=>{
    console.log("Server started on port "+port);
});