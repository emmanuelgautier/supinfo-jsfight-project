(function(Core) {
  'use strict';

  /*
   * @constructor
   * @api protected
   */
  function Rectangle() {
    //
  }

  /**
   * @param {Number} width
   * @param {Number} height
   * @param {Array} position
   * @api public
   */
  Rectangle.prototype.create = function(width, height) {

    if(typeof width != 'number') {
      throw "Rectangle width must be a number !";
    }

    if(typeof height != 'number') {
      throw "Rectangle width must be a number !";
    }

    this.width = width;
    this.height = height;
  };

  /**
   * Rectangle width
   */
  Rectangle.prototype.width = 0;

  /**
   * Rectangle height
   */
  Rectangle.prototype.height = 0;

  /**
   * Rectangle position
   */
  Rectangle.prototype.position = [0, 0];

  /**
   * Inherit from `Objects Body`.
   */
  Rectangle.prototype.__proto__ = Core.Objects.Body;

  /**
   * Expose `Rectangle object`.
   */
  Core.Objects.Rectangle = new Rectangle();
} (Core));
