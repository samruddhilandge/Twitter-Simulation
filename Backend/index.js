const express = require('express');
const app = express();
const port = 3001;
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

var dbConnection = require('./database/dbConnectionPool');

const path = require('path');

// Log requests to console
var morgan = require('morgan');

//passport auth require
var config = require('./Config/settings');
var passport = require('passport');

var kafka = require("./Kafka/client");
console.log("Initializing passport");
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./Config/passport').passport;

var mongoose = require('mongoose');
//var connStr = config.database_type + '://' + config.database_username + ':' + config.database_password + '@' + config.database_host + ':' + config.database_port + '/' + config.database_name;
var connStr = config.connection_string;
console.log(connStr);

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10, }, function (err) {
  if (err) throw err;
  else {
    //const collection = client.db("grubhub");
    console.log('Successfully connected to MongoDB');
  }
});

testDBConection = async () => {
  let con = await dbConnection();
  if (con) {
    console.log("Connected to Database");
  }
}
testDBConection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://' + config.client + ':3000', credentials: true }));

app.use(session({
  secret: 'cmpe273_kafka',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));
//use cors to allow cross origin resource sharing
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://' + config.client + ':3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const createListRouter = require('./Routes/ListRoutes/createList');
const addMemberRouter = require('./Routes/ListRoutes/addMember');
const removeMemberRouter = require('./Routes/ListRoutes/removeMember');
const findMemberRouter = require('./Routes/ListRoutes/findMember');
const deleteListRouter = require('./Routes/ListRoutes/deleteList');
const showListTweetRouter = require('./Routes/ListRoutes/showListTweet');
const showMemberRouter = require('./Routes/ListRoutes/showMember');
const showMemberListRouter = require('./Routes/ListRoutes/showMemberList');
const showMyListRouter = require('./Routes/ListRoutes/showMyList');
const showSubscribedListRouter = require('./Routes/ListRoutes/showSubscribedList');
const showSubscriberRouter = require('./Routes/ListRoutes/showSubscriber');
const subscribeListRouter = require('./Routes/ListRoutes/subscribeList');
const unsubscribeListRouter = require('./Routes/ListRoutes/unsubscribeList');
const updateListRouter = require('./Routes/ListRoutes/updateList');
const getBookmarksRouter = require('./Routes/getBookmarks');
const loginSignupRoutes = require('./Routes/LoginSignup')
const tweetRoutes = require('./Routes/tweetRoutes');
const messageRoutes = require('./Routes/messageRoutes')
const profileDetailsRoutes = require('./Routes/ProfileDetails')
const analytics=require('./Routes/Analytics');

app.use('/createList',createListRouter);
app.use('/addMember',addMemberRouter);
app.use('/findMember',findMemberRouter);
app.use('/removeMember',removeMemberRouter);
app.use('/deleteList',deleteListRouter);
app.use('/showListTweet',showListTweetRouter);
app.use('/showMember',showMemberRouter);
app.use('/showMemberList',showMemberListRouter);
app.use('/showMyList',showMyListRouter);
app.use('/showSubscribedList',showSubscribedListRouter);
app.use('/showSubscriber',showSubscriberRouter);
app.use('/subscribeList',subscribeListRouter);
app.use('/unsubscribeList',unsubscribeListRouter);
app.use('/updateList',updateListRouter);
app.use('/getBookmarks',getBookmarksRouter);
app.use('/',analytics);
app.use('/messages', messageRoutes);
app.use('/', loginSignupRoutes);
app.use('/', tweetRoutes);
app.use('/', profileDetailsRoutes);

//app.listen(3001);
console.log("Server Listening on port 3001");

