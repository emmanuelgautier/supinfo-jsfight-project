(function(window, Game) {
  'use strict';

  function Core() {
    //normalize with browser support api
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    this._backgroundImageLoaded = false;
    this._backgroundImage = null;

    this._canvas = null;

    this._animationFrameId = null;
  }

  /**
   * Initialize canvas
   *
   * @param {String} id
   * @api public
   */
  Core.prototype.setCanvas = function(id) {
    this._canvas = document.getElementById(id).getContext('2d');
  }

  /**
   * Load Image
   *
   * @param {String} path
   * @param {Function} callback
   * @return {Image}
   * @api protected
   */
  Core.prototype.loadImage = function(path, callback) {
    var image = new Image();
      image.src = path;

    image.onload = callback;

    return image;
  };

  /**
   * Load background image
   *
   * @param {String} path
   * @api public
   */
  Core.prototype.loadBackgroundImage = function(path) {
    var that = this;

    this._backgroundImage = this.loadImage(path, function() {
      that._backgroundImageLoaded = true;
    });
  };

  /**
   * @api protected
   */
  Core.prototype.checkCollision = function() {
    for(var object in this.objects) {
    
    }
  };

  /**
   * Update objects position
   *
   * @api public
   */
  Core.prototype.update = function() {
    
  };

  /**
   * Paint canvas
   *
   * @param {Number} time
   * @api protected
   */
  Core.prototype.paint = function(time) {
    this._canvas.drawImage(this._backgroundImage, 0, 0);

    for(var object in this.objects) {
      this._canvas.drawImage.apply(this._canvas, this.objects[object].getSprite());
    }
  };

  /**
   * Check if the game is ready
   *
   * @return {Boolean}
   * @api public
   */
  Core.prototype.ready = function() {
    var ready = (this._canvas != null && 
      this._backgroundImageLoaded);

    if(!ready) {
      return ready;
    }

    for(var object in this.objects) {
      if(typeof object.ready === 'function' && !object.ready()) {
        return false;
      }
    }

    return true;
  };

  /**
   * Start canvas rendering
   *
   * @api public
   */
  Core.prototype.startRendering = function() {
    var that = this;
    this._animationFrameId = window.requestAnimationFrame(function(time) {
      that.paint.apply(that, [time]);
    });
  };

  /**
   * Stop canvas rendering
   *
   * @api public
   */
  Core.prototype.stopRendering = function() {
    window.cancelAnimationFrame(this._animationFrameId);
  };

  /**
   * List of game objects prototype.
   *
   * @api public
   */
  Core.prototype.Objects = {};

  /**
   * List of game objects.
   *
   * @api public
   */
  Core.prototype.objects = {};

  window.Core = Game.Core = new Core();
} (window, Game));
