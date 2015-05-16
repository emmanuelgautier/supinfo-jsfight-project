(function(Core) {
  'use strict';

  /*
   * @constructor
   * @api protected
   */
  function Character() {
    this.state = 'default';
    this.stateSpriteNumber = 0;

    this._spritesLoaded = false;

    this._spritesImage = null;

    this._spriteWidth = 0;
    this._spriteHeight = 0;
    this._imageWidth = 0;
    this._imageHeight = 0;

    this._spritePerLine = 0;

    this._sprites = [];
  }

  /**
   * Calculate sprite position.
   *
   * @param {Number} number
   * @return {Array}
   * @api protected
   */
  Character.prototype.spritePosition = function(number) {
    number -= 1;

    var column = number % this._spritePerLine,
        line = (number - column) / this._spritePerLine;

    return [column * this._spriteWidth, line * this._spriteHeight];
  };

  /**
   * Define character sprite.
   *
   * @param {String} image
   * @param {Number} spriteWidth
   * @param {Number} spriteHeight
   * @param {Object} actionSprites
   * @api public
   */
  Character.prototype.setSprites = function(image, spriteWidth, spriteHeight, actionSprites) {
    var that = this;

    this._spriteWidth = spriteWidth;
    this._spriteHeight = spriteHeight;

    this._spritesImage = Core.loadImage(image, function() {
      that._imageWidth = that._spritesImage.width;
      that._spriteHeight = that._spritesImage.height;
      that._spritePerLine = Math.ceil(that._imageWidth / that._spriteWidth);

      for(var state in actionSprites) {
        if(typeof actionSprites[state] === 'number') {
          that._sprites[state] = that.spritePosition(actionSprites[state]);
          continue;
        }

        that._sprites[state] = [];

        for(var i = 0, j = actionSprites[state].length; i < j; i += 1) {
          that._sprites[state][i] = that.spritePosition(actionSprites[state][i]);
        }
      }

      that._spritesLoaded = true;
    });
  };

  /**
   * Check if the object is ready
   *
   * @return {Boolean}
   * @api public
   */
  Character.prototype.ready = function() {
    return this._spritesLoaded;
  };

  /**
   * Get sprite in character current state.
   *
   * @return {Array}
   * @api public
   */
  Character.prototype.getSprite = function() {
    if(typeof this._sprites[this.state] === 'number') {
      return [this._spritesImage, this._sprites[this.state][0], this._sprites[this.state][1]];
    }

    return [this._spritesImage, this._sprites[this.state][this.stateSpriteNumber][0], this._sprites[this.state][this.stateSpriteNumber][1]];
  };

  /**
   * Inherit from `Objects Rectangle`.
   */
  Rectangle.prototype.__proto__ = Core.Objects.Rectangle;

  /**
   * Expose `Character object`.
   */
  Core.Objects.Character = new Character();
} (Core));