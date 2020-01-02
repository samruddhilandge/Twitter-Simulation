
const express = require('express');
var app = express();
app.set('view engine', 'ejs');
router = express.Router();
var exports = module.exports = {};

var Tweets = require('../models/TweetSchema');
var Users=require('../models/UserSchema');

exports.analyticsService = function analyticsService(msg, callback) {
    console.log("In Analytics Service path:", msg.path);
    switch (msg.path) {
        case 'graphBar':
            graphBar(msg, callback);
            break;
        case 'hourlyGraph':
            hourlyGraph(msg, callback);
            break;
        case 'profileViews':
             profileViews(msg, callback);
            break;

        case 'fetchLikes':
                fetchLikes(msg, callback);
                break;
        case 'fetchRetweets':
            fetchRetweets(msg, callback);
            break;

        case 'monthlyTweets':
            monthlyTweets(msg, callback);
            break;
        case 'dailyTweets':
            dailyTweets(msg, callback);
            break;

    }
};

let graphBar = function(message, callback){

    console.log("Inside views request");
  
    Tweets.find({}).sort({'views':-1}).limit(10).then((result,err)=>{  
    
 
        if(err)
        console.log("error in mongo query")
      
        
        callback(null,result);
     })
};

let hourlyGraph = function(message, callback){

    console.log("Inside Hourly graph kafka backend request");

        var x=[];
    Tweets.find({"createdAt":{"$gte": new Date(2019, 6, 2), "$lt": new Date(2019, 11, 30)}}).then((result,err)=>{  //Temp will be Tweets
        
        if(err)
            console.log("error in mongo query")
      
        var lookup=[2,9,10,11,12,13,14,15,16,17,18,19,20];    
        result.forEach(element => {

            var y=element.createdAt.getHours();

            if(lookup.includes(y)){
                console.log("inside if");
            if(x.some(o=>o.hour===y)){
                let obj=x.find(i=>i.hour===y);
                let index=x.indexOf(obj);
                x[index].count=x[index].count+1;
            }
            else
                x.push({hour:y,count:1})
        }
        });
        
        callback(null,x);
     })
    
   
};

let profileViews = function(message, callback){

    console.log("Inside profile Views kafka backend");

    var current_timestamp=Date.now();
    var current_date=new Date(current_timestamp);  
    
    console.log("Inside views request");
  
    var username=message.body.username;
    

    Users.findOne({"username":username}).then((result,err)=>{  
        console.log(result)
         console.log("Profile Count:",result.viewCount);
 
        
        if(err)
        console.log("error in Mongo query")
      
       
        callback(null,result);
     })

    
};

let fetchLikes = function(message, callback){

    console.log("Inside fetch Likes request");
  
    
    Tweets.aggregate([
       {

        "$project":{
            "username":1,
            "likes":1,
            "length":{"$size":"$likes"}
        }
       },
       {
           "$sort":{"length":-1}
       },
       {
           "$limit":10
       }
    ]).then(
        result=>{
           
            callback(null,result);
        }
        
    )

};

let fetchRetweets = function(message, callback){

    console.log("Inside fetch retweets request");
  
    
    Tweets.aggregate([
       {

        "$project":{
            "username":1,
            "retweets":1,
            "length":{"$size":"$retweets"}
        }
       },
       {
           "$sort":{"length":-1}
       },
       {
           "$limit":5
       }
    ]).then(
        result=>{
           
            callback(null,result);
        }
        
    )

};

let dailyTweets = function(message, callback){

    console.log("Inside daily tweets request");

    var x=[];
    Tweets.find({"createdAt":{"$gte": new Date((new Date().getTime() - (7* 24 * 60 * 60 * 1000)))}}).then((result,err)=>{  //Temp will be Tweets
      
 
        if(err)
            console.log("error in mongo query")
      
        console.log("Daily Tweets result:",result);
        
        result.forEach(element => {

            var y=element.createdAt.getDate();
            console.log("day:",y);

            if(x.some(o=>o.day===y)){
                let obj=x.find(i=>i.day===y);
                let index=x.indexOf(obj);
                x[index].count=x[index].count+1;
            }
            else
                x.push({day:y,count:1})
            
        });
        console.log("xxxxx:",x);
        callback(null,x);
     })
};

let monthlyTweets = function(message, callback){

    console.log("Inside daily tweets request");

    var x=[];
    Tweets.find({"createdAt":{"$gte": new Date(2019, 0, 2), "$lt": new Date(2019, 11, 4)}}).then((result,err)=>{  //Temp will be Tweets
        
 
        if(err)
            console.log("error in mongo query")
      
        console.log("monthlyTweets Tweets result:",result);
        
        result.forEach(element => {

            var y=element.createdAt.getMonth();
            console.log("month:",y);

            if(x.some(o=>o.month===y)){
                let obj=x.find(i=>i.month===y);
                let index=x.indexOf(obj);
                x[index].count=x[index].count+1;
            }
            else
                x.push({month:y,count:1})
            
        });
        console.log("Q:",x);
        callback(null,x);
     })
};