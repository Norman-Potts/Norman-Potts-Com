const express = require('express'); 
const path = require('path');
var ROUTER = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').Server.app; 
const ejs = require('ejs');
const fs = require('fs');  
const sqlite3 = require("sqlite3").verbose();
const homeURL = "http://localhost:5000/WebPortfolio/Schedule/";
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
function getTodayyyymmdd() {	
	var todaysdate = new Date();
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); /* January is 0! */
	var yyyy = todaysdate.getFullYear()
	mm = m+1;		
	if(dd<10) {  dd = '0'+dd;  } 
	if(mm<10) {  mm = '0'+mm;  } 		
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;	
	return yyyymmdd;
}
const Today_yymmdd = getTodayyyymmdd();
function getDisplayDate() {
	var todaysdate = new Date();
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); //January is 0!
	var yyyy = todaysdate.getFullYear()
	mm = m+1;		
	if(dd<10) {  dd = '0'+dd;  } 
	if(mm<10) {  mm = '0'+mm;  } 		
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;						
	var today = yyyymmdd;
	var displaydate = ""+yyyy+"-"+Arrmonths[m]+"-"+dd;	
	return displaydate;
}
const Arrmonths = ['January','February','March','April','May','June','July','August','September','October','November','December']; 		
const AMPM12HourArray = [ "12:00am", "12:15am", "12:30am", "12:45am", "1:00am", "1:15am", "1:30am", "1:45am", "2:00am", "2:15am", "2:30am", "2:45am", "3:00am", "3:15am", "3:30am", "3:45am", "4:00am", "4:15am", "4:30am", "4:45am", "5:00am", "5:15am", "5:30am", "5:45am", "6:00am", "6:15am", "6:30am", "6:45am", "7:00am", "7:15am", "7:30am", "7:45am", "8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am", "10:45am", "11:00am", "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm", "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm", "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm", "6:15pm", "6:30pm", "6:45pm", "7:00pm", "7:15pm", "7:30pm", "7:45pm", "8:00pm", "8:15pm", "8:30pm", "8:45pm", "9:00pm", "9:30pm", "9:45pm", "10:00pm", "10:15pm", "10:30pm", "10:45pm", "11:00pm", "11:15pm", "11:30pm", "11:45pm" ];									
const mysqlTimeArray =  [ "00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00","01:30:00", "01:45:00", "02:00:00", "02:15:00", "02:30:00", "02:45:00", "03:00:00", "03:15:00","03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00","05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00", "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00","09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00", "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00","13:00:00", "13:15:00", "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00", "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00", "18:15:00", "18:30:00", "18:45:00", "19:00:00", "19:15:00", "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00","21:00:00", "21:15:00", "21:30:00", "21:45:00", "22:00:00", "22:15:00", "22:30:00", "22:45:00","23:00:00", "23:15:00", "23:30:00", "23:45:00" ];				
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//// Creates a yyyy-mm-dd date with a given date. 
function makeYYYMMDDwithDate( Le_date ) {		
	var dd = Le_date.getDate();
	var m = Le_date.getMonth(); /* January is 0! */
	var yyyy = Le_date.getFullYear()
	mm = m+1;		
	if(dd<10) {  dd = '0'+dd;  } 
	if(mm<10) {  mm = '0'+mm;  } 		
	var La_date =  yyyy+"-"+mm+"-"+dd;																				
	return La_date;
}
//// mySwitchPosition provide a integer return the string positon value.
function mySwitchPosition(p) {
	var Pos;	
	switch(p) {
		case 1: Pos = "Lifeguard";  break;						
		case 2: Pos = "Instructor"; break;						
		case 3: Pos = "Headguard";  break;						
		case 4: Pos = "Supervisor"; break;
	}				
	return Pos;
}
function mySwitchShifType(p) {
	var Pos;	
	switch(p) {
		case  "Lifeguard": Pos = 1; break;						
		case  "Instructor": Pos = 2; break;						
		case  "Headguard": Pos = 3; break;						
		case  "Supervisor": Pos = 4; break;
	}				
	return Pos;
}
function getGivenDisplayDate( yyyymmdd ) {
	var todaysdate =  new Date(""+yyyymmdd+"T00:00:00");	
	var dd = todaysdate.getDate();
	var m = todaysdate.getMonth(); //January is 0!
	var yyyy = todaysdate.getFullYear()
	mm = m+1;		
	if(dd<10) {  dd = '0'+dd;  } 
	if(mm<10) {  mm = '0'+mm;  } 		
	var yyyymmdd =  yyyy+"-"+mm+"-"+dd;						
	var today = yyyymmdd;
	var displaydate = ""+yyyy+"-"+Arrmonths[m]+"-"+dd;	
	return displaydate;
}
function converDisplayDateToYYYMMDD( ddisplayddate ) {
	var arr = ddisplayddate.split("-");
	var month = arr[1];
	var m = Arrmonths.indexOf( month );
	m = m+1;			
	if(m<10) {  m = '0'+m;  } 
	var yyyymmdd =  arr[0]+"-"+m+"-"+arr[2];	
	return yyyymmdd;
}


/** Set up schedule database. 
 *  On start up, set up database, if there already is one delete it.  Create database with some test data. 
 *  Database should be lighter than mysql one. The times, startTime and endTime are stored as intergers 0 to 96.
 */
var scheduleFile = './scheduleFile.db';
fs.access(scheduleFile, fs.constants.R_OK | fs.constants.W_OK, (err) => { 
	if(!err)  { console.log(' Database scheduleFile exists going to delete now. ');
		fs.unlink(scheduleFile, (err) => { if (err) { console.log("Failed to delete database:"+err); }}); ////Do db delete scheduleFile.
	} else { console.log(' Database scheduleFile does not exist...'); }
	var db = new sqlite3.Database(scheduleFile);
	db.serialize(function() {
		/** Begin running sql statements to create DB... */
		var DROPtableStatement= "DROP TABLE IF EXISTS Employees;";
		db.run(DROPtableStatement);
		var CREATEtableStatement = "CREATE TABLE Employees (id INTEGER PRIMARY KEY AUTOINCREMENT, Firstname TEXT, Lastname TEXT,  instructor INTEGER, lifeguard INTEGER, headguard INTEGER, supervisor INTEGER, Availability BLOB )";
		db.run(CREATEtableStatement);		
		
		var Availability = { Sunday: "", Monday: "", Tuesday: "", Wednesday: "", Thrusday: "", Friday: "", Saturday: "", Generalnote: "" };
		var json_AV = JSON.stringify(Availability);
		
		var MockEmployeeNames = '[{"first_name":"Brandise","last_name":"Harvatt"},'+
		'{"first_name":"Maegan","last_name":"Leyton"},'+
		'{"first_name":"Jilleen","last_name":"Stockau"},'+
		'{"first_name":"Felipe","last_name":"Wysome"},'+
		'{"first_name":"Diana","last_name":"Robert"},'+
		'{"first_name":"Michale","last_name":"Macilhench"},'+
		'{"first_name":"Kale","last_name":"Vasenin"},'+
		'{"first_name":"Kalvin","last_name":"Stanistrete"},'+
		'{"first_name":"Raffarty","last_name":"Cobelli"},'+
		'{"first_name":"Alyosha","last_name":"Rugiero"},'+
		'{"first_name":"Purcell","last_name":"Denkin"},'+
		'{"first_name":"Annelise","last_name":"Longfoot"},'+
		'{"first_name":"Marlena","last_name":"Bradden"},'+
		'{"first_name":"Sibeal","last_name":"Gell"},'+
		'{"first_name":"Kalil","last_name":"Jayme"},'+
		'{"first_name":"Irwin","last_name":"Debell"},'+
		'{"first_name":"Kassia","last_name":"Stert"},'+
		'{"first_name":"Lyman","last_name":"Casin"},'+
		'{"first_name":"Annnora","last_name":"Dorn"},'+
		'{"first_name":"Kelsey","last_name":"Chisholme"},'+
		'{"first_name":"Delila","last_name":"Turn"},'+
		'{"first_name":"Demott","last_name":"Decker"},'+
		'{"first_name":"Atlanta","last_name":"Oldroyde"},'+
		'{"first_name":"Carlee","last_name":"Click"},'+
		'{"first_name":"Diandra","last_name":"Harflete"},'+
		'{"first_name":"Marcellina","last_name":"Orriss"},'+
		'{"first_name":"Hadlee","last_name":"Farnworth"},'+
		'{"first_name":"Dawna","last_name":"Pulhoster"},'+
		'{"first_name":"Timmie","last_name":"Cousens"},'+
		'{"first_name":"Francklin","last_name":"Hunston"},'+
		'{"first_name":"Ritchie","last_name":"Jeckell"},'+
		'{"first_name":"Krystle","last_name":"Horsfield"},'+
		'{"first_name":"Keefe","last_name":"Chessun"},'+
		'{"first_name":"Adel","last_name":"Browett"},'+
		'{"first_name":"Gisela","last_name":"Mobley"},'+
		'{"first_name":"Sidonnie","last_name":"Mordie"},'+
		'{"first_name":"Laraine","last_name":"Messer"},'+
		'{"first_name":"Calvin","last_name":"Duddle"},'+
		'{"first_name":"Trina","last_name":"Linnane"},'+
		'{"first_name":"Vinni","last_name":"Comins"},'+
		'{"first_name":"Krishnah","last_name":"Keaves"},'+
		'{"first_name":"Scarlett","last_name":"Paireman"},'+
		'{"first_name":"Kalinda","last_name":"Kite"},'+
		'{"first_name":"Hebert","last_name":"Sture"},'+
		'{"first_name":"Jennee","last_name":"Mowles"},'+
		'{"first_name":"Reggie","last_name":"Slaughter"},'+
		'{"first_name":"Braden","last_name":"Cristoforetti"},'+
		'{"first_name":"Perry","last_name":"Cabrera"},'+
		'{"first_name":"Julie","last_name":"Hucke"},'+
		'{"first_name":"Pat","last_name":"Ricardou"},'+
		'{"first_name":"Stephenie","last_name":"Jozsika"},'+
		'{"first_name":"Arty","last_name":"Lorraway"},'+
		'{"first_name":"Nils","last_name":"Sustin"},'+
		'{"first_name":"Sawyere","last_name":"Durtnal"},'+
		'{"first_name":"Giraud","last_name":"Kenninghan"},'+
		'{"first_name":"Deane","last_name":"Trembath"},'+
		'{"first_name":"Reine","last_name":"Humphries"},'+
		'{"first_name":"Lynsey","last_name":"Cozins"},'+
		'{"first_name":"Rand","last_name":"Guillerman"},'+
		'{"first_name":"Korey","last_name":"Gynni"},'+
		'{"first_name":"Haywood","last_name":"Tremmil"},'+
		'{"first_name":"Easter","last_name":"Skitt"},'+
		'{"first_name":"Orson","last_name":"Raubenheimers"},'+
		'{"first_name":"Lianna","last_name":"Cutsforth"},'+
		'{"first_name":"Jerome","last_name":"Smith"},'+
		'{"first_name":"Tova","last_name":"Outridge"},'+
		'{"first_name":"Dulsea","last_name":"Rippin"},'+
		'{"first_name":"Kris","last_name":"Lorrie"},'+
		'{"first_name":"Leola","last_name":"Gonzalo"},'+
		'{"first_name":"Madalena","last_name":"Rablen"},'+
		'{"first_name":"Gabbi","last_name":"Curneen"},'+
		'{"first_name":"Geralda","last_name":"Spurryer"},'+
		'{"first_name":"Hamish","last_name":"Tawse"},'+
		'{"first_name":"Nicoline","last_name":"Dillinger"},'+
		'{"first_name":"Ax","last_name":"Sprey"},'+
		'{"first_name":"Gratia","last_name":"Haville"},'+
		'{"first_name":"Eadie","last_name":"Goodfield"},'+
		'{"first_name":"Shauna","last_name":"Saint"},'+
		'{"first_name":"Giorgi","last_name":"Comrie"},'+
		'{"first_name":"Nathanial","last_name":"Sherwen"},'+
		'{"first_name":"Augustin","last_name":"Yashaev"},'+
		'{"first_name":"Dorette","last_name":"Reece"},'+
		'{"first_name":"Jehanna","last_name":"Johnigan"},'+
		'{"first_name":"Karie","last_name":"Timcke"},'+
		'{"first_name":"Missie","last_name":"Valler"},'+
		'{"first_name":"Amelita","last_name":"Wynrahame"},'+
		'{"first_name":"Andrus","last_name":"Roney"},'+
		'{"first_name":"Rodolph","last_name":"Tallboy"},'+
		'{"first_name":"Buck","last_name":"Bovis"},'+
		'{"first_name":"Effie","last_name":"Broxis"},'+
		'{"first_name":"Dwayne","last_name":"Bonn"},'+
		'{"first_name":"Pamella","last_name":"Husher"},'+
		'{"first_name":"Randee","last_name":"Brierly"},'+
		'{"first_name":"Meridel","last_name":"Cavell"},'+
		'{"first_name":"Jana","last_name":"Thundercliffe"},'+
		'{"first_name":"Liuka","last_name":"Edinburough"},'+
		'{"first_name":"Velvet","last_name":"Grimmert"},'+
		'{"first_name":"Riki","last_name":"Maior"},'+
		'{"first_name":"Hyman","last_name":"Del Castello"},'+
		'{"first_name":"Tonia","last_name":"Oki"},'+
		'{"first_name":"Odetta","last_name":"Hasselby"},'+
		'{"first_name":"Almeria","last_name":"Kolodziej"},'+
		'{"first_name":"Skip","last_name":"Daglish"},'+
		'{"first_name":"Ludovika","last_name":"Terne"},'+
		'{"first_name":"Natala","last_name":"Cantua"},'+
		'{"first_name":"Lionello","last_name":"Slyde"},'+
		'{"first_name":"Priscella","last_name":"Robker"},'+
		'{"first_name":"Piper","last_name":"Mockler"},'+
		'{"first_name":"Sidnee","last_name":"Physick"},'+
		'{"first_name":"Pall","last_name":"Rotter"},'+
		'{"first_name":"Alphonso","last_name":"Brittin"},'+
		'{"first_name":"Saba","last_name":"Alker"},'+
		'{"first_name":"Huntlee","last_name":"Kinde"},'+
		'{"first_name":"Vale","last_name":"Roelvink"},'+
		'{"first_name":"Hilliard","last_name":"Felstead"},'+
		'{"first_name":"Edwin","last_name":"Chander"},'+
		'{"first_name":"Ebony","last_name":"Cadden"},'+
		'{"first_name":"Sunny","last_name":"Hazeup"},'+
		'{"first_name":"Nada","last_name":"Kunneke"},'+
		'{"first_name":"Gareth","last_name":"Woodley"},'+
		'{"first_name":"Shoshanna","last_name":"Gritten"},'+
		'{"first_name":"Reggie","last_name":"Skirving"},'+
		'{"first_name":"Shayne","last_name":"Gallardo"},'+
		'{"first_name":"Arda","last_name":"Chantree"},'+
		'{"first_name":"Talyah","last_name":"Ferschke"},'+
		'{"first_name":"Cob","last_name":"Fellenor"},'+
		'{"first_name":"Phelia","last_name":"Barnewille"},'+
		'{"first_name":"Terrence","last_name":"Yewdell"},'+
		'{"first_name":"Gaultiero","last_name":"Gamet"},'+
		'{"first_name":"Clayborne","last_name":"Steddall"},'+
		'{"first_name":"Gerladina","last_name":"Wheble"},'+
		'{"first_name":"Peri","last_name":"Vasenin"},'+
		'{"first_name":"Colette","last_name":"Adran"},'+
		'{"first_name":"Cleopatra","last_name":"Jeffels"},'+
		'{"first_name":"Hilary","last_name":"Urion"},'+
		'{"first_name":"Evania","last_name":"Roblin"},'+
		'{"first_name":"Dominik","last_name":"Beining"},'+
		'{"first_name":"Charmaine","last_name":"Snowling"},'+
		'{"first_name":"Gabrila","last_name":"Van Leijs"},'+
		'{"first_name":"Etan","last_name":"Tingle"},'+
		'{"first_name":"Clair","last_name":"Glencorse"},'+
		'{"first_name":"Dare","last_name":"Snazle"},'+
		'{"first_name":"Kelila","last_name":"Sawkin"},'+
		'{"first_name":"Hoyt","last_name":"Santello"},'+
		'{"first_name":"Polly","last_name":"Rizzardini"},'+
		'{"first_name":"Almira","last_name":"Etter"},'+
		'{"first_name":"Phineas","last_name":"MacHoste"},'+
		'{"first_name":"Rodd","last_name":"Macci"},'+
		'{"first_name":"Melisande","last_name":"Gini"},'+
		'{"first_name":"Tabbie","last_name":"Sanford"},'+
		'{"first_name":"Fabiano","last_name":"Sirette"},'+
		'{"first_name":"Ilario","last_name":"Caldaro"},'+
		'{"first_name":"Nadeen","last_name":"Gorcke"},'+
		'{"first_name":"Kev","last_name":"Pele"},'+
		'{"first_name":"Wren","last_name":"Gresty"},'+
		'{"first_name":"Avivah","last_name":"Turfes"},'+
		'{"first_name":"Forrester","last_name":"Pring"},'+
		'{"first_name":"Deana","last_name":"Ness"},'+
		'{"first_name":"Palmer","last_name":"MacAlinden"},'+
		'{"first_name":"Emmy","last_name":"Pollen"},'+
		'{"first_name":"Lindon","last_name":"Ruprich"},'+
		'{"first_name":"Baily","last_name":"Featherby"},'+
		'{"first_name":"Fiona","last_name":"Mattin"},'+
		'{"first_name":"Elnore","last_name":"Sterrick"},'+
		'{"first_name":"Georges","last_name":"Mattis"},'+
		'{"first_name":"Cyrus","last_name":"Spurrior"},'+
		'{"first_name":"Ingamar","last_name":"Yurenev"},'+
		'{"first_name":"Horten","last_name":"Folbige"},'+
		'{"first_name":"Melisa","last_name":"Marchant"},'+
		'{"first_name":"Niven","last_name":"Stanhope"},'+
		'{"first_name":"Farlay","last_name":"Mantripp"},'+
		'{"first_name":"Emiline","last_name":"Marklund"},'+
		'{"first_name":"Frannie","last_name":"Torfin"},'+
		'{"first_name":"Belinda","last_name":"Swepson"},'+
		'{"first_name":"Linnet","last_name":"Bruyett"},'+
		'{"first_name":"Arlyne","last_name":"Cheley"},'+
		'{"first_name":"Llewellyn","last_name":"Pattenden"},'+
		'{"first_name":"Ricardo","last_name":"Iddison"},'+
		'{"first_name":"Emelda","last_name":"Drinkeld"},'+
		'{"first_name":"Staffard","last_name":"Siemon"},'+
		'{"first_name":"Sibel","last_name":"Purchase"},'+
		'{"first_name":"Barnie","last_name":"Spikeings"},'+
		'{"first_name":"Tally","last_name":"Janikowski"},'+
		'{"first_name":"Mignon","last_name":"Hockey"},'+
		'{"first_name":"Jodi","last_name":"Wolverson"},'+
		'{"first_name":"Abbot","last_name":"Latey"},'+
		'{"first_name":"Fiorenze","last_name":"Price"},'+
		'{"first_name":"Wilmer","last_name":"Hallas"},'+
		'{"first_name":"Kennie","last_name":"Lared"},'+
		'{"first_name":"Lorene","last_name":"Pattinson"},'+
		'{"first_name":"Parke","last_name":"Chaffen"},'+
		'{"first_name":"Willamina","last_name":"Haselwood"},'+
		'{"first_name":"Veradis","last_name":"Pear"},'+
		'{"first_name":"Ines","last_name":"Headon"},'+
		'{"first_name":"Luther","last_name":"Kordova"},'+
		'{"first_name":"Morgun","last_name":"Kyllford"},'+
		'{"first_name":"Aharon","last_name":"Pahlsson"},'+
		'{"first_name":"Delphinia","last_name":"Redmile"},'+
		'{"first_name":"Leoine","last_name":"Young"},'+
		'{"first_name":"Frederico","last_name":"Rossoni"}]' ;
		var mockNames = JSON.parse(MockEmployeeNames);
		var instertStatement = "";
		for (var i=0; i < mockNames.length; i++) {			
			var f = mockNames[i]["first_name"];
			var l = mockNames[i]["last_name"];
			var scerts = " 1,";
			for( x=0; x < 3; x++) {
				var r = Math.random();
				if( r > 0.5) {
					scerts += " 1, "
				} else {
					scerts += " 0, "
				}
			}
			instertStatement = "INSERT INTO Employees ( Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability ) VALUES ('"+f+"', '"+l+"', "+scerts+" '"+json_AV+"' );";
			db.run(instertStatement);
		}
		

		
		DROPtableStatement= "DROP TABLE IF EXISTS Shifts;";
		db.run(DROPtableStatement);
		CREATEtableStatement = "CREATE TABLE Shifts (ShiftID INTEGER PRIMARY KEY AUTOINCREMENT, CurrentOwnerID INTEGER, startTime INTEGER,  endTime INTEGER, date TEXT, Position INTEGER )";
		db.run(CREATEtableStatement);							
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (1, 4, 12, '"+Today_yymmdd+"', 2 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (1, 16, 20, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (1, 21, 27, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (2, 5, 16, '"+Today_yymmdd+"', 2 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (2, 17, 22, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (2, 22, 30, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (3, 4, 12, '"+Today_yymmdd+"', 2 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (3, 16, 20, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (3, 21, 27, '"+Today_yymmdd+"', 1 );";
		db.run(instertStatement);
		
		var xday = 1;
		do {
			/**
				Creating some shifts using a loop. 10 days in the future.	
			**/
			var selectedDate = new Date(""+Today_yymmdd+"T00:00:00");
			var todaysdate =  new Date(""+Today_yymmdd+"T00:00:00");	
			var nextDate = new Date( selectedDate.setDate( todaysdate.getDate() + xday ));///  new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));			
			var accumdate = makeYYYMMDDwithDate(nextDate) ///new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));
	 
			instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (3, 21, 27, '"+accumdate+"', 1 );";
			db.run(instertStatement);
			instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (1, 16, 20, '"+accumdate+"', 1 );";
			db.run(instertStatement);
			instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES (2, 5, 16, '"+accumdate+"', 2 );";
			db.run(instertStatement);
			xday++;
		}while( xday < 10 );
		
		
		db.close();
		console.log(" Database created.");
}); });//// End of Schedule database creation.


/** Create Database for Editor Logins.
 *  Create file, if already there delete it, then populate it with one record, also add salt encryption.
 *  Need to name password variable to something better.
 */
const editorFile = './editorDB.db';
fs.access(editorFile, fs.constants.R_OK | fs.constants.W_OK, (err) => { 
	if(!err)  { console.log(' Database editorFile exists going to delete now. ');
		fs.unlink(editorFile, (err) => { if (err) { console.log("Failed to delete database:"+err); } }); 
	} else { console.log(' Database editorFile does not exist...'); }
	var editor_DB = new sqlite3.Database(editorFile);
	editor_DB.serialize(function() {	
		/** Begin running sql statements to create DB for Editor Accounts. */
		var DROPtableStatement= "DROP TABLE IF EXISTS EditorAccounts;";
		editor_DB.run(DROPtableStatement);							
		var CREATEtableStatement = "CREATE TABLE EditorAccounts (id INTEGER PRIMARY KEY AUTOINCREMENT, Firstname TEXT, Lastname TEXT, email TEXT, Username TEXT, Password TEXT, salt TEXT)";
		editor_DB.run(CREATEtableStatement);		
		console.log(" Database created.");
		/** Need to use a recusive method to insert a record in to Editor Accounts because the password needs to be converted into a hashed password. */
		var Firstname = "Norman"; var Lastname = "Potts"; var email = "Normanpotts@outlook.com"; var Username = "Norman.Potts";	var password  = "roflPlz";				
		try { DoInsertonEditorDB( Firstname, Lastname, email, Username,  password, false, null, editor_DB  ); }catch(e)	{ console.log(e);  }		
});	});//// End of setup for editorDB.
/** Function DoInsertonEditorDB
 *  Inserted Editor account into DB. Method calls it slef onces with one switch so password can get hased.
 */
function DoInsertonEditorDB( Firstname, Lastname, email, Username, password, secondLoop, saltyBit, editor_DB ) {
	if( secondLoop == false){ 
		bcrypt.genSalt(10, function(err, salt) {  bcrypt.hash(password, salt, function(err, hash) {
				DoInsertonEditorDB(Firstname, Lastname, email, Username, hash, true, salt, editor_DB );
		}); });
	} else {								
		var INSERTstatement = "INSERT INTO EditorAccounts ( id, Firstname, Lastname, email, Username, password, salt ) values ( null, \""+Firstname+"\",  \""+Lastname+"\",  \""+email+"\", \""+Username+"\", \""+password+"\", \""+saltyBit+"\" )";							
		editor_DB.run( INSERTstatement );	
		editor_DB.close();					
}}//// End of Function DoInsertonEditorDB.











ROUTER.use('/', express.static(path.resolve('public/schedule')));




/** When '/' gets requested.
 *  Query the schedule database for all the shifts 'today', with the names of the employees.
 *  Then create an array that has every employee and their shifts.
 *  The write that array, with the date for today in the dailyView ejs file.
 */
ROUTER.get('/', function(req, res) { console.log(" get '/' ");
	var yyyymmdd = getTodayyyymmdd(); var dayDate = getDisplayDate(); 
	var viewPath = path.join(__dirname, '../', 'public', 'schedule', 'dailyView.ejs');			
	
	function handleResponse( shiftArrToday, request, response ) {  
		
		var TPL = { route: homeURL, displayDate: dayDate, YYYYMMDD: yyyymmdd, shiftArrayForToday: shiftArrToday };	
		response.render(viewPath, TPL );					
	}	
	selectEmployeesWhoWorkOnGivenDay( yyyymmdd, req, res, handleResponse );	
});////End of When root is requested, send the schedule page for 'today'

/** selectEmployeesWhoWorkOnGivenDay
 * Preformes database query for the employees and their shifts on a given date. Has a recives a call back function for how the response should be handeled.
 */
function selectEmployeesWhoWorkOnGivenDay( yyyymmdd, req, res, handleResponse  ) { 
	var writeQuery = "SELECT e.Firstname, e.Lastname, e.id, s.startTime, s.endTime, s.date, s.Position, s.ShiftID FROM Shifts s LEFT JOIN Employees e ON e.id = s.CurrentOwnerID WHERE s.date = '"+yyyymmdd+"' ORDER BY e.id ASC;";		
	var db = new sqlite3.Database(scheduleFile);   		
	db.all(writeQuery,[],(err, shifts ) => {	if (err) { console.log("error at get / "); throw err; }	
		var employees = [];	var emIDS = [];
		for( var i = 0; i < shifts.length; i++ ) { //// For each shift build an array of employees	.
			var empID = shifts[i].id;			
			if( emIDS.includes(empID) == false) { /* If the employee is not already in the array, add that employee. */
				var employee = {CurrentOwnerID: shifts[i].id, Firstname: shifts[i].Firstname,  Lastname: shifts[i].Lastname,  Shifts: [] };				
				employees.push( employee );
				emIDS.push(empID);
			}
		}		
		for( var i = 0; i < shifts.length; i++ ) { 	/* Now for every shift, add it to it's employee's shift array. */
			for( var j = 0; j < employees.length; j++ ) { 
				if (shifts[i].id ==  employees[j].CurrentOwnerID) {
					p = shifts[i].Position;
					var Pos;
					switch(p) {
						case 1: Pos = "Lifeguard";  break;						
						case 2: Pos = "Instructor"; break;						
						case 3: Pos = "Headguard";  break;						
						case 4: Pos = "Supervisor"; break;
					}					
					var s = mysqlTimeArray[ shifts[i].startTime ]; var e = mysqlTimeArray[ shifts[i].endTime ]; 					
					var shift = {  startTime:s, endTime:e, Position:Pos, ShiftID:shifts[i].ShiftID, st:shifts[i].startTime, et:shifts[i].endTime}					
					employees[j]["Shifts"].push(shift)	
				}			
			}					
		} //// The array with Employee's with their shifts today has been creaded.
		db.close();							
		/// Sort employees shifts by start time.
		for( var j = 0; j < employees.length; j++ ) {
			employees[j]["Shifts"].sort( function( a, b) { return a.st - b.st; });
		}
		/// Sort by first shift.			
		employees.sort( function( a, b) { return a["Shifts"][0].st - b["Shifts"][0].st; });		
		var shiftArrToday = JSON.stringify(employees);			
		handleResponse(shiftArrToday, req, res);		
	}); 	
}






/** When a request for a given day date is recived.
 *
 */
ROUTER.post('/ByGivenDay/', function (req, res) {  console.log(" post '/ByGivenDay/'  ");		
	var input = req.header('jsonInput');
	givenDate = JSON.parse(input);
	//// Check for proper date string... 	
	var patternDate = /^\d\d\d\d-\d\d-\d\d$/; //// must be yyyy-mm-dd format.
	if ( ! patternDate.test(givenDate) ) {  console.log(" Inncorect date recived, Should have been correct... here: "+givenDate);
		response.send('[]'); 
	} else {	
		function handleResponse( shiftsOnThatDay, request, response ) {  
			///console.log("ByGivenDay shiftsOnThatDay: "+shiftsOnThatDay);
			response.send(shiftsOnThatDay); 
		}			
		selectEmployeesWhoWorkOnGivenDay( givenDate, req, res, handleResponse );			
	}
 }); //// End of When a request for a given day date is recived.





//// Get Editor login page
ROUTER.get('/Login',  function(req, res) { console.log(' get /login ');
	if(req.isAuthenticated()) { 
		res.redirect('/WebPortfolio/Schedule/Editor'); 
	} else { 
		var viewPath = path.join(__dirname, '../', 'public', 'schedule', 'Login.ejs');		
		var TPL = { route: homeURL };	
		res.render(viewPath, TPL );			
	}
}); //// End of Get Editor Login page.






/** Passport methods.
 *  Provides authentication using passport js and bcyrpt.
 */
passport.use(new LocalStrategy(function(Given_Username, Given_Password, done) {
	var editor_DB = new sqlite3.Database(editorFile);
	editor_DB.get('SELECT salt, Password, Username, id FROM EditorAccounts WHERE Username = ?', Given_Username, function(err, row) {
		if (!row) { return done(null, false, {message:"Unknown User"}); }					 
		var storedPassword = row.Password; var candidatePassword = Given_Password;		 
		bcrypt.compare(candidatePassword, storedPassword, function(err, isMatch) {
			if(err) {
				console.log("error at passport use bycrypt. compare ");
				throw err;
			}
			if (!isMatch) 
			{  return done(null, false, { message:"Invalid Password" }); } 
			else 
			{ return done(null, row); }		 
});	});	})); //// End of passport.use
passport.serializeUser(function(employee, done) { return done(null, employee.id); }); //// Method serializeUser is condensed.
passport.deserializeUser(function(id, done) {
	var editor_DB = new sqlite3.Database(editorFile);
	editor_DB.get('SELECT id, Username, Firstname, Lastname FROM EditorAccounts WHERE id = ?', id, function(err, row) {
		if (!row){ return done(null, false); }
		return done(null, row);
}); });//// End of passport.deserializeUser
//// Confirm the a request is authenticated.
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()) { return next(); } 
	else { req.flash('error_msg','You are not logged in'); res.redirect('/WebPortfolio/Schedule/Login'); }
}//// End of function ensureAuthenticated.
/* The route to login and try to authenticate. */
ROUTER.post('/doLoginPlz/', function(req, res, next) { console.log(" post /doLoginPlz/")
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			var x = req.body.username;	
			req.flash('Given_Username',x);
			req.flash('error', info.message);
			return res.redirect('/WebPortfolio/Schedule/Login');      
		} 
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			console.log('user logged in?');
			return res.redirect('/WebPortfolio/Schedule/Editor');
		});
	})(req, res, next);
});//// End of route doLoginPlz.
//// The route for logout, and preform the logout. Redirects user to login page.
ROUTER.get('/logout', function (req, res) { console.log(' get /logout');
	req.logout(); req.flash('success_msg', 'You are logged out'); res.redirect('/WebPortfolio/Schedule/Login');
});
/**
 * End of methods relating to Passport.
 */ 
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *All Editor Routes below.
 ***/
ROUTER.all(/\/Editor\/*/, ensureAuthenticated);
ROUTER.get('/Editor', ensureAuthenticated, function(req, res) { console.log(" get /Editor ");		
	var Firstname = req.user.Firstname;
	var Lastname = req.user.Lastname;	
	var viewPath = path.join(__dirname, '../',  'Editor', 'menu.ejs');		
	var TPL = { route: homeURL, Firstname: Firstname, Lastname: Lastname[0] };	
	res.render(viewPath, TPL );			
});

ROUTER.get('/Editor/ManageSchedule', function(req, res) { console.log(" get /Editor/ManageSchedule ");		
	var Firstname = req.user.Firstname; var Lastname = req.user.Lastname;	
	var viewPath = path.join(__dirname, '../',  'Editor', 'views', 'ManageSchedule.ejs');			
	var todayDate = getDisplayDate();	var ymd = getTodayyyymmdd();			
	selectEmployeesWhoWorkOnGivenDay( ymd, req, res, handleResponse );				
	function handleResponse( shiftsOnThatDay, request, response ) {  			
		determineWhoCanWork( 1, ymd, 0, 2, secondHandleResponse, request, response) 												
		function secondHandleResponse(employeeArr) {
				var TPL = { 		
					DEFAULT_EMPLOYEE_ARR: employeeArr,
					TODAYS_SCHEDULE_ARRAY: shiftsOnThatDay,
					displayDate: todayDate,
					YYYYMMDD: ymd,
					assetUrl: homeURL,
					route: homeURL,
					Firstname: Firstname, 
					Lastname: Lastname[0] 		
				};	
				response.render(viewPath, TPL );					
		}
	}	
}); 
/** function determineWhoCanWork
 * This function is used to fill the employee select box.
 */
function determineWhoCanWork( ShiftType, ymd, StartTime, EndTime, secondHandleResponse, request, response ){
	var selectedDate = new Date(""+ymd+"T00:00:00");
	var lastdayOfWeek;	var firstdayOfWeek;			
	var sDay = selectedDate.getDay();//// Get the day of week 0 being sunday, 6 being saturday.
	if(sDay == 0 ) /* if selected date is sunday */
	{
		firstdayOfWeek = new Date(""+ymd+"T00:00:00");
		lastdayOfWeek = new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));				
	}
	else if(sDay == 6) /* If selectedDate is satuday */
	{
		lastdayOfWeek = new Date(""+ymd+"T00:00:00");
		firstdayOfWeek = new Date( selectedDate.setDate( lastdayOfWeek.getDate() - 6 ));
	}
	else /* selected date is not sunday or saturday. */
	{				
		firstdayOfWeek = new Date( selectedDate.setDate( selectedDate.getDate() - (sDay)));
		lastdayOfWeek = new Date( selectedDate.setDate( firstdayOfWeek.getDate() + 6  ));
	}			
	var Sunday_yyyymmdd = makeYYYMMDDwithDate( firstdayOfWeek );
	var Saturday_yyyymmdd = makeYYYMMDDwithDate( lastdayOfWeek );
	//// Saturday_yyyymmdd and Sunday_yyyymmdd are ready.												
	//// set up query for shift type 
	var queryForShiftType ="";
	switch( ShiftType ) {
		case 1: queryForShiftType = "AND Lifeguard IS true"; break;
		case 2: queryForShiftType = "AND Instructor IS true"; break;
		case 3:	queryForShiftType = "AND Headguard IS true"; break;
		case 4:	queryForShiftType = "AND Supervisor IS true"; break;				
		default: queryForShiftType = " ";			
	}							
	//// id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability
	//// CurrentOwnerID, startTime,  endTime, date, Position
	var SELECTSTATEMENT  = "SELECT Firstname, Lastname, id, Lifeguard, Instructor, Headguard, Supervisor, Availability  FROM Employees ";
	SELECTSTATEMENT += "WHERE id NOT IN( SELECT CurrentOwnerID  FROM Shifts  WHERE date = '"+ymd+"' ";
	SELECTSTATEMENT += "AND ( startTime <= '"+StartTime+"' AND  '"+StartTime+"' < endTime OR endTime >  '"+StartTime+"' ";
	SELECTSTATEMENT += "AND '"+EndTime+"' >  startTime )) "+queryForShiftType+";";																	
	var ids =""; 
	var ccb = new sqlite3.Database(scheduleFile);   		
	ccb.all(SELECTSTATEMENT,[],(err, employees ) => {	
		ccb.close();
		if (err) { 
			console.log("error at get /db.all Select  "); throw err; 
		} else {	
			
			var emIDS = [];
			var emIDS = employees.map(function(value,index) { return value.id; });
			if( emIDS.length > 0 ) {
			ids = ""+emIDS[0];
				for( var i = 1; i < emIDS.length; i++ ){
					ids = ids+","+emIDS[i];
				}
			}
			
						
			//// Get the shifts between this week's dates  Saturday_yyyymmdd and Sunday_yyyymmdd
			SELECTSTATEMENT = "SELECT CurrentOwnerID, startTime, endTime FROM Shifts";
			SELECTSTATEMENT += " WHERE  date >= '"+Sunday_yyyymmdd+"' AND   date <= '"+Saturday_yyyymmdd+"' AND CurrentOwnerID IN ("+ids+");";	
			ccb = new sqlite3.Database(scheduleFile);   		
			ccb.all(SELECTSTATEMENT,[],(err, shiftsBetweenDates ) => {	
				ccb.close();
				if (err) { 
					console.log("error at db. all select "); 
					throw err; 
				} else { 			
					var IDswithShifts = employees.map(function(value,index) { return value.CurrentOwnerID; });
					for( var i =0; i<employees.length; i++ ){
						var AV = employees[i].Availability;
						Availability = JSON.parse(AV);
						employees[i]["Availability"] = Availability;
						var DisEmployeeID = employees[i].id;
						var key = IDswithShifts.indexOf( DisEmployeeID );
						if ( key == false ) {
							employees[i]["HoursThisWeek"] = 0;
						} else {
							var accumhours = 0;
							for( var j =0; j<shiftsBetweenDates.length; j++ ){
								if( DisEmployeeID ==  shiftsBetweenDates[j]["CurrentOwnerID"] )
								{ 
									var Shiftstart = shiftsBetweenDates[j]['startTime']; 
									var Shiftend = shiftsBetweenDates[j]['endTime'];
									var Sindex = mysqlTimeArray.indexOf( Shiftstart );
									var Eindex = mysqlTimeArray.indexOf( Shiftend );					
									accumhours +=  ( Eindex - Sindex ) /4;
								}														
							}
							employees[i]["HoursThisWeek"] = accumhours;
						}												
					}																							
					shuffle(employees);				
					var employeeArr = JSON.stringify(employees);				
					secondHandleResponse(employeeArr);
				}
			});
		}
	});
}




/**  Separate Editor query by day. */
ROUTER.post('/Editor/ByGivenDay/', function (req, res) {  console.log(" post '/Editor/ByGivenDay/'  ");		
	var input = req.header('jsonInput');
	givenDate = input;
	//// Check for proper date string... 	
	var patternDate = /^\d\d\d\d-\d\d-\d\d$/; //// must be yyyy-mm-dd format.
	var dateCheck = false;
	dateCheck = patternDate.test(givenDate);			
	if ( dateCheck == false ) {
		console.log(" Inncorect date recived, Should have been correct... here: "+givenDate);
		res.send('[]'); 
	} else {			
		function handleResponse( shiftArrToday, request, response ) { 
			response.send(shiftArrToday); 				
		}	
		selectEmployeesWhoWorkOnGivenDay( givenDate, req, res, handleResponse );	
	}
}); //// End of request for /Editor/ByGivenDay/
//// For when employee selection box needs to be reloaded.
ROUTER.post('/Editor/reloadEmployeeSelectBox/', function (request, response) {  	
	var input = request.header('jsonInput');
	try {
		var arr = JSON.parse(input); 
		var yyyymmdd = arr['yyyymmdd']; var StartTime = arr['StartTime']; var EndTime = arr['EndTime']; var ShiftType = arr['ShiftType'];		
		var patternDate = /^\d\d\d\d-\d\d-\d\d$/; var dateCheck = false;
		 dateCheck = patternDate.test(yyyymmdd);
		var patternST = /^\d\d:\d\d:\d\d$/;	var stCheck = false;		
		 stCheck  = patternST.test(StartTime);					
		var patternET = /^\d\d:\d\d:\d\d$/;	var etCheck = false;
		 etCheck  = patternET.test(EndTime);					
		var patternShiftType = /^[1-4]{1}$/; var shiftTypeCheck = false;
		 shiftTypeCheck = patternShiftType.test(ShiftType);					
		if ( dateCheck == false || stCheck == false || etCheck == false || shiftTypeCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+yyyymmdd+" "+StartTime+" "+EndTime+" "+ShiftType+" ");
			response.send('[]'); 
		} else {				
			var st = mysqlTimeArray.indexOf(StartTime);	var et = mysqlTimeArray.indexOf(EndTime);
			determineWhoCanWork( ShiftType, yyyymmdd, st, et, handleResponse, request, response) 				
			function handleResponse(employeeArr)  {
				response.send(employeeArr); 
			}																	
		}/// End of if else.		
	} catch(e) {		
		console.log("unexpected error in Editor/reloadEmployeeSelectBox/ \n Error:  "+e);
		var employeesStr = '[]';
		response.send(employeesStr); 		
	}
}); //// End of When a request for reloadEmployeeSelectBox 
//// For whne a shift needs ot be created.
ROUTER.post('/Editor/CreateTheShift/', function (request, response) {  console.log(" post '/Editor/CreateTheShift/'  ");		
	var input = request.header('jsonInput');	
	try {
		///console.log("input at Editor/CreateTheShift: "+input);
		var arr = JSON.parse(input);///// {"date":"2018-11-24","StartTime":"00:00:00","EndTime":"00:30:00","ShiftType":1,"ID":1}
		var yyyymmdd = arr['date']; var StartTime = arr['StartTime']; var EndTime = arr['EndTime']; var ShiftType = arr['ShiftType']; var eID = arr['ID'];			
		var patternDate = /^\d\d\d\d-\d\d-\d\d$/; var dateCheck = false;
		 dateCheck = patternDate.test(yyyymmdd);			
		var patternST = /^\d\d:\d\d:\d\d$/; var stCheck = false;		
		 stCheck  = patternST.test(StartTime);					
		var patternET = /^\d\d:\d\d:\d\d$/; var etCheck = false;
		 etCheck  = patternET.test(EndTime);					
		var patternShiftType = /^[1-4]{1}$/; var shiftTypeCheck = false;
		 shiftTypeCheck = patternShiftType.test(ShiftType);		
		var patternEmployeeID = /^[0-9]+$/; var EmployeeIDCheck = false;
		 patternEmployeeIDCheck = patternEmployeeID.test(eID);			
		if ( dateCheck == false || stCheck == false || etCheck == false || shiftTypeCheck == false || patternEmployeeIDCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+yyyymmdd+" "+StartTime+" "+EndTime+" "+ShiftType+" "+eID);
			response.send('[]'); 
		} else {																	
			var st = mysqlTimeArray.indexOf(StartTime);
			var et = mysqlTimeArray.indexOf(EndTime);			
			var db = new sqlite3.Database(scheduleFile);   					
			db.serialize(function() {				
				var instertStatement = "INSERT INTO Shifts ( CurrentOwnerID, startTime,  endTime, date, Position) VALUES ( "+eID+", "+st+", "+et+", '"+yyyymmdd+"', "+ShiftType+" );";
				///console.log(instertStatement);
				db.run(instertStatement);				
				response.send("pass"); 
				db.close();
			});
		}		
	} catch(e) {
		console.log("There was an error in /Editor/CreatetheShift/ error: "+e);		
		response.send(0); 		
	}	
}); //// End of When a request for CreateTheShift 
//// Fpr went a shift needs to be deleted.
ROUTER.post('/Editor/deleteShift/', function (request, response) {  console.log(" post '/Editor/deleteShift/'  ");		
	var input = request.header('jsonInput');	
	try {
		var arr = JSON.parse(input);	
		var ShiftID = arr['ShiftID']; var patternShiftID = /^[0-9]+$/; var ShiftIDCheck = false;
		 ShiftIDCheck = patternShiftID.test(ShiftID);			
		if ( ShiftIDCheck == false ) {
			console.log(" Inncorect data recived, Should have been correct... here: "+ShiftID+" ");
			response.send('fail'); 
		} else {			
			var db = new sqlite3.Database(scheduleFile);   					
			db.serialize(function() {
				var deleteStatement = "DELETE FROM Shifts WHERE ShiftID = "+ShiftID+";";				
				db.run(deleteStatement);				
				response.send("pass"); 
				db.close();
			});
		}	
	} catch(e) {
		console.log("There was an error in /Editor/deleteShift/ error: "+e);		
		response.send("fail"); 		
	}		
}); //// End of When a request for CreateTheShift




//// Load employee page.
ROUTER.get('/Editor/CreateNewEmployee', function(req, res) { console.log(" get /Editor/CreateNewEmployee ");	
	var Firstname = req.user.Firstname; var Lastname = req.user.Lastname;	
	var viewPath = path.join(__dirname, '../',  'Editor', 'views', 'CreateNewEmployee.ejs');		
	var TPL = { route: homeURL, Firstname: Firstname, Lastname: Lastname[0], NoCertificationError: 0, LastnameError: 0, FirstnameError: 0 };	
	res.render(viewPath, TPL );			
});



//// For whne an employee gets created.
ROUTER.post('/Editor/doCreateEmployee', function (request, response) {  console.log(" post '/Editor/CreateNewEmployee/doCreateEmployee'  ");		
	var instructions = []; //// instructions to send back to front end.
	var input = request.header('jsonInput');
	try {
		
		var Inputarr =  JSON.parse(input);	
		var rFirstname, rLastname, rCertArr; //// r for  recived.	
		
		rFirstname = Inputarr["Firstname"];
		rLastname = Inputarr["Lastname"];
		rCertArr = Inputarr["CertArr"];
		
		var L, I, H, S;
		L =  ( rCertArr.includes("1") ) ? 1 : 0;
		I = ( rCertArr.includes("2"))?1:0;
		H = ( rCertArr.includes("3"))?1:0;
		S = ( rCertArr.includes("4"))?1:0;
		
		var ctrsOkay = false;
		
		if ( L == 0 && I == 0 && H == 0 & S == 0) {
			ctrsOkay = false;
		} else {
			ctrsOkay = true;
		}
		
		function checkName( n ) {
			console.log(n);
			var pattern = /^[A-Z]{1}[a-z]{1,20}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;			
		}
		var fchk = checkName(rFirstname) 
		var lchk = checkName(rLastname)
		
		if ( fchk == true &&  lchk == true && ctrsOkay == true )
		{		
			var db = new sqlite3.Database(scheduleFile);
			var SELECTSTATEMENT = "SELECT * FROM Employees WHERE Firstname = '"+rFirstname+"' AND Lastname = '"+rLastname+"';";
			db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }							
				if(employees.length < 1 ) {
					db.close();
					db = new sqlite3.Database(scheduleFile);
					db.serialize(function() {
						var Availability = { Sunday: " ", Monday: " ", Tuesday: " ", Wednesday: " ", Thrusday: " ", Friday: " ", Saturday: " " };
						var json_AV = JSON.stringify(Availability);
						var certs = ""+I+","+L+","+H+","+S+"";
						instertStatement = "INSERT INTO Employees ( Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability ) VALUES ('"+rFirstname+"', '"+rLastname+"', "+certs+", '"+json_AV+"' );";						
						db.run(instertStatement);	
						db.close();
						instructions.push(5);
						var Jstrinstr = JSON.stringify(instructions);
						response.send(Jstrinstr); 							
					});					
				}
				else {
					instructions.push(6);
					var Jstrinstr = JSON.stringify(instructions);
					response.send(Jstrinstr); 						
				}
			});
		} else {			
			if ( fchk == false ) {
				instructions.push(0);
			}
			if ( lchk == false ) {
				instructions.push(1);
			}
			if ( ctrsOkay == false ) {
				instructions.push(2);
			}
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 				
		}		
	} catch(e) {
		console.log("There was an error in /Editor/doCreateEmployee error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		response.send(Jstrinstr); 		
	}	
}); //// End of When an employee needs to be created.

















ROUTER.get('/Editor/UpdateEmployee', function(req, res) { console.log(" get /Editor/UpdateEmployee ");	
	
	var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
	var db = new sqlite3.Database(scheduleFile);   		
	db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
		var strArr = JSON.stringify(employees);
		var Firstname = req.user.Firstname; var Lastname = req.user.Lastname;		
		var viewPath = path.join(__dirname, '../',  'Editor', 'views', 'UpdateEmployee.ejs');		
		var TPL = { route: homeURL, Firstname: Firstname, Lastname: Lastname[0], DEFAULT_EMPLOYEE_ARR: strArr };	
		res.render(viewPath, TPL );			
	
	});
});
//// For whne an employee gets created.
ROUTER.post('/Editor/doEmployeeUpdate', function (request, response) {  console.log(" post '/Editor/CreateNewEmployee/doCreateEmployee'  ");		
	var instructions = []; //// instructions to send back to front end.
	var input = request.header('jsonInput');
	try {	
		var Inputarr =  JSON.parse(input);			
		var rID = Inputarr["id"];
		var rFirstname = Inputarr["firstname"];
		var rLastname = Inputarr["lastname"];
		var lif = ( Inputarr["lifeguard"] ) ? 1: 0;
		var ins = ( Inputarr["instructor"] ) ? 1:0;
		var hea = ( Inputarr["headguard"] ) ? 1: 0;
		var sup = ( Inputarr["supervisor"] ) ? 1:0;
		function checkName( n ) {
			var pattern = /^[A-Z]{1}[a-z]{1,20}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;			
		}
		var fchk = checkName(rFirstname); 
		var lchk = checkName(rLastname);
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var ichk = checkID(rID);
	 	if ( fchk == true &&  lchk == true && ichk == true )
		{
////  Firstname, Lastname, instructor, lifeguard, headguard, supervisor, Availability		

			var db = new sqlite3.Database(scheduleFile);
			var UpdateStatement = "UPDATE Employees SET Firstname = '"+rFirstname+"', Lastname = '"+rLastname+"', instructor = "+ins+", lifeguard = "+lif+", headguard = "+hea+", supervisor = "+sup+" WHERE id = "+rID+";";
			
			console.log(UpdateStatement);
			db.run(UpdateStatement, [], function(err) {
				if (err) { return console.error(err.message); }											
				var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
				db = new sqlite3.Database(scheduleFile);   		
				db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
					var strArr = JSON.stringify(employees);
					db.close();
					instructions.push(5);
					instructions.push(strArr);					
					var Jstrinstr = JSON.stringify(instructions);
					response.send(Jstrinstr); 			
				});			
			});	
			db.close();
			
	 

		} else {
			instructions.push(6);
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 		
		}
		
	} catch(e) {
		console.log("There was an error in /Editor/doEmployeeUpdate error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		response.send(Jstrinstr); 		
	}	
}); //// End of When an employee needs to be created.














ROUTER.get('/Editor/DeleteEmployee',  function(req, res) { console.log(" get /Editor/DeleteEmployee ");	
	var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
	var db = new sqlite3.Database(scheduleFile);   		
	db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
		var strArr = JSON.stringify(employees);
		var Firstname = req.user.Firstname; var Lastname = req.user.Lastname;	
		var viewPath = path.join(__dirname, '../',  'Editor', 'views', 'DeleteEmployee.ejs');		
		var TPL = { route: homeURL, Firstname: Firstname, Lastname: Lastname[0], DEFAULT_EMPLOYEE_ARR: strArr  };	
		res.render(viewPath, TPL );		
	
	});		
});
ROUTER.post('/Editor/getEmployeeShifts', function (request, response) {  console.log(" post '/Editor/getEmployeeShifts'  ");		
	var instructions = []; //// instructions to send back to front end.
	var input = request.header('jsonInput');
	try {	
		var rID =  JSON.parse(input);			
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var ichk = checkID(rID);
	 	if (  ichk == true ) {			
			var yyyymmdd = getTodayyyymmdd();			
			var SELECTSTATEMENT = "SELECT  s.startTime, s.endTime, s.date, s.Position, s.ShiftID FROM Shifts s LEFT JOIN Employees e ON e.id = s.CurrentOwnerID WHERE   id = "+rID+" AND s.date > '"+yyyymmdd+"' ORDER BY s.date ASC;";	
			var db = new sqlite3.Database(scheduleFile);   		
			db.all(SELECTSTATEMENT,[],(err, shifts ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
				db.close();
				var coverted = shifts.map(function(shift){					
					var st = AMPM12HourArray[shift.startTime];
					var et = AMPM12HourArray[shift.endTime];
					var hours =  (  shift.endTime - shift.startTime ) / 4 ;
					var d = getGivenDisplayDate(shift.date);			
					var position = mySwitchPosition(shift.Position);					
					var mewShift = { startTime: st, endTime: et, date: d, Position: position, ShiftID: shift.ShiftID, hours: hours };										
					return mewShift;				
				}); 			
				var strArr = JSON.stringify(coverted);				
				instructions.push(5);
				instructions.push(strArr);					
				var Jstrinstr = JSON.stringify(instructions);
				response.send(Jstrinstr); 			
			});						
		} else {
			instructions.push(6);
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 		
		}		
	} catch(e) {
		console.log("There was an error in /Editor/getEmployeeShifts error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		response.send(Jstrinstr); 		
	}	
}); 
ROUTER.post('/Editor/doDeleteEmployeeNShifts', function (request, response) {  console.log(" post '/Editor/deleteEmployeeNShifts'  ");		
	var instructions = []; //// instructions to send back to front end.
	var input = request.header('jsonInput');
	try {	
		var arr =  JSON.parse(input);			
		var recivedID = arr[0];
		var recivedUsername = arr[1];
		var recivedPassword = arr[2];		
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be number
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		function checkUsername(n)  {						
			var pattern = /^[A-Z]{1}[a-z]{1,18}.{1}[A-Z]{1}[a-z]{1,18}$/; //// must be Abc.Abc format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		function checkPassword(n)  {				
			//^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()].*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{8,21}$
			///var pattern = /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()].*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{8,21}$/;
			/*
				Atleast 8 characters long.
				No larger than 21. 
				Should contain atleast two Uppercase
				Should contain atleast two lowercase
				should contain atleast two numbers 
				should contain atleast two symbols			
			*/	

			/// Actually... Just a limited possibilities check... because need to only allow safe information that could have came from the input box.
			var pattern = /^[A-Za-z0-9!@#$%^&*()]{1,21}$/;						
			var check = false;
			check = pattern.test(n);	
			return check;		
		}/// TODO: IMPORTANT Need to set up approriate patterns for password and username.
		var usernameCheck = true;///checkUsername();
		var passwordCheck = true;///checkPassword();
		var ichk = true; ///checkID(rID);
	 	if (  ichk == true && usernameCheck == true && passwordCheck == true ) {			
			//// Recived  variables are safe.
			
			/// Confirm password and username matches the currently logged in user
				/// Then try and delete the user with the provided ID.
					/// finally return to the response.
			///Otherwise reply back saying username and password were inncorrect.
			
			//recivedUsername vs
			//recivedPassword vs
			var TherequestUsername = request.user.Username;			
			if(TherequestUsername == recivedUsername ) {
				/// now test the password.			
				var editor_DB = new sqlite3.Database(editorFile);				
				editor_DB.get('SELECT salt, Password, Username, id FROM EditorAccounts WHERE Username = ?', recivedUsername, function(err, row) {
					if (!row) { 
						throw "No row ??? Should be row.";
					}					 
					var storedPassword = row.Password;
					var candidatePassword = recivedPassword;		
					console.log( candidatePassword+" "+storedPassword     );
					bcrypt.compare(candidatePassword, storedPassword, function(err, isMatch) {
						if(err) {
							console.log("error at passport use bycrypt. compare  in delete employee. ");
							throw err;
						}
						if (isMatch) 
						{  //// Valid password.							
							var db = new sqlite3.Database(scheduleFile);
							var STATEMENTDELETE = "DELETE FROM Employees WHERE id = "+recivedID+";"; 
							db.serialize(function () {
								db.run( STATEMENTDELETE, [], function(err) {
									if (err) {
										instructions.push(4);
										var Jstrinstr = JSON.stringify(instructions);
										response.send(Jstrinstr); 												
									}																		
									db = new sqlite3.Database(scheduleFile);
									var STATEMENTDELETE = "DELETE FROM Shifts WHERE CurrentOwnerID = "+recivedID+";"; 
									db.run( STATEMENTDELETE, [], function(err) {
										if (err) {
											instructions.push(4);
											var Jstrinstr = JSON.stringify(instructions);
											response.send(Jstrinstr); 												
										}											
										db.close();													
										//// Should be successful.
										instructions.push(1);
										var Jstrinstr = JSON.stringify(instructions);
										response.send(Jstrinstr); 										
									});								
								});
							});						
						} 
						else 
						{  //// invalid password!
							instructions.push(3); /// password did not match.  Is inncorrect Criedentals.
							var Jstrinstr = JSON.stringify(instructions);
							response.send(Jstrinstr); 		
						}		 
					});	
				});																				
			}else{
				/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
				instructions.push(3);
				var Jstrinstr = JSON.stringify(instructions);
				response.send(Jstrinstr); 		
			}			
		} else {
			instructions.push(6);
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 		
		}		
	} catch(e) {
		console.log("There was an error in /Editor/getEmployeeShifts error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		response.send(Jstrinstr); 		
	}	
}); //// End of When an employee needs to be created.


ROUTER.get('/Editor/getEmployeeandShiftsfordeleteTable',  function(req, res) { console.log(" get /Editor/EmployeeAvailability ");		
	var instructions = [];
	try {
		var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
		var db = new sqlite3.Database(scheduleFile);   		
		db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
			var strArr = JSON.stringify(employees);
			instructions.push(1);
			instructions.push(strArr);
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 					
		});	
	} catch(e) {
		console.log("There was an error in /Editor/getEmployeeShifts error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(Jstrinstr); 		
	}	
});


//// Give away shift search 
///var st, et;
///var x = {"startTime":st,"endTime":et,"date":"2019-January-05","Position":"Lifeguard","ShiftID":31,"hours":1.5}
ROUTER.get('/Editor/getEmployeeShiftswhoCantakeshift', function(req,res) { console.log("get /Editor/getEmployeeShiftswhoCantakeshift");
	var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var Shift =  JSON.parse(input);							
		var r_startTime, r_endTime, r_date, r_position, r_ShiftID;
		r_startTime = Shift["startTime"];
		r_endTime = Shift["endTime"];
		r_date = Shift["date"];
		r_Position = Shift["Position"];		
		var st = AMPM12HourArray.indexOf(r_startTime);
		var et = AMPM12HourArray.indexOf(r_endTime);		
		var p = mySwitchShifType(r_Position);		
		var d = converDisplayDateToYYYMMDD(r_date); 
		//// Get an array of employees available at this time.
		////function determineWhoCanWork( ShiftType, ymd, StartTime, EndTime, secondHandleResponse, request, response ){
		determineWhoCanWork( p, d, st, et, handleResponse, req, res );
		function handleResponse(employeeArr)  {			
			instructions.push(1);
			instructions.push(employeeArr);
			var Jstrinstr = JSON.stringify(instructions);			
			res.send( Jstrinstr ); 
		}		
	}catch(e) {
		console.log("There was an error in /Editor/getEmployeeShiftswhoCantakeshift error: "+e);		
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(Jstrinstr); 				
	}
});
ROUTER.post('/Editor/GiveShiftToEmployee', function(req, res) { console.log("post /Editor/GiveShiftToEmployee");
	var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input);
		var eID = arr[0]; var ShiftID = arr[1];		
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var chkID = checkID(eID);
		var chekShiftID = checkID(ShiftID);		
		if ( chkID == true && chekShiftID == true) {
			//// update shift set CurrentOwnerID to eID			
			var db = new sqlite3.Database(scheduleFile);
			var UpdateStatement = "UPDATE Shifts SET CurrentOwnerID = '"+eID+"' WHERE ShiftID = "+ShiftID+";";
			db.run(UpdateStatement, [], function(err) {
				if (err) { return console.error(err.message); }															
				instructions.push(1);
				var Jstrinstr = JSON.stringify(instructions);
				res.send(instructions);	
			});	
			db.close();
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			instructions.push(3);
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 		
		}			
		
	
	}catch(e) {
		console.log("There was an error in /Editor/GiveShiftToEmployee error:"+e);
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(instructions);
	}
});



ROUTER.get('/Editor/EmployeeAvailability',  function(req, res) { console.log(" get /Editor/EmployeeAvailability ");	
	var SELECTSTATEMENT = "SELECT id, Firstname, Lastname, instructor, lifeguard, headguard, supervisor  FROM Employees;";	
	var db = new sqlite3.Database(scheduleFile);   		
	db.all(SELECTSTATEMENT,[],(err, employees ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
		var strArr = JSON.stringify(employees);	
		var Firstname = req.user.Firstname; var Lastname = req.user.Lastname;	
		var viewPath = path.join(__dirname, '../',  'Editor', 'views', 'EmployeesAvailability.ejs');		
		var TPL = { route: homeURL, Firstname: Firstname, Lastname: Lastname[0], DEFAULT_EMPLOYEE_ARR: strArr  };	
		res.render(viewPath, TPL );			
	});
});
ROUTER.get('/Editor/getAvailabilityArr', function(req,res) { console.log("get /Editor/getAvailabilityArr");
	var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input);
		var eID = arr[0];
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var safe = checkID(eID);
		if( safe ) {
			
			var SELECTSTATEMENT = "SELECT Availability FROM Employees WHERE id = "+eID+";";	
			var db = new sqlite3.Database(scheduleFile);   		
			db.all(SELECTSTATEMENT,[],(err, employee ) => {	if (err) { console.log("error at get /db.all Select  "); throw err; }	
				var avail = employee[0]["Availability"];
				employee[0]["Availability"] = JSON.parse(avail);				
				var strArr = JSON.stringify(employee);
				instructions.push(1);
				instructions.push(strArr);				
				var Jstrinstr = JSON.stringify(instructions);
				
				res.send(Jstrinstr); 					
			});	
			
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			instructions.push(3);
			var Jstrinstr = JSON.stringify(instructions);
			response.send(Jstrinstr); 		
		}				
	}catch(e) {
		console.log("There was an error in /Editor/GiveShiftToEmployee error:"+e);
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(instructions);
	}
	
});
ROUTER.post('/Editor/setAvailability', function(req,res) { console.log("get /Editor/setAvailability");
	var instructions = [];	
	var input = req.header('jsonInput');
	try {
		var arr = JSON.parse(input);
		var eID = arr[0];
		var Availability = arr[1];
		function checkID(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}
		var safe = checkID(eID);
		function checkAvailability(n)  {						
			var pattern = /^[0-9]{1,10}$/; //// must be yyyy-mm-dd format.
			var check = false;
			check = pattern.test(n);	
			return check;		
		}		
		function checkAvailability(n) {
			var check = true;
			return check;
		}
		var ID_safe = checkID(eID);
		var Avail_safe = checkAvailability(Availability)
		if( ID_safe == true && Avail_safe == true) {
			
			var str_avail = JSON.stringify(Availability);
			var UpdateStatement = "UPDATE Employees SET Availability = '"+str_avail+"'  WHERE id = "+eID+";";
			var db = new sqlite3.Database(scheduleFile);   					
			db.run(UpdateStatement, [], function(err) {
				if (err) { return console.error(err.message); }											
				instructions.push(1);
				var Jstrinstr = JSON.stringify(instructions);
				res.send(Jstrinstr); 		
			});	
			db.close();						
			
		}else{
			/// TherequestUsername did not match the recivedUsername.  Must be inncorrect Criedentals.
			instructions.push(3);
			var Jstrinstr = JSON.stringify(instructions);
			res.send(Jstrinstr); 		
		}				
	}catch(e) {
		console.log("There was an error in /Editor/GiveShiftToEmployee error:"+e);
		instructions.push(4);
		var Jstrinstr = JSON.stringify(instructions);
		res.send(instructions);
	}
	
});







module.exports = ROUTER;     