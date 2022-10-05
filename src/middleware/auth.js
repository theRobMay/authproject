let jwt = require("jsonwebtoken");

let checkJWT = function (req,res,next){
//read token from header
    let headerValue = req.get("authorization");
    let signedToken;
    if (headerValue){
        let parts = headerValue.split(" ");
        signedToken = parts[1];
    }
    if (!signedToken){
        console.log("Missing signed Token");
        res.sendStatus(403);
        return
    }
//verify token has not been edited
//this will return the unsigned token, or an err
    try {
        let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)

        req.userInfo = unsigned;

    } catch (err){
        console.log("token verification checkJWT() failed", err)
        res.sendStatus(403);
        return;
    }
//if token is good, call next function in chain
//if we are at this point the token should be good
//if no token was passed we would have quit
//if the token was bad we would have quit
    next()
}
module.exports = {checkJWT}