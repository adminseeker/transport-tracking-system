const mySQL = require("mysql2");

const pool = mySQL.createPool({
    user:process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
    host:process.env.SQL_HOST,
    database:process.env.SQL_DATABASE_NAME
});

const mysql = pool.promise();

module.exports = {mysql};