var data = require('../modules/data');

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
exports.getNewsAll = function(req,res) {

    data.getNewsAll(function(err,docs) {
        if(req.isAuthenticated()) {
            console.log("You logined")
            // console.log(docs)
            if(!err) {
                return res.render('index.ejs',{
                    docs,
                    profil:{
                        isLogin:true,
                        user:req.user.login
                    }
                });
                // res.send(docs);
            }
            else {
                res.render('index.ejs',{
                    docs,
                    profil:{
                        isLogin:true,
                        user:"testParams"
                    }
                });
            }
        }
        else {
            console.log("You not logined")
            if(!err) {
                return res.render('index.ejs',{
                    docs,
                    profil:{
                        isLogin:false,
                        user:"Not authorizet"
                    }
                });
                // res.send(docs);
            }
            else {
                res.render('index.ejs',{
                    docs,
                    profil:{
                        isLogin:false,
                        user:"Not authorizet"
                    }
                });
            }
        }
    })

}

exports.getNews = function(req,res) {

    var id = req.params.id;

    data.getNews(id,function(err,docs) {
        if(req.isAuthenticated()) {

            if(!err) {
                return res.render('news.ejs',{
                    result:docs,
                    profil:{
                        isLogin:true,
                        user:req.user.login
                    }
                });
            }
        }
        else{
            res.render('news.ejs',{
                result:docs,
                profil:{
                    isLogin:false,
                    user:"Not authorizet"
                }
            });
        }
      

    })
}

exports.signUp = function(req,res) {

    var user = {
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    }
    
    data.signUp(user,function(err,result) {

        if(!err) return res.send(result);
        else  res.sendStatus(err);

    })

}

exports.getUser = function(req,res) {
    if(req.isAuthenticated() && req.user.login == req.params.id) {
        data.getUser(req.params.id, function(err,user) {
            if(!err){
                res.render('profil.ejs',{
                    profil:{
                        isLogin:true,
                        user:user
                    }
                })
            }
        })
    }
}

// exports.signIn = function(username,password,cb) {

//     var user = {
//         login: username,
//         password: password 
//     }

//     data.signIn(user,function(err,result) {
//         cb(err,result)
//     });
// }