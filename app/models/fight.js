'use strict';

var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema;

var PlayerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  point: { type: Number }
});

var FightSchema = new Schema({
  duration: { type: Number },
  players: [PlayerSchema],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Fight', FightSchema);
