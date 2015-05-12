'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcryptjs'),
    Schema   = mongoose.Schema,

    SALT_WORK_FACTOR = 10;

var UserEmailsSchema = new Schema({
  value: String,
  type: String
});

var UserPhotosSchema = new Schema({
  value: String
});

var UserSchema = new Schema({
  provider: String,
  username: String,
  password: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String,
    middleName: String
  },
  emails: [UserEmailsSchema],
  image: String,
  photos: [UserPhotosSchema]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

mongoose.model('User', UserSchema);
