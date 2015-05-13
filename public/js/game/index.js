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

var controls = new Controls();

    controls.onJump(function() {
      Player.jump();
    });
    controls.onCrouch(function() {
      Player.crouch();
    });
    controls.onLeft(function() {
      Player.left();
    });
    controls.onRight(function() {
      Player.right();
    });
    controls.onBlock(function() {
      Player.block();
    });
    controls.onPunch(function() {
      Player.punch();
    });  
    controls.onKick(function() {
      Player.kick();
    });
    controls.onSpecial_Attack(function() {
      Player.special_attack();
    });