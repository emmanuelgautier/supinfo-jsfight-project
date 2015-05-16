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

    this.interval = 20;
    this.startTime = new Date().getTime();
    this.time = this.startTime;
    this.lastTime = 0;

    this.physicsElapsed = this.calculatePhysicsElapsed(this.interval);

    this._sprites = [];
    this._spritesWidth = 0;
    this._spritesHeight = 0;

    this.uuids = [];
    this.users = {};

    this.World = null;
    this.Player = [];

    this._socket = null;

    this.running = false;
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
   * Define players sprites
   *
   * @param {Array} sprites
   */
  Game.prototype.setPlayersSprites = function(spritesWidth, spritesHeight, sprites) {

    this._spritesWidth = spritesWidth;
    this._spritesHeight = spritesHeight;

    this._sprites = sprites;
  };

  /**
   * Preload game object
   *
   * @api public
   */
  Game.prototype.preload = function() {

    this.World = new this.Entities.World();
      this.World.create();

    //create my player
    var myPlayer = this.myPlayer = this._createPlayer();
      myPlayer.setSprites(this._sprites[0], this._spritesWidth, this._spritesHeight, {
        'default': 0,
        'run'    : [7, 8, 9],
        'retire' : 31,
        'jump'   : [16, 17],
        'crouch' : 20,
        'block'  : 40,
        'kick'   : [45, 46],
        'special': [49, 50] 
      });

    //create opponent player
    var opponentPlayer = this.opponentPlayer = this._createPlayer();
      opponentPlayer.setSprites(this._sprites[1], this._spritesWidth, this._spritesHeight, {
        'default': 0,
        'run'    : [7, 8, 9],
        'retire' : 31,
        'jump'   : [16, 17],
        'crouch' : 20,
        'block'  : 40,
        'kick'   : [45, 46],
        'special': [49, 50] 
      });
  };

  /**
   *
   * @api protected
   */
  Game.prototype.update = function() {

    this.broadcast('position', myPlayer.position);

    //position check
    //if one player win
  };

  /**
   * Start game
   *
   * @param {Object} fight
   * @api public
   */
  Game.prototype.start = function(fight) {

    /*this._token = fight.token;
    this._fight = fight;*/

    var myPlayer = this.myPlayer,
        opponentPlayer = this.opponentPlayer;

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

    this.running = true;

    this.run();
  };

  /**
   * Stop game
   *
   * @api public
   */
  Game.prototype.stop = function() {

    this.running = false;
  };

  /**
   *
   * @api protected
   */
  Game.prototype.run = function() {

    if(this.running) {
      this.updatePaddles();

      this.time = new Date().getTime();
      if(this.lastTime <= this.time) {
        this.update();

        this.lastTime += this.physicsElapsed;
      }

      var that = this;
      setTimeout(function() { that.run(); }, 5);
    }
  };

  /**
   * Calculate physics elapsed in milliseconds from interval refresh
   *
   * @param {Number}
   * @return {Number}
   * @api protected
   */
  Game.prototype.calculatePhysicsElapsed = function(interval) {

    return Math.round(1000 / interval);
  };

  /**
   *
   * @return {Number}
   * @api public
   */
  Game.prototype.getInterval = function() {

    return this.interval;
  };

  /**
   *
   * @param {Number} interval
   * @api public
   */
  Game.prototype.setInterval = function(interval) {

    this.interval = interval;

    this.physicsElapsed = this.calculatePhysicsElapsed(interval);
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
