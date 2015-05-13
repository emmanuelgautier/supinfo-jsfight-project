(function(Game) {
	'use strict';

	var stickman = {
		speed: 256, // movement in pixels per second
		x: 0,
		y: 0
	};
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

	Player.prototype.jump = function () {
		stickman.y -= stickman.speed * modifier;
	};

	Player.prototype.crouch() = function () {
		
	};

	Player.prototype.left() = function () {
		stickman.x -= stickman.speed * modifier;
	};

	Player.prototype.right() = function () {
		stickman.x += stickman.speed * modifier;
	};

	Player.prototype.lock() = function () {
		
	};

	Player.prototype.punch() = function () {
		
	};

	Player.prototype.kick() = function () {
		
	};

	Player.prototype.special_attack()  = function () {
		
	};

	Game.Entities.Player = Player;
}(Game));
