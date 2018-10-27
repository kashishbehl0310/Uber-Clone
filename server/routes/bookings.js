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


router.post("/bookings", function(req, res, next){
	var booking = req.body.data;

	if(!booking.userName){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		db.bookings.save(booking, function(err, savedBooking){
			if(err){
				res.send(err);
			}
			res.json(savedBooking);
		});
	}
});


module.exports = router;