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
   * @param {Object} Player
   * @param {Number} velocity
   * @api public
   */
  function Controls() {
    //
  }

  Controls.prototype.onLeft = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.left = callback;
  };

  Controls.prototype.onRight = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.right = callback;
  };

  Controls.prototype.onJump = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.jump = callback;
  };

  Controls.prototype.onCrouch = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.crouch = callback;
  };

  Controls.prototype.onBlock = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.block = callback;
  };

  Controls.prototype.onPunch = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.punch = callback;
  };

  Controls.prototype.onKick = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.kick = callback;
  };

  Controls.prototype.onSpecialAttack = function(callback) {

    if(typeof callback != 'function') {
      throw "Controls callback must be a function !";
    }

    this.specialAttack = callback;
  };

  Controls.prototype.listen = function() {

    window.onkeydown = function(event) {
      switch(event.keyCode) {
        case KEY_Q:
          this.left.call();
          break;

        case KEY_D:
          this.right.call();
          break;

        case KEY_Z: 
          this.jump.call();
          break;

        case KEY_S:
          this.crouch.call();
          break;

        case KEY_I: 
          this.block.call();
          break;

        case KEY_O:
          this.punch.call();
          break;

        case KEY_K:
          this.kick.call();
          break;

        case KEY_L:
          this.specialAttack.call();
          break;

        default: break;
      }
    };
  };

  Game.Entities.Controls = Controls;
}(window, Game));
