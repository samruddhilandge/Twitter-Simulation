const express = require('express');
const router = express.Router();
var kafka = require('../Kafka/client');

router.post('/getBookmarks',  function (req, res) {
    console.log("Inside get Bookmarks");
    console.log("Req is :");
    console.log(req.body);

    kafka.make_request('tweetTopics',{"path":"getBookmarks", "tweetDetails" : req.body}, function(err,result){
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