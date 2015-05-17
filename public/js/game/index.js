(function(window, $) {
  'use strict';

  //$ IS NOT JQUERY LIBRARY LOADING !
  //This is jqlite angular implementation

  var INITIAL_LIFE = 100;

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

    this.fightToken = null;

    this.timerId = null;
    this.lifeBarsId = [null, null];

    this.startTime = null;
    this.endTime = null;
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

    //create my player
    var firstPlayer = this._createPlayer();
      firstPlayer.setSprites(this._sprites[0], this._spritesWidth, this._spritesHeight, {
        'default': 0,
        'run'    : [7, 8, 9],
        'retire' : 31,
        'jump'   : [16, 17],
        'crouch' : 20,
        'block'  : 40,
        'punch'  : [49, 50],
        'kick'   : [45, 46],
        'special': [33, 36]
      });
      firstPlayer.position = [this.Core.Static.MARGIN_INITAL_POSITION, this.Core.Static.FLOOR];

    //create opponent player
    var secondPlayer = this._createPlayer();
      secondPlayer.setSprites(this._sprites[1], this._spritesWidth, this._spritesHeight, {
        'default': 11,
        'run'    : [4, 3, 2],
        'retire' : 29,
        'jump'   : [16, 15],
        'crouch' : 14,
        'block'  : 43,
        'punch'  : [38, 37],
        'kick'   : [45, 46],
        'special': [49, 50] 
      });
      secondPlayer.position = [this.Core.Static.CANVAS_WIDTH - this.Core.Static.MARGIN_INITAL_POSITION, this.Core.Static.FLOOR];
  };

  /**
   * Synchronize  players and check win statement
   *
   * @api protected
   */
  Game.prototype.update = function() {

    var myPlayer = this.myPlayer,
        opponentPlayer = this.opponentPlayer;

    this._socket.emit('player status', {
      position: myPlayer.position,
      width: myPlayer.width,
      height: myPlayer.height,
      state: myPlayer.getState(),
      health: opponentPlayer.Health.getLife()
    });

    //position check
    //if one player win socket emit
    if(opponentPlayer.Health.getLife() <= 0) {
      this._socket.emit('win');
    }
  };

  /**
   * Update information interface
   *
   * @api protected
   */
  Game.prototype.updateInterface = function() {

    var percentageLife = [];
      percentageLife[0] = this.users[this.uuids[0]].player.Health.getLife() / INITIAL_LIFE * 100;
      percentageLife[1] = this.users[this.uuids[1]].player.Health.getLife() / INITIAL_LIFE * 100;

    $(document.getElementById(this.lifeBarsId[0])).css('width', percentageLife[0] + '%');
    $(document.getElementById(this.lifeBarsId[1])).css('width', percentageLife[1] + '%');
  };

  /**
   * Receive opponent status notification and update player status
   *
   * @param {String} status
   * @api protected
   */
  Game.prototype.receiveStatusNotification = function(status) {

    if(!status) {
      return;
    }

    var player = this.opponentPlayer;

    player.position = status.position;
    player.width = status.width;
    player.height = status.height;
    player.setState(status.state);

    this.myPlayer.Health.setLife(status.health);

  };

  /**
   * Hande socket communications
   *
   * @api public
   */
  Game.prototype.socketHandler = function() {

    var that = this;

    this._socket.on('status', function(status) {

      that.receiveStatusNotification.call(that, status);
    });
  };

  /**
   * Start game
   *
   * @param {String} fightToken
   * @param {String} position
   * @api public
   */
  Game.prototype.start = function(fightToken, position) {

    if(position === 'left') {
      this.myPlayer = this.users[this.uuids[0]].player;
      this.opponentPlayer = this.users[this.uuids[1]].player;
      this.myPlayer.setOrientation('left');
      this.opponentPlayer.setOrientation('right');
    } else {
      this.myPlayer = this.users[this.uuids[1]].player;
      this.opponentPlayer = this.users[this.uuids[0]].player;
      this.myPlayer.setOrientation('right');
      this.opponentPlayer.setOrientation('left');
    }

    this._token = fightToken;

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

    this.Controls.Player = myPlayer;

    this.users[this.uuids[0]].player.Health.setLife(INITIAL_LIFE);
    this.users[this.uuids[1]].player.Health.setLife(INITIAL_LIFE);

    this.Core.startRendering();
    this.Controls.listen();
    this.socketHandler();

    this.running = true;

    this.startTime = (new Date()).getMilliseconds();

    this.run();
  };

  /**
   * Stop game
   *
   * @api public
   */
  Game.prototype.stop = function() {

    this.endTime = (new Date()).getMilliseconds();

    this.running = false;
  };

  /**
   *
   * @api protected
   */
  Game.prototype.run = function() {

    if(this.running) {

      this.time = new Date().getTime();
      if(this.lastTime <= this.time) {
        this.update();
        this.updateInterface();

        this.Core.update();

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
   * Set timer html id
   *
   * @param {String} timerId
   * @api public
   **/
  Game.prototype.setTimer = function(timerId) {
    this.timerId = timerId;
  };

  /**
   * Set Life bars id
   *
   * @param {String} firstPlayerLifeBarId
   * @param {String} secondPlayerLifeBarId
   * @api public
   */
  Game.prototype.setLifeBars = function(firstPlayerLifeBarId, secondPlayerLifeBarId) {
    this.lifeBarsId = [firstPlayerLifeBarId, secondPlayerLifeBarId];
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
}(window, angular.element));
