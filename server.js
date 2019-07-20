console.log("Start server.js");
const express = require('express'); 
const path = require('path');
const EXPRESSVALIDATOR = require('express-validator');
const BODYPARSER = require('body-parser');
const COOKIEPARSER = require('cookie-parser');
const port = 5000;
const REGULARROUTES = require('./routes/regularroutes');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');




app.use(EXPRESSVALIDATOR());
app.use(BODYPARSER.json());
app.use(BODYPARSER.urlencoded({ extended: false}));
app.use(COOKIEPARSER());
app.set('view engine','ejs');
app.use(flash());
//// Middleware for Express Session.
app.use(session({  secret: 'secret',  saveUninitialized: true,  resave: true	}));
app.use(passport.initialize());
app.use(passport.session());
//// Express Validator Middleware.



app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg'); //// global variable for success messages.
	res.locals.error_msg = req.flash('error_msg');     //// for any error messages
	res.locals.error = req.flash('error');             //// passport sets its own flash messages as error.
	res.locals.Given_Username = req.flash('Given_Username'); //// returning username to input...
	res.locals.user = req.user || null;
	next(); //// Routing documentation for express... "call next() within the body of the function to hand off control to the next callback."
});
app.listen(port);


app.use('/', REGULARROUTES);



 