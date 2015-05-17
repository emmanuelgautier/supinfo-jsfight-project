(function(Core) {
  'use strict';

  /*
   * @constructor
   * @api protected
   */
  function Character() {
    this.state = 'default';
    this.stateSpriteNumber = 0;
    this.stateEventChange = false;

    this._spritesLoaded = false;

    this._spritesImage = null;

    this._spriteWidth = 0;
    this._spriteHeight = 0;
    this._imageWidth = 0;
    this._imageHeight = 0;

    this._spritePerLine = 0;

    this._sprites = [];

    this.stateEventNotChangedCounter = 0;
    this.changeAnimationCounter = 0;
  }

  /**
   * Calculate sprite position.
   *
   * @param {Number} number
   * @return {Array}
   * @api protected
   */
  Character.prototype.spritePosition = function(number) {
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
      that._imageHeight = that._spritesImage.height;
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
   * Update character
   *
   */
  Character.prototype.update = function() {

    if(!this.stateEventChange) {
      this.stateEventNotChangedCounter += 1;
      this.changeAnimationCounter += 1;
    }

    if(this.stateEventNotChangedCounter >= 80) {
      this.setState('default');
    }

    if(this.changeAnimationCounter === 15) {

      this.changeAnimationCounter = 0;

      if(this._sprites[this.state].length === (this.stateSpriteNumber + 1)) {
        this.stateSpriteNumber -= 1;
      } else {
        this.stateSpriteNumber += 1;
      }
    }

    if(this.state != 'jump' && this.state != 'crouch' && this.position[1] > Core.Static.FLOOR) {
      this.position[1] = Core.Static.FLOOR;
    }

    if(this.position[1] <= Core.Static.FLOOR && this.state != 'jump') {
      this.position[1] += 1;
    }

    this.stateEventChange = false;
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
    if(!this._sprites[this.state]) {
      this.state = 'default';
    }

    if(typeof this._sprites[this.state][0] === 'number') {
      return [
        this._spritesImage,
        this._sprites[this.state][0],
        this._sprites[this.state][1]
      ];
    }

    return [
      this._spritesImage,
      this._sprites[this.state][this.stateSpriteNumber][0],
      this._sprites[this.state][this.stateSpriteNumber][1]
    ];
  };

  /**
   * Set state and monitor state changes
   *
   * @param {String} state
   * @api public
   */
  Character.prototype.setState = function(state) {

    this.stateEventChange = true;

    if(state != this.state) {
      this.stateSpriteNumber = 0;

      this.stateEventNotChangedCounter = 0;
      this.changeAnimationCounter = 0;
    }

    this.state = state;
  };

  /**
   * State getter
   *
   * @return {String}
   * @api public
   */
  Character.prototype.getState = function() {

    return this.state;
  };

  /**
   * Get sprite dimensions
   *
   * @return {Array}
   * @api public
   */
  Character.prototype.getSpriteDimensions = function() {
    return [this._spriteWidth, this._spriteHeight]
  };

  /**
   * Inherit from `Objects Rectangle`.
   */
  Character.prototype.__proto__ = Core.Objects.Rectangle;

  /**
   * Expose `Character object`.
   */
  Core.Objects.Character = Character;
} (Core));