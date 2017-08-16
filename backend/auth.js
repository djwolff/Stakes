var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
// console.log(models)

module.exports = function(passport) {
  // Add Passport-related auth routes here, to the router!
  // YOUR CODE HERE
  router.get('/', function(req, res) {
    if (req.user) {
      console.log(req.user)
      res.redirect('/contacts')
    }
    else {
      res.redirect('/login')
    }
  })
  router.get('/signup', function(req, res) {
    res.render('signup.hbs')
  })
  router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password || !req.body.passwordRepeat) {
      console.log('Fields must not be empty')
    }
    else {
      console.log(models)
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
        // phone: '+13212340524'
      })
      newUser.save(function(err) {
        if (err) {
          console.log('error:' + err)
        }
        else {
          console.log('Saved!')
          res.redirect('/login')
        }
      })
    }
  })
  router.get('/login', function(req, res) {
    res.render('login')
  })
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/contacts',
    failureRedirect: '/login'
  }))
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('login')
  })

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'user_friends'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
);
  return router;
}
