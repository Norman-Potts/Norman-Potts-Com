const express = require('express'); 
const path = require('path');
const port = 5000;
var ROUTER = express.Router();
 


 
const WebPortfolio = require('./WebPortfolio');
 
ROUTER.use('/resources', express.static(path.resolve('public/Home/resources')));


////When root is requested send my.html
ROUTER.get('/', function(req, res) {	console.log("Get request made to / ");
	res.sendFile(path.resolve('Home/NormanPottsCom.html'));
});


ROUTER.use('/WebPortfolio', WebPortfolio);
ROUTER.all(/\/WebPortfolio\/*/, WebPortfolio); 


 





module.exports = ROUTER;
 