'use strict';

import { Ship } from './ship';

export class ShipManager {
	constructor(properties) {
		console.log("created a ship manager")
		// this.properties = properties;
	}

	spawnShip(properties) {
		console.log("spawning a ship");
		return new Ship(properties);
	}

	print() {
		console.log("ship manager printing");
	}
}