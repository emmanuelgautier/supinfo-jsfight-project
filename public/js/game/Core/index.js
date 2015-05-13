(function(Game) {
  'use strict';

  function Core() {

  }

  /**
   * @api protected
   */
  Core.prototype.checkCollision = function() {
    for(var object in this.Objects) {
    
    }
  };

  /**
   * 
   */
  Core.prototype.update = function() {
    
  };

   /**
    * @apu public
    */

  /**
   * List of game objects prototype.
   *
   * @api public
   */
  Game.prototype.Objects = {};

  /**
   * List of game objects.
   *
   * @api public
   */
   Game.prototype.objects = {};

  window.Core = Game.Core = Core;
} (Game));
