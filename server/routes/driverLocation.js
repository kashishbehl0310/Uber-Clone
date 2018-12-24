 var express = require('express')
 var router = express.Router();
 var mongojs = require('mongojs')

 var db = mongojs("mongodb://kashish:kash123#@ds141613.mlab.com:41613/taxiapp", ["driversLocation"])

router.get("/driverLocationSocket", (req, res, next) => {
    db.driversLocation.find((err, details) => {
        if(err){
            console.log(err)
        }else{
            res.json(details)
        }
    })
})


 router.put("/driverLocationSocket/:id", function(req, res, next){
	var io = req.app.io;
	if(!req.body){
		res.status(400);
		res.json({
			"error":"Bad data"
		});

	}else{
		console.log(req.params.id)
		db.driversLocation.update({_id:mongojs.ObjectId(req.params.id)}, 
			{$set: {socketId:req.body.socketId}}, function(err, updateDetails){
				if(err){
                    res.send(err);
                    console.log(`An error occured ${err}`)

				}else{
                    res.send(updateDetails);
                    console.log(req.body)
				}
		});
	}
});

router.get("/driversLocationService", (req,res, next) => {
	db.driversLocation.ensureIndex({"coordinate":"2dsphere"});
	db.driversLocation.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
				res.send(err);

			}else{
				res.send(location);
			}
	});
})

router.get("/driversLocationService/:id", (req, res, next) => {
	var io = req.app.io;
	db.driversLocation.findOne({driverId: req.params.id}, function(err, location){
		if(err){
			res.send(err)
		}
		res.send(location);
		io.emit("trackDriver", location)
	})
})
router.put("/driversLocationService/:id", function(req, res, next){
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.driversLocation.update({_id: mongojs.ObjectId(req.params.id)},{ $set: {
        	socketId:location.socketId,
        	coordinate:{
                "type": "Point",
        		coordinates:[
                    longitude,
        			latitude
    			]
    		}
    	}}, function(err, updateDetails){
        if (err){
            console.log(updateDetails);
            res.send(err);
        }
        if (updateDetails){

            //Get updated location
            db.driversLocation.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, updatedLocation){
                if (error){
                    res.send(error);
                }
                res.send(updatedLocation);
                io.emit("action", {
                    type:"UPDATE_DRIVER_LOCATION",
                    payload:updatedLocation
                });
            });
        }
    });
    }
});
 module.exports = router;