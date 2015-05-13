(function() {
  'use strict';

  /**
   * @constructor
   * @param {Object} socket
   * @api public
   */
  function Game(socket) {

    this.World = null;
    this.Player = [];

    this._socket = socket;
  }

  /**
   * @param {Object} fight
   * @api public
   */
  Game.prototype.start = function(fight) {

    this._token = fight.token;
    this._fight = fight;
  };

  Game.prototype.Entities = {};

  window.Game = Game;
}());
