var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db = require('./db');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
// var passport = require('./autuh');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var session = require('express-session');

///USES an SETS
app.use(express.static(__dirname + '/'));
app.use (bodyParser.urlencoded ({
   	extended: true,
	limit: '50mb'
}));

app.use (bodyParser.json ({
   	extended: true,
	limit: '50mb'
}));
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

////CONTROLLERS

var data = require('./controllers/data');

////ROUTS

app.get('/',data.getNewsAll);
app.get('/news/:id',data.getNews);
app.get('/eng',function(req,res) {
	res.render('eng.ejs');
})

app.post('/signUp',data.signUp);
app.post('/signIn',data.signIn);

db.connect('mongodb://localhost:27017/ngportal',function(err){

	if(err){
		return console.log(err);
    }
    
	app.listen(1488,function(){
		console.log("server started 1488");
    })
    
});
