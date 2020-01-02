var express = require("express");
var app = express();
app.set('view engine', 'ejs');
router = express.Router();
var config = require('../Config/settings');
var kafka = require('../Kafka/client');
var mongoose = require("mongoose");

var views=[];
var id=[];

router.get('/fetchviews',function(req,res){
    
    
    console.log("in fetch views backend")
    console.log(req.body);
  
    kafka.make_request("analytics", { "path": "graphBar" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/hourlyTweets',function(req,res){
    
    
    console.log("in hourly tweets backend")
    console.log(req.body);
  
    kafka.make_request("analytics", { "path": "hourlyGraph" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchProfileViews/:username',function(req,res){
    
    
    console.log("infetch Profile views  backend")
    console.log(req.params.username);
  
    let body={
      username:req.params.username
    }
    kafka.make_request("analytics", { "path": "profileViews" ,body}, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchLikes',function(req,res){
    
    
    console.log("infetch fetchLikes backend")
  
  
    kafka.make_request("analytics", { "path": "fetchLikes" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchRetweets',function(req,res){
    
    
  console.log("infetch fetchRetweets backend")
  

  kafka.make_request("analytics", { "path": "fetchRetweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

router.get('/dailyTweets',function(req,res){

  kafka.make_request("analytics", { "path": "dailyTweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

router.get('/monthlyTweets',function(req,res){
    
    
  console.log("infetch monthlyTweets backend")
  

  kafka.make_request("analytics", { "path": "monthlyTweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

module.exports=router;