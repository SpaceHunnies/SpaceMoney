'use strict';

import { Shipyard } from './shipyard';

export class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate);
		console.log(this.ship);

		let newPos = this.ship.translate(1, 1, 1);
	}

	// we probably want some way to handle real-time loops and
	// async or "jump-ahead" updates
	update (deltaTime) {
		this.ship.move({direction: [1, 0, 1], speed: 1 * deltaTime});
	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
};