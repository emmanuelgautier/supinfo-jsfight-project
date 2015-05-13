(function(Game) {
  'use strict';

  /**
   *
   * @constructor
   * @param {Object} Player
   * @param {Number} velocity
   * @api public
   */
  function Controls(Player, velocity) {

    if(Player) {
      this.Player = Player;
    }

    this._velocity = velocity;
  };

  /**
   * Move paddle to specify position
   *
   * @param {Number} x
   * @api public
   */
  Controls.prototype.move = function(x) {

    this.Player.position[0] = x;
  };

  /**
   * Move paddle up
   *
   * @param {Numbeer} n
   * @api public
   */
  Controls.prototype.up = function(n) {

    this.Player.velocity[1] = this._velocity * n;
  };

  /**
   * Move paddle down
   *
   * @param {Number} n
   * @api public
   */
  Controls.prototype.down = function(n) {

    this.Player.velocity[1] = -this._velocity * n;
  };

  Game.Entities.Controls = Controls;
}(Game));
