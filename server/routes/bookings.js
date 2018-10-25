const express = require('express')
const router = express.Router()
const mongojs = require('mongojs')

var db = mongojs("mongodb://kashish:kash123#@ds141613.mlab.com:41613/taxiapp", ["bookings"])

router.get('/bookings' , (req, res, next) => {
    db.bookings.find(function(err, bookings){
        if(err){
            console.log(err)
        }
        res.json(bookings)
    })
})

router.post('/bookings', (req, res, next) => {
    var booking = req.body.data;
    if(!booking.username){
        res.status(400);
        res.send('Bad data')
    }else{
        db.bookings.save(booking, function(err, result){
            if(err){
                console.log(err)
            }
            res.json(result)
        })
    }
})

module.exports = router;