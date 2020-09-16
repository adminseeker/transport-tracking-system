const express = require("express");
const connectToMongoDB = require("./db/mongoose");
const connectToMySQL = require("./db/mysql");

const app = express();
connectToMongoDB();
connectToMySQL();

const port = process.env.PORT || 3000;

app.get("/",async (req,res)=>{
    await res.send("Welcome to transport tracking system!");
});

app.listen(port,()=>{
    console.log("Server started on port "+port);
});