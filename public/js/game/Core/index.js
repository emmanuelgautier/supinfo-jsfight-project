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
  }

  /**
   * Initialize canvas
   *
   * @param {String} id
   * @api public
   */
  Core.prototype.setCanvas = function(id) {
    var element = document.getElementById(id);

    this._canvas = element.getContext('2d');

    var parent = element.parentNode;

    var width = parent.clientWidth * 95 / 100,
        height = width * 60 / 100;

    this.Static.CANVAS_WIDTH = width;
    this.Static.CANVAS_HEIGHT = height;

    element.width = width;
    element.height = height;

    this.Static.FLOOR = height * 60 / 100;
    this.Static.MARGIN_INITAL_POSITION = width * 10 / 100;
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
      that.paintBackground();

      that._backgroundImageLoaded = true;
    });
  };

  /**
   * Check collision between two elements
   *
   * @param {Object} object1
   * @param {Object} object2
   * @param {Boolean}
   * @api protected
   */
  Core.prototype.checkCollision = function(object1, object2) {

    //check object1
    if(object1.position[0] > object2.position[0]) {
      throw "position error";
    }

    if((object1.position[0] + object1.width) >= (object2.position[0] - (object1.width * 10 / 100))) {
      return true;
    }

    return false;
  };

  /**
   * Update objects position and status
   *
   * @api public
   */
  Core.prototype.update = function() {

    var users = [];

    for(var object in this.objects) {
      this.objects[object].update();

      //if object is a character
      if(this.objects[object] instanceof this.Objects.Character) {
        users.push(this.objects[object]);
      }
    }

    if(this.checkCollision(users[0], users[1])) {

      //move players
      var collisionWidth = (users[0].position[0] + users[0].width) - users[1].position[0];

      collisionWidth = collisionWidth / 10;

      users[0].position[0] -= collisionWidth;
      users[1].position[0] += collisionWidth;

      users[0].onCollision.call(users[0], users[1]);
      users[1].onCollision.call(users[1], users[0]);
    }
  };

  /**
   * Paint background image
   *
   * @api protected
   */
  Core.prototype.paintBackground = function() {
    this._canvas.drawImage(this._backgroundImage, 0, 0);
  };

  /**
   * Paint canvas
   *
   * @api protected
   */
  Core.prototype.paint = function() {
    this.paintBackground();

    var sprite, dimensions, position;
    for(var object in this.objects) {
      sprite = this.objects[object].getSprite();
      dimensions = this.objects[object].getSpriteDimensions();
      position = this.objects[object].position;

      this._canvas.drawImage.apply(this._canvas, [
        sprite[0],
        sprite[1],
        sprite[2],
        dimensions[0],
        dimensions[1],
        position[0],
        position[1],
        this.objects[object].width,
        this.objects[object].height
      ]);
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

    var animation = function(time) {
      that.paint.apply(that, [time]);

      window.requestAnimationFrame(animation);
    };

    window.requestAnimationFrame(animation);
  };

  /**
   * Core static variable
   *
   */
  Core.prototype.Static = {
    CANVAS_WIDTH: 0,
    CANVAS_HEIGHT: 0,
    FLOOR: 0,
    MARGIN_INITAL_POSITION: 0
  };

  /**
   * Stop canvas rendering
   *
   * @api public
   */
  Core.prototype.stopRendering = function() {
    //
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
