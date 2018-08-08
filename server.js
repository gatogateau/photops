var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var routes = require("./routes");
var app = express();
var morgan = require('morgan')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var passport = require('./models/passport');



// listen on port 3001
var PORT = process.env.PORT || 3001;


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, User-Agent, Accept, Authorization");
	next();
  });
// Define middleware here
// commented out from JJ
app.use(morgan('dev'))		
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Sessions
app.use(
	session({
		secret: 'phot-opsy', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Add routes, both API and view

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/photops");

app.use(routes);

// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
