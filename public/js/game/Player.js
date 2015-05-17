(function(Game) {
  'use strict';

  var SPEED = 10;

  var DAMAGE_ATTACK = 10,
      DAMAGE_SPECIAL_ATTACK = 20;

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

    this.create(80, 170);

    this.attacking = false;
  };

  Player.prototype.jump = function () {

    this.setState('jump');
  };

  Player.prototype.crouch = function () {

    this.setState('crouch');
  };

  Player.prototype.left = function () {
    
    this.setState('retire');

    this.position[0] -= SPEED;
  };

  Player.prototype.right = function () {
    
    this.setState('run');

    this.position[0] += SPEED;
  };

  Player.prototype.block = function () {
    
    this.setState('block');

  };

  Player.prototype.punch = function () {

    this.attacking = true;

    this.setState('punch');
  };

  Player.prototype.kick = function () {

    this.attacking = true;

    this.setState('kick');
  };

  Player.prototype.specialAttack  = function () {

    this.attacking = true;

    this.setState('special');
  };

  Player.prototype.onCollision = function(Player2) {

    var damage = 0;

    if(!this.attacking) {
      return;
    }

    if(this.state === 'kick' || this.state === 'punch') {
      damage = DAMAGE_ATTACK;
    } else if(this.state === 'specialAttack') {
      damage = DAMAGE_SPECIAL_ATTACK;
    } else {
      return;
    }

    //if player is jumping damages are higher except if player2 is crouched
    if(this.position[1] < Game.Core.Static.FLOOR) {
      if(Player2.getState() != 'crouch') {
        return;
      } else {
        damage = damage * 2;
      }
    }

    if(Player2.getState() === 'block') {
      damage = damage / 2;
    }

    Player2.Health.loose(damage);

    this.attacking = false;
  };

  /**
   * @api public
   */
  Player.prototype.Health = null;

  /**
   * Inherit from `Objects Character`.
   */
  Player.prototype.__proto__ = new Core.Objects.Character();

  Game.Entities.Player = Player;
} (Game));
