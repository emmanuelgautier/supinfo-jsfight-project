'use strict';

var passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut,

    mongoose = require('mongoose'),

    User = mongoose.model('User');

module.exports = function(app) {

  app.post('/register',
    ensureLoggedOut('/chat'),
    function(req, res) {
      var error = null;

      if (!req.params.username) {
        error = 'The username field is required.';
      } else if (!req.params.password) {
        error = 'The password field is required.';
      } else if (req.params.password != req.params.password_confirmation) {
        error = 'The password confirmation does not match.';
      }

      if (error !== null) {
        return res.render('register', { error: error });
      }

      var user = new User();
        user.username    = req.params.username;
        user.displayName = user.username;
        user.password    = req.params.password;

      user.save(function(err) {
        if (err) {
          return res.render('register', { error: 'An unknown error occured.' });
        }

        res.json({ success: true });
      });
    }
  );

  app.post('/login',
    ensureLoggedOut('/chat'),
    passport.authenticate('local', {
      successRedirect: '/chat',
      failureRedirect: '/login'
    })
  );

  app.get('/logout',
    ensureLoggedIn('/login'),
    function(req, res) {
      req.logout();

      res.json({ success: true });
    }
  );

};
