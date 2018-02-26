var db = require("../models");
var path = require("path");

module.exports = function(app) 
{
  app.post('/api/search', (req, res) => 
  { 
      var object = {};
      object =  req.body;
      object.UserId = "1";
      console.log(object);
      // TODO: Read POSTed form data and do something useful
      db.Condo.create(object).then(res.sendFile(path.join(__dirname, "../public/postcondo.html")));
  });
};
