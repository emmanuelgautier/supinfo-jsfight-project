(function(Game) {
	'use strict';

  /**
   * @constructor
   * @api public
   */
	function Player() {

	}

	/**
	 * @api public
	 */
	Player.prototype.Health = null;

	/**
	 * @api public
	 */
	Player.prototype.Controls = null;

	Game.Entities.Player = Player;
}(Game));
