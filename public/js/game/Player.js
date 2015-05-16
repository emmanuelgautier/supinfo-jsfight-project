(function(Game) {
  'use strict';

  var SPEED = 

  /**
   * @constructor
   * @param {String} uuid
   * @param {Object} Health
   * @api public
   */
  function Player(uuid, Health) {
    Game.Core.objects[uuid] = this;

    this._uuid = uuid;
    this.Health = Health;
  }

  Player.prototype.jump = function () {

    stickman.y -= stickman.speed * modifier;
  };

  Player.prototype.crouch = function () {

    this.state = 'crouch';
  };

  Player.prototype.left = function () {
    
    this.state = 'crouch';
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

  /**
   * Inherit from `Objects Character`.
   */
  Player.prototype.__proto__ = Core.Objects.Character;

  Game.Entities.Player = Player;
} (Game));
