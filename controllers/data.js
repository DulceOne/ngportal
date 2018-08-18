var data = require('../modules/data');

exports.getNewsAll = function(req,res) {

    data.getNewsAll(function(err,docs) {

        if(!err){
             return res.render('index.ejs',{docs:docs});
        }

        res.send(err);
    })

}

exports.getNews = function(req,res) {

    var id = req.params.id;

    data.getNews(id,function(err,docs) {

        if(!err) {
            return res.render('news.ejs',{result:docs});
        }
        
        res.send(err);

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

exports.signIn = function(req,res) {

    var user = {
        login: req.body.login,
        password: req.body.password 
    }

    console.log(user)

    data.signIn(user,function(err,result) {
        if(!err) res.send(result);
        else  res.sendStatus(err);
    });
}