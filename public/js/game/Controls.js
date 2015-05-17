(function(window, Game) {
  'use strict';

  var KEY_Z = 90,
      KEY_S = 83,
      KEY_Q = 81,
      KEY_D = 68,
      KEY_I = 73,
      KEY_O = 79,
      KEY_K = 75,
      KEY_L = 76;

  /**
   *
   * @constructor
   * @param {Object} socket
   * @api public
   */
  function Controls(socket) {
    this.socket = socket;
  }

  /**
   * Left movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onLeft = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.left = callback;
  };

  /**
   * Right movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onRight = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.right = callback;
  };

  /**
   * Jump movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onJump = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.jump = callback;
  };

  /**
   * Crouch movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onCrouch = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.crouch = callback;
  };

  /**
   * Block movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onBlock = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.block = callback;
  };

  /**
   * Punch movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onPunch = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.punch = callback;
  };

  /**
   * Kick movement event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onKick = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.kick = callback;
  };

  /**
   * Special attack event callback handler
   *
   * @param {Function} callback
   * @api public
   */
  Controls.prototype.onSpecialAttack = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.specialAttack = callback;
  };

  /**
   * Keyboard event listener
   *
   * @api public
   */
  Controls.prototype.listen = function() {
    var that = this;

    var context = this;

    if(this.Player != null) {
      context = this.Player;
    }

    window.onkeydown = function(event) {
      switch(event.keyCode) {
        case KEY_Q:
          that.left.call(context);
          break;

        case KEY_D:
          that.right.call(context);
          break;

        case KEY_Z:
          that.jump.call(context);
          break;

        case KEY_S:
          that.crouch.call(context);
          break;

        case KEY_I:
          that.block.call(context);
          break;

        case KEY_O:
          that.punch.call(context);
          break;

        case KEY_K:
          that.kick.call(context);
          break;

        case KEY_L:
          that.specialAttack.call(context);
          break;

        default: break;
      }

      event.preventDefault();
    };
  };

  /**
   * Player object
   */
  Controls.prototype.Player = null;

  Game.Entities.Controls = Controls;
}(window, Game));
