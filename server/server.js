const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

var routes = require('./routes/index')
var bookings = require('./routes/bookings')
var driversLocation = require('./routes/driverLocation')

var app = express();
var socket = require('socket.io')
var io = socket(); 
var port = process.env.PORT || 7777;

io.listen (app.listen(port, function(){
    console.log(`Server running on port ${port}`);   
}))

app.set('views', path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)
app.use("/api", bookings)
app.use("/api", driversLocation)