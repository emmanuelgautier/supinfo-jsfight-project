(function(Core) {
  'use strict';

  /**
   * @constructor
   * @api public
   */
  function Body() {

    this.position = [0, 0];
  }

  /**
   *
   * @param {Function} callback
   * @api public
   */
  Body.prototype.onCollision = function(callback) {
    if(typeof callback != 'function') {
      return;
    }

    this.collide = callback;
  };

  /**
   * @param {Object} withObject
   * @api public
   */
  Body.prototype.collide = function(withObject) {

    //
  };

  /**
   * @param {Array} position
   * @api public
   */
  Body.prototype.setPosition = function(position) {

    this._position = position;
  };

  /**
   *
   * @return {Array}
   * @api public
   */ 
  Body.prototype.getPosition = function() {

    return this._position;
  };

  Core.Objects.Body = Body;
} (Core));