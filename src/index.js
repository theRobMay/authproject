let express = require("express");
require("dotenv").config();
let app = express();

app.use(express.json());

let messageRoutes = require("./routes/messageRoutes");
let authRoutes = require("./routes/authRoutes");

app.use(messageRoutes);
app.use(authRoutes);

let port = process.env.PORT || 3306

app.listen(port, function (){

})