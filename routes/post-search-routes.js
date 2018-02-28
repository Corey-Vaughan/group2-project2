var db = require("../models");
var path = require("path");

module.exports = function(app) 
{
  	app.get('/api/search:object', (req, res) => 
  	{	 
  		console.log(req.params.object);
      	db.Condo.findAll(
      	{
  			where: 
  			{
	    		location: req.params.object.location,
	    		price: {$lte: req.params.object.price},
	    		pets:{$lte: req.params.object.pets},
	    		guests:{$lte: req.params.object.guests}
	    	}

		}).then(function(data) 
		{
       	 	return res.json(data);
  		});
	});
};
