let db = require("../util/db");
//this will help w storing password hash and checking it
let argon2 = require("argon2");

//we expect the body to contain an object that contains the username and password and full name
//{"username": "doobiehouser", "password": "lol420", "full_name": "Doug Blazer"}
let register = async function (req,res) {
let username = req.body.username;
let password = req.body.password;
let full_name = req.body.full_name;
let passwordHash;
try{
    passwordHash = await argon2.hash(password)
} catch (err){
    console.log(err);
    res.sendStatus(500); //500 something broke internally
    return;
}
let sql = "insert into people (username, password_hash, full_name) values (?,?,?)"
    let params = [username, passwordHash, full_name];

    db.query(sql,params ,function (err,rows){
        if (err) {
            if (err.code == "ER_DUP_ENTRY"){
                res.status(400).send("Username already exists");
            } else {
            console.log('post for register failed on back end', err);
            res.sendStatus(500); //500 because error likely will originate from the backend.
            return;}
        } else {
            res.sendStatus(200);
            return;
        }});

}
let login = function (req,res) {

}

module.exports = {
    register,
    login
}