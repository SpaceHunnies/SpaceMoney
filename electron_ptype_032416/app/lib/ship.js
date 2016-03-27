'use strict';

export class Ship {
	constructor(properties) {
		this.properties = properties;
		this.name = properties.name;
		console.log("created a ship with name " + this.properties.name);
	}

	addFood (amount) {
		if (food + amount <= foodMax) {
			food = food + amount;
			return 0;
		} else {
			let overflow = foodMax - food;
			food = foodMax;
			return overflow;
		}
	}
}

