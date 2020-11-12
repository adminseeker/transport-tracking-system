const express = require("express");
const path = require("path");
const {connectToMongoDB} = require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());

app.use("/api/auth/",require("./routers/api/auth"));
app.use("/api/users/",require("./routers/api/users"));
app.use("/api/vehicles/",require("./routers/api/vehicles"));
app.use("/api/journey/",require("./routers/api/journey"));
app.use("/api/passengers/",require("./routers/api/passengers"));

console.log(__dirname);
    app.use(express.static(path.join(__dirname ,"..","/..","/frontend","/build")));

    app.get("*",(req,res)=>{
        console.log(path.join(__dirname,"..","..","frontend","build","index.html"));
        res.sendFile(path.join(__dirname,"..","..","frontend","build","index.html"));
    })

app.listen(port,()=>{
    console.log("Server started on port "+port);
});

