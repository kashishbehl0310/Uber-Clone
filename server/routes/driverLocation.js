 var express = require('express')
 var router = express.Router();
 var mongojs = require('mongojs')

 var db = mongojs("mongodb://eman:eman@ds163181.mlab.com:63181/taxiapp", ["driversLocation"])

 router.put("/driverLocationSocket/:id", function(req, res, next){

	var io = req.app.io;
	if(!req.body){
		res.status(400);
		res.json({
			"error":"Bad data"
		});

	}else{
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
 module.exports = router;