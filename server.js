var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db = require('./db');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
var passport = require('./autuh');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var session = require('express-session');
const port = process.env.PORT || 1488;

	//           Защита роутов           //
// exports.mustAuthenticatedMw = function (req, res, next){
// 	req.isAuthenticated()
// 	  ? next()
// 	  : res.redirect('/');
//   };
// App.all('private', mustAuthenticatedMw);
// App.all('private/*', mustAuthenticatedMw);


///USES an SETS
app.use(express.static(__dirname + '/'));
app.use (bodyParser.urlencoded ({
   	extended: true,
	limit: '50mb'
}));
app.use(session({ secret: 'SECRET' }));

app.use (bodyParser.json ({
   	extended: true,
	limit: '50mb'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/profil/:id',data.getUser);

// app.all('/*', data.getUser);
app.post('/signUp',data.signUp);
// app.post('/signIn',data.signIn);

app.post('/signIn',passport.authenticate('local',{failureRedirect: '/'}),function(req,res) {
	console.log(req.user);
	res.sendStatus(200);
});

app.post('/logout',function(req,res){
	if(req.isAuthenticated()){
		req.logout();
		res.sendStatus(200);
	}
})
const password = process.env.DBPASSWORD
const uri = `mongodb+srv://DulceOne:${password}@cluster0-q6cgg.mongodb.net/fulfilment`;
db.connect('mongodb://localhost:27017/ngportal',function(err){

	if(err){
		return console.log(err);
    }
    
	app.listen(port,function(){
		console.log("server started 1488");
    })
    
});