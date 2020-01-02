var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
TweetSchema = new Schema({
  userFullName: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  actualTweetId: {
    type: String,
    default: ""
  },
  tweetText: {
    type: String,
    default: ""
  },

  hashTags: [],
  media: [],
  replies: [],
  likes: [],
  retweets: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  lists: [],
  bookmarks: [],
  isRetweet: {
    type: String,
    default: 'false'
  }
});

module.exports = mongoose.model('tweets', TweetSchema);