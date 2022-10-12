let express = require("express");
require("dotenv").config();
let app = express();

app.use(express.json());

let messageRoutes = require("./routes/messageRoutes");
let authRoutes = require("./routes/authRoutes");
const path = require("path");

app.use(messageRoutes);
app.use(authRoutes);

let port = process.env.PORT || 8080

app.listen(port, function (){

})
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/src/public.html')));