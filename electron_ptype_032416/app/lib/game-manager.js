'use strict';

import { Shipyard } from './shipyard';

export class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate);
		console.log(this.ship);

		let newPos = this.ship.transform.translate(1, 1, 1);
	}

	update (deltaTime) {
		timer();
	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
}