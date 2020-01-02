const express = require('express');
const router = express.Router();
var kafka = require('../../Kafka/client');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/createList',requireAuth,  function (req, res) {
    console.log("Inside create a list");
    console.log("Req is :");
    console.log(req.body);
    
    // let {userId, tweetText}  = req.body;
    // let tweetDetails =  {userId, tweetText} ;
  
    kafka.make_request('listTopics',{"path":"createList", "listDetails" : req.body}, function(err,result){
      var responseObj = {
        status : false,
        message :""
      };
      if (err) {
        console.log(err);
        res.send("Difficulty in Connectivity! Try again later!")
      }
      else 
      {
          res.send(result); 
      }
    });
});

module.exports = router;