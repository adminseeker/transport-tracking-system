const mySQL = require("mysql");

const mysql = mySQL.createConnection({
    user:process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
    host:process.env.SQL_HOST,
    database:process.env.SQL_DATABASE_NAME
});

const connectToMySQL = async ()=>{
    await mysql.connect((error)=>{
        if(error){
            console.log("Connection to MySQL failed!")
            console.log(error);
        }
        else{
            console.log("Connected to MySQL Database");
        }
    })
}

module.exports = {connectToMySQL,mysql};