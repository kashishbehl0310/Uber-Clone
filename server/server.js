const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

var routes = require('./routes/index')
var bookings = require('./routes/bookings')

var app = express();

var port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})

app.set('views', path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)
app.use("/api", bookings)