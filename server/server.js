const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors')

var routes = require('./routes/index')
var bookings = require('./routes/bookings')
var driversLocation = require('./routes/driverLocation')
var driverLocationService = require('./routes/driverLocation')
var app = express();
var socket = require('socket.io')
var io = socket(); 
var port = process.env.PORT || 7777;


app.use(cors())

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.set('views', path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", routes)
app.use("/api", bookings)
app.use("/api", driversLocation)
app.use("/api", driverLocationService)

io.listen(app.listen(port, function(){
	console.log("Server running on port", port);
}));

app.io = io.on("connection", function(socket){
	console.log("Socket connected: " + socket.id);
});