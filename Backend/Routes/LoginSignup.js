const express = require('express');

var app = express();
app.set('view engine', 'ejs');

router = express.Router();

//imports
var config = require('../Config/settings');
var kafka = require('../Kafka/client');

// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
var crypt = require('./bcrypt.js');


router.post('/signup', function (req, res) {
  console.log("Inside signup post request");
  console.log("Sending Request Body:");
  console.log(req)
  console.log(req.body);
  let formatEmail = req.body.email.toLowerCase().trim();

  console.log("formatted email:" + formatEmail);

  crypt.newHash(req.body.userPassword, function (response) {
    enPassword = response;
    console.log("Encrypted password: " + enPassword);

    inputData = {
      "username": req.body.username,
      "email": formatEmail,
      "password": enPassword,
      
      "firstName": req.body.firstName,
      "lastName": req.body.lastName
    }

    kafka.make_request('loginSignuptopic', { "path": "signup", "inputData": inputData, "data": req.body, "formatEmail": formatEmail }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        console.log("User Added");
        res.status(200).json({ responseMessage: 'Successfully Added!' });
      } else if (result.status === 205) {
        console.log("User already exists");
        res.status(200).json({ responseMessage: 'User Already exists!' });
      }
      else {
        console.log("User already exists");
        res.status(200).json({ responseMessage: 'User Already exists!' });
      }
    });
  })
});

router.post('/login', function (req, res) {
  console.log("Inside login post request");
  console.log("Request req.query:");
  console.log(req.query);
  console.log("req.query.body.userPassword")
  console.log(req.query.userPassword)
  password = req.query.userPassword

  kafka.make_request('loginSignuptopic', { "path": "login", "username": req.query.username, "body": req.query }, function (err, result) {
    console.log(result)
    if (err) {
      res.status(500).json({ responseMessage: 'Database not responding' });
    }

    if (result.status == 200) {
      console.log("result.password")
      console.log(result)
      console.log(result.password)
      crypt.compareHash(password, result.password, function (err, isMatch) {
        if (isMatch && !err) {
          console.log("Login Successful");

          var token = jwt.sign({ username: result.username, firstname: result.firstname }, config.secret_key, {
            expiresIn: 7200 // expires in 2 hours
          });
          req.session.user = result.username;
          res.status(200).json({ validUser: true, responseMessage: 'Login Successfully', token: token, info: { username: result.username, firstname: result.firstname, lastname: result.lastname } });
          console.log("User found in DB and token is", token);
        } else {
          console.log("Authentication failed. Passwords did not match");
          res.status(200).json({ responseMessage: 'Invalid credentials' })

        }
      })
    }
    else {
      console.log("Authentication failed. Passwords did not match");
      res.status(200).json({ responseMessage: 'Invalid credentials' })
    }
  })
})

router.post('/deleteAccount',requireAuth, function (req, res) {
  console.log("Inside deleteAccount post request");
  console.log("Request req.query:");
  console.log(req.body);

  kafka.make_request('loginSignuptopic', { "path": "deleteAccount", "username": req.body.username }, function (err, result) {
    console.log(result)
    if (err) {
      res.status(500).json({ responseMessage: 'Database not responding' });
    }
    else {
      console.log("result")
      console.log(result)
      res.status(200).json({ delete: true, responseMessage: 'Deletion Successfully' });

    }
  })
})

router.post('/deactivateAccount',requireAuth, function (req, res) {
  console.log("Inside deactivateAccount post request");
  console.log("Request req.body:");
  console.log(req.body.username)
  //  console.log(req.params.data);

  kafka.make_request('loginSignuptopic', { "path": "deactivateAccount", "username": req.body.username }, function (err, result) {
    console.log(result)
    if (err) {
      res.status(500).json({ responseMessage: 'Database not responding' });
    }
    else {
      console.log("result")
      console.log(result)
      res.status(200).json({ deactivate: true, responseMessage: 'Deactivation Successfully' });

    }
  })
})


module.exports = router