'use strict';

import { Ship } from './ship';

export class Shipyard {
	constructor(properties) {
		console.log("created a shipyard")
		this.properties = properties;
		this.shipList = [];
	}

	buildShip(properties) {
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