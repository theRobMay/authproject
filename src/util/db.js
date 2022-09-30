let mysql = require('mysql');
//creating a variable for connection information to the mysql database
//using process.env to access variable in .env file that stores private login
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

connection.connect();
//running a query and callback function that tests the connection and if it fails we receive an error
//if the query is returned appropriately we get the time back
let sql = "select now()";
let callback = function (err, rows){
    if(err){
        console.log("Couldn't establish connection to DB", err)
    }  else {
        console.log("Connection successful, test query returned", rows)
    }
};


connection.query(sql, callback)


module.exports = connection;