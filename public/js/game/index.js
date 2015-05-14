(function() {
  'use strict';

  var INITIAL_LIFE = 100,
      ATTACK_DAMAGE = 10,
      SPECIAL_ATTACK_DAMAGE = 20;

  /**
   * @constructor
   * @param {Object} socket
   * @api public
   */
  function Game(socket) {

    this.uuids = [];
    this.users = {};

    this.World = null;
    this.Player = [];

    this._socket = socket;
  }

  /**
   * Create a new player.
   *
   * @return {Object}
   * @api protected
   */
  Game.prototype._createPlayer = function() {

    var id = uuid.v1();

    this.uuids.push(id);

    var user = this.users[id] = {};
      user.player = new this.Entities.Player(id, new this.Entities.Health());

    return id;
  };

  /**
   * @param {Object} fight
   * @api public
   */
  Game.prototype.start = function(fight) {

    this._token = fight.token;
    this._fight = fight;

    this.user[this.uuid[0]].Health.setLife(INITIAL_LIFE);
    this.user[this.uuid[1]].Health.setLife(INITIAL_LIFE);

    this.World = new this.Entities.World();
      this.World.create();

    //create my player
    var myPlayer = this.myPlayer = this._createPlayer();

    //create opponent player
    this._createPlayer();

    this.Controls = new Game.Entities.Controls();
      this.Controls.onRight(myPlayer.right);
      this.Controls.onLeft(myPlayer.left);
      this.Controls.onJump(myPlayer.jump);
      this.Controls.onCrouch(myPlayer.crouch);
      this.Controls.onBlock(myPlayer.block);
      this.Controls.onPunch(myPlayer.punch);
      this.Controls.onKick(myPlayer.kick);
      this.Controls.onSpecialAttack(myPlayer.specialAttack);

    
  };

  Game.prototype.Entities = {};

  window.Game = new Game();
}());
