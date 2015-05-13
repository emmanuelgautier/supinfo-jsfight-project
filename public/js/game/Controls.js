(function(Game) {
  'use strict';

  var KEY_Z = 90;
  var KEY_S = 83;
  var KEY_Q = 81;
  var KEY_D = 68;
  var KEY_I = 73;
  var KEY_O = 79;
  var KEY_K = 75;
  var KEY_L = 76;


  /**
   *
   * @constructor
   * @param {Object} Player
   * @param {Number} velocity
   * @api public
   */

  function Controls() {

    }

  Controls.prototype.onJump = function(callback) {
    this.jump = callback;
  };

  Controls.prototype.onCrouch = function(callback) {
    this.crouch = callback;
  };

  Controls.prototype.onLeft = function(callback) {
    this.left = callback;
  };

  Controls.prototype.onRight = function(callback) {
    this.right = callback;
  };

  Controls.prototype.onBlock = function(callback) {
    this.block = callback;
  };

  Controls.prototype.onPunch = function(callback) {
    this.punch = callback;
  };

  Controls.prototype.onKick = function(callback) {
    this.kick = callback;
  };

  Controls.prototype.onSpecial_Attack = function(callback) {
    this.special_attack = callback;
  };

  Controls.prototype.listen = function() {
    window.onkeydown = function(event) {
      switch(event.keyCode) {

        case KEY_Z: 
          this.jump.call();
        break;

        case KEY_S:
          this.crouch.call();
        break;

        case KEY_Q:
          this.left.call();
        break;

        case KEY_D:
          this.right.call();
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
          this.special_attack.call();
        break;
        default: break;
      }
    };
  }

  Game.Entities.Controls = Controls;
}(Game));
