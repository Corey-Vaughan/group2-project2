// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var app      = express();

var passport = require('passport');
var flash    = require('connect-flash');
//const aws = require('aws-sdk');
//const S3_BUCKET = process.env.S3_BUCKET;
/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
//aws.config.region = 'us-east-1';
// Sets up the Express App
// =============================================================
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("./public"));

// Routes
// =============================================================
require("./routes/post-condo-routes.js")(app);
require("./routes/post-user-routes.js")(app);
require("./routes/post-search-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
     console.log("App listening on PORT " + PORT);
  });
});

// User Authentication Configuration
// =============================================================
require('./config/passport')(passport); // pass passport for configuration




// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));

// required for passport
app.use(session({
	secret: 'wearethebestgroup',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./routes/user-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);