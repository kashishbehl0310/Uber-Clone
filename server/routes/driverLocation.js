 var express = require('express')
 var router = express.Router();
 var mongojs = require('mongojs')

 var db = mongojs("mongodb://kashish:kash123#@ds141613.mlab.com:41613/taxiapp", ["driversLocation"])

router.get("/driverLocationSocket", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.driversLocation.find((err, details) => {
        if(err){
            console.log(err)
        }else{
            res.json(details)
        }
    })
})


 router.put("/driverLocationSocket/:id", function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
 module.exports = router;