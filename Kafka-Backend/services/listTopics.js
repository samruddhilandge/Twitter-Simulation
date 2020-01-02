let Lists = require("../models/Lists");
let Users = require("../models/UserSchema");
var tweet = require("../models/TweetSchema");

exports.listTopicService = function listTopicService(msg, callback) {
  console.log("In List Service path:", msg.path);
  switch (msg.path) {
    case "createList":
      createList(msg, callback);
      break;
    case "addMember":
      addMember(msg, callback);
      break;
    case "deleteList":
      deleteList(msg, callback);
      break;
    case "showListTweet":
      showListTweet(msg, callback);
      break;
    case "showMember":
      showMember(msg, callback);
      break;
    case "showMemberList":
      showMemberList(msg, callback);
      break;
    case "showMyList":
      showMyList(msg, callback);
      break;
    case "showSubscribedList":
      showSubscribedList(msg, callback);
      break;
    case "showSubscriber":
      showSubscriber(msg, callback);
      break;
    case "subscribeList":
      subscribeList(msg, callback);
      break;
    case "unsubscribeList":
      unsubscribeList(msg, callback);
      break;
    case "updateList":
      updateList(msg, callback);
      break;
    case "findMember":
      findMember(msg, callback);
      break;
    case "removeMember":
      removeMember(msg, callback);
      break;
     
  }
};

let createList = function(msg, callback) {
  //let userId = message.userId;
  console.log(msg.listDetails.creatorName);
  let respmsg = "";
  // var list = Lists({
  //   listname: msg.listDetails.listname,
  //   description: msg.listDetails.description,
  //   creatorID: msg.listDetails.creatorID,
  //   creatorName: msg.listDetails.creatorName,
  //   memberID: msg.listDetails.members
  // });
  Users.find({ username: msg.listDetails.creatorID }, function(
    err,
    result,
    fields
  ) {
  console.log("Testin hjsahjsdhjh",result[0])
  
  var list = Lists({
      listname: msg.listDetails.listname,
      description: msg.listDetails.description,
      creatorID: msg.listDetails.creatorID,
      creatorName:result[0].firstName+" "+result[0].lastName,
      creatorImage:result[0].profilePicture,
      memberID: msg.listDetails.members
    });

  console.log(list);
  list.save(function(error, results) {
    if (error) {
      console.log("alaukika:P");
      console.log(error);
      respmsg = "error";
      var pkg = {
        msg: respmsg
      };
      callback(null, pkg);
    } else {
      respmsg = "List Created Successfully!";
      var pkg = {
        msg: respmsg
      };
      console.log("Hellooo alaukika is talking:", results._id);
      var t = JSON.stringify(results._id);
      console.log(t);
      console.log(t.slice(1, 25));
      var t1 = t.slice(1, 25);
      Users.update(
        { username: { $in: msg.listDetails.members } },
        { $addToSet: { listMember: t1 } },
        { multi: true },
        function(err, result, fields) {
          callback(null, pkg);
          console.log("after callback");
        }
      );
    }
  });
});
};

let findMember = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find({$and:[ {username: msg.listDetails.username},{active:true} ] }, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let addMember = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.update(
    { _id: msg.listDetails.listID },
    { $addToSet: { memberID: { $each: msg.listDetails.members } } },
    function(err, result, fields) {
      Users.update(
        { username: { $in: msg.listDetails.members } },
        { $addToSet: { listMember: msg.listDetails.listID } },
        { multi: true },
        function(err, result, fields) {
          callback(null, result);
          console.log("after callback");
        }
      );
    }
  );
};

let removeMember = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.updateOne(
    { _id: msg.listDetails.listID },
    { $pull: { memberID: msg.listDetails.memberID } },
    function(err, result, fields) {
      Users.updateOne(
        { username: msg.listDetails.memberID },
        { $pull: { listMember: msg.listDetails.listID } },
        function(err, result, fields) {
          callback(null, result);
          console.log("after callback");
        }
      );
    }
  );
};

let deleteList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.findOneAndDelete({ _id: msg.listDetails.listID }, function(
    err,
    result,
    fields
  ) {
    Users.update(
      {},
      { $pull: { listMember: msg.listDetails.listID,listSubscriber: msg.listDetails.listID } },
      { multi: true },
      function(err, result, fields) {
        if (err) throw err;
        callback(null, "List Deleted");
        console.log("after callback");
      }
    );
  });
};

let showListTweet = function(msg, callback) {
  console.log(msg.listDetails);

  Lists.find({ _id: msg.listDetails.listID }, { memberID: 1 }, function(
    err,
    results,
    fields
  ) {
    // if(err) throw err;
    // Tweets.find({userID : { $in:resultArray}}, function(err,result,fields){
    //   if(err) throw err;
    console.log(results);
    tweet.find({ username: { $in: results[0].memberID } }, (err, result) => {
      if (err) {
        console.log("unable to find in database", err);
        callback(err, "Database Error");
      } else if (result) {
        console.log("result is..");
        console.log(result);
        callback(null, { status: 200, message: result });
      } else {
        console.log("result is..");
        console.log(result);
        callback(null, { status: 200, message: "Tweets cannot be returned!" });
      }
    });
    // callback(null, result);
    // console.log("after callback");
  });
};

let showMember = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find({$and:[{ listMember: msg.listDetails.listID},{active:true}] }, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let showMemberList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.find({ memberID: msg.listDetails.userID }, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let showMyList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.find({ creatorID: msg.listDetails.userID }, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let showSubscribedList = function(msg, callback) {
  console.log(msg.listDetails);
  console.log(msg.listDetails);
  Lists.find({ subscriberID: msg.listDetails.userID }, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let showSubscriber = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find({$and:[{listSubscriber: msg.listDetails.listID},{active:true}]}, function(
    err,
    result,
    fields
  ) {
    callback(null, result);
    console.log("after callback");
  });
};

let subscribeList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.update(
    { _id: msg.listDetails.listID },
    { $addToSet: { subscriberID: msg.listDetails.userID } },
    function(err, result, fields) {
      Users.update(
        { username: msg.listDetails.userID },
        { $addToSet: { listSubscriber: msg.listDetails.listID } },
        function(err, result, fields) {
          callback(null, result);
          console.log("after callback");
        }
      );
    }
  );
};

let unsubscribeList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.update(
    { _id: msg.listDetails.listID },
    { $pull: { subscriberID: msg.listDetails.userID } },
    function(err, result, fields) {
      Users.update(
        { username: msg.listDetails.userID },
        { $pull: { listSubscriber: msg.listDetails.listID } },
        function(err, result, fields) {
          callback(null, result);
          console.log("after callback");
        }
      );
    }
  );
};

let updateList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.findOneAndUpdate(
    { _id: msg.listDetails.listID },
    {
      listname: msg.listDetails.listname,
      description: msg.listDetails.description
    },
    function(err, result, fields) {
      callback(null, result);
      console.log("after callback");
    }
  );
};

//Bookmark services

// let bookmarkTweet = function(msg, callback) {
//   console.log(msg.tweetDetails);
//   Tweets.update({_id:msg.tweetDetails.tweetID},{ $addToSet: { bookmarks: msg.tweetDetails.username } }, function(err,result,fields){
//       callback(null, result);
//       console.log("after callback");
//   })
// };


