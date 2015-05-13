'use strict';

var passport = require('passport'),

    mongoose = require('mongoose'),

    User = mongoose.model('User');

module.exports = function(app) {

  app.post('/register',
    function(req, res) {
      var error = null;

      if (!req.body.username) {
        error = 'The username field is required.';
      } else if (!req.body.password) {
        error = 'The password field is required.';
      }

      if (error !== null) {
        return res.status(400).json({ error: error });
      }

      var user = new User();
        user.username    = req.body.username;
        user.displayName = user.username;
        user.password    = req.body.password;

      user.save(function(err) {
        if (err) {
          return res.status(500).json({ error: 'An unknown error occured.' });
        }

        res.json(user);
      });
    }
  );

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      if(!req.user) {
        return res.sendStatus(401);
      }

      res.json(req.user);
    }
  );

  app.get('/logout',
    function(req, res) {
      req.logout();

      res.json({ success: true });
    }
  );

};
