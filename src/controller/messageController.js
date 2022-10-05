

let hello = function (req,res) {
    console.log("hello() in messageController");
    res.send("Hello there");
}

let privateHello = function (req,res){
    let userName = req.userInfo.fullName;
    console.log("privateHello() in messageController");
    res.send(`Hello there, I see you are logged in ${userName}`);
}

module.exports = {
    hello,privateHello
}