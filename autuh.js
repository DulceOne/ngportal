var db = require('./db');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username,password,done){
	db.get().collection('users').findOne({login: username,password: password},function(err,user) {
		if(!user)
			return done(null,false);
		return done(null,user);
    })
}));

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user,done){
	done(null,user);
});
module.exports = passport;