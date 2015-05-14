(function(Game) {
  'use strict';

  var stickman = {
    speed: 256, // movement in pixels per second
    x: 0,
    y: 0
  };

  /**
   * @constructor
   * @param {String} uuid
   * @param {Object} Health
   * @api public
   */
  function Player(uuid, Health) {

    this._uuid = uuid;
    this.Health = Health;
  }

  Player.prototype.jump = function () {

    stickman.y -= stickman.speed * modifier;
  };

  Player.prototype.crouch = function () {
    
  };

  Player.prototype.left = function () {
    
  };

  Player.prototype.right = function () {
    
  };

  Player.prototype.block = function () {
    
  };

  Player.prototype.punch = function () {
    
  };

  Player.prototype.kick = function () {
    
  };

  Player.prototype.specialAttack  = function () {
    
  };

  /**
   * @api public
   */
  Player.prototype.Health = null;

  Game.Entities.Player = Player;
}(Game));
