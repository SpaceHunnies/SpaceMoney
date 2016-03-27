'use strict';

import { Ship } from './ship';

export class ShipManager {
	constructor(properties) {
		console.log("created a ship manager")
		this.properties = properties;
		this.shipList = [];
	}

	spawnShip(properties) {
		console.log("spawning a ship named " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}

	print() {
		for (var i = this.shipList.length - 1; i >= 0; i--) {
			console.log(this.shipList[i]);
		}
	}
}