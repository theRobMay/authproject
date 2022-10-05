let db = require("../util/db");
//this will help w storing password hash and checking it
let argon2 = require("argon2");
//token signature lib
let jwt = require("jsonwebtoken");

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
    let username = req.body.username;
    let password = req.body.password;

    let sql = "select id, username, password_hash, full_name from people where username = ?"
    let params = [username]
    db.query(sql, params, async function (err, rows) {
        if (err) {
            console.log("could not get hash", err);
            res.sendStatus(500);
        } else {
            if (rows.length > 1) {
                console.log("returned too many rows", username);
                res.sendStatus(500);
            } else if (rows.length == 0) {
                res.sendStatus(400);
            } else {
                let pwhash = rows[0].password_hash;
                let fName = rows[0].full_name;
                let userid = rows[0].id;

                let pass = false
                try {
                    pass = await argon2.verify(pwhash, password);
                } catch (err) {
                    console.log("failed to verify pass", err);
                }
                if (pass){
                    let token = {
                        "fullName": fName,
                        "userID":userid
                    };
                    //sign the token, send signed token
                    let signedToken = jwt.sign(token, process.env.JWT_SECRET)
                    res.json(signedToken)

                } else {
                    res.sendStatus(400);
                }
            }
        }
    })
}

module.exports = {
    register,
    login
}