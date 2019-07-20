const express = require('express'); 
const path = require('path');
var ROUTER = express.Router();



const ToDoList = require('./ToDoList');
const Schedule = require('./Schedule');


////Set Static Path to /Home/resources folder.
ROUTER.use('/resources', express.static(path.resolve('public/Home/resources')));

////When root is requested send my.html
ROUTER.get('/', function(req, res) {	console.log("Get request made to /WebPortfolio"); 
	res.sendFile(path.resolve('public/Home/WebPortfolio.html') );
});

ROUTER.use('/Schedule',Schedule);
ROUTER.all(/\/Schedule\/*/, Schedule); 

ROUTER.use('/ToDoList', ToDoList);
ROUTER.all(/\/ToDoList\/*/, ToDoList); 




module.exports = ROUTER;