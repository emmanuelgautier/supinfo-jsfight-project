(function(Game) {
  'use strict';

  /**
   * @constructor
   * @api public
   */
  function Health() {

    this.life = 0;
  }

  /**
   * @param {Number} gain
   * @return {Number}
   * @api public
   */
  Health.prototype.gain = function(life) {

    return this.life += life;
  };

  /**
   * @param {Number} life
   * @return {Number}
   * @api public
   */
  Health.prototype.loose = function(life) {

    return this.life = -= life;
  };

  /**
   *
   * @param {Number} life
   * @api public
   */
  Health.prototype.setLife = function(life) {

    this.life = life;
  };

  /**
   * @return {Number}
   * @api public
   */
  Health.prototype.getLife = function() {

    return this.life;
  }

  Game.Entities.Health = Health;
} (Game));
