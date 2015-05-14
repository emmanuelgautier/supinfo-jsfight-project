(function(window, $) {
  'use strict';

  //$ IS NOT JQUERY LIBRARY LOADING !
  //This is jqlite angular implementation

  var INITIAL_LIFE = 100,
      ATTACK_DAMAGE = 10,
      SPECIAL_ATTACK_DAMAGE = 20;

  /**
   * @constructor
   * @api public
   */
  function Game() {

    this.uuids = [];
    this.users = {};

    this.World = null;
    this.Player = [];

    this._socket = null;
  }

  /**
   * Create a new player.
   *
   * @return {Object}
   * @api protected
   */
  Game.prototype._createPlayer = function() {

    var id = Math.random().toString(36).substring(10);

    this.uuids.push(id);

    var user = this.users[id] = {};
      user.player = new this.Entities.Player(id, new this.Entities.Health());

    return user.player;
  };

  /**
   * @param {Object} fight
   * @api public
   */
  Game.prototype.start = function(fight) {

    /*this._token = fight.token;
    this._fight = fight;*/

    this.World = new this.Entities.World();
      this.World.create();

    //create my player
    var myPlayer = this.myPlayer = this._createPlayer();

    //create opponent player
    this._createPlayer();

    this.Controls = new this.Entities.Controls(this._socket);
      this.Controls.onRight(myPlayer.right);
      this.Controls.onLeft(myPlayer.left);
      this.Controls.onJump(myPlayer.jump);
      this.Controls.onCrouch(myPlayer.crouch);
      this.Controls.onBlock(myPlayer.block);
      this.Controls.onPunch(myPlayer.punch);
      this.Controls.onKick(myPlayer.kick);
      this.Controls.onSpecialAttack(myPlayer.specialAttack);

    var Health = new this.Entities.Health();
      Health.setLife(INITIAL_LIFE);

    this.users[this.uuids[0]].Health = $.clone(Health);
    this.users[this.uuids[1]].Health = $.clone(Health);

    this.Core.startRendering();

    this.Controls.listen();
  };

  /**
   * Socket object setter
   *
   * @param {Object} socket
   * @api public
   */
  Game.prototype.setSocket = function(socket) {
    this._socket = socket;
  };

  Game.prototype.Entities = {};

  window.Game = new Game();
}(window, angular.element()));
