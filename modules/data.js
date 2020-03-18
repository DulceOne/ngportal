var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.getNewsAll = function(cb){
    
    db.get().collection('news').find().toArray(function(err,docs){
        console.log(docs)

        var docs_new = new Array;
        var docs_other = new Array;

        for(item of docs){

            if(item.status == "main") {
                docs_new.push(item);
            }

            else{
                docs_other.push(item);
            }

        }

        var docs = {
            main:docs_new,
            other:docs_other
        }

        cb(err,docs);
    })

}

exports.getNews = function(id,cb) {

    db.get().collection('news').findOne({_id : ObjectID(id)},function(err,docs) {
        cb(err,docs);
    })
    
}

exports.signUp = function(user,cb) {
    db.get().collection('users').findOne({login: user.login},function(err,docs) {
        console.log(err,docs)
        if(docs === null) {
            db.get().collection('users').insert({
                email:user.email,
                login:user.login,
                password:user.password
            },function(error,result) {
                console.log(result);
                cb(error,result);
            })
        }
        else cb(500,docs);
    });
}

exports.getUser = function(user,cb) {
    db.get().collection('users').findOne({login:user},function(err,doc) {
        if(doc != null);
            return cb(err,doc)
        cb(err,doc);
    })
}


// exports.signIn = function(user,cb) {
    // db.get().collection('users').findOne({login: user.login,password: user.password},function(err,docs) {
    //     if(docs!==null) cb(err,docs);
    //     else cb(404,docs);
    // })
// }