(function(Core) {
  'use strict';

  /*
   * @constructor
   * @api protected
   */
  function Rectangle() {

    this.width = 0;
    this.height = 0;
  }

  /**
   * @param {Number} width
   * @param {Number} height
   * @param {Array} position
   * @api public
   */
  Rectangle.prototype.create = function(width, height, position) {

    if(typeof width != 'number') {
      throw "Rectangle width must be a number !";
    }

    if(typeof height != 'number') {
      throw "Rectangle width must be a number !";
    }

    if(position && typeof position != 'object') {
      throw "Rectangle position must be an array !";
    }

    this.width = width;
    this.height = height;

    this.position = position || [0, 0];
  };

/**
 * Inherit from `Objects Body`.
 */
  Rectangle.prototype.__proto__ = Core.Objects.Body;

  /**
   * Expose `Rectangle object`.
   */
  Core.Objects.Rectangle = Rectangle;
} (Core));
