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

    window.onkeydown = function(event) {
      switch(event.keyCode) {
        case KEY_Q:
          socket.emit('move left');
          this.left.call();
          break;

        case KEY_D:
        socket.emit('move left');
          this.right.call();
          break;

        case KEY_Z:
          socket.emit('move left');
          this.jump.call();
          break;

        case KEY_S:
          socket.emit('crouch');
          this.crouch.call();
          break;

        case KEY_I:
          socket.emit('block');
          this.block.call();
          break;

        case KEY_O:
          socket.emit('punch');
          this.punch.call();
          break;

        case KEY_K:
          socket.emit('kick');
          this.kick.call();
          break;

        case KEY_L:
          socket.emit('specialAttack');
          this.specialAttack.call();
          break;

        default: break;
      }
    };
  };

  Game.Entities.Controls = Controls;
}(window, Game));
