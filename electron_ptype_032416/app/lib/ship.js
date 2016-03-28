'use strict';

import { GameObject } from './game-object';

export class Ship extends GameObject {
	constructor(properties) {
		super(properties);
		this.speed = properties.speed;
		this.crewMax = properties.crewMax;
		this.food = properties.food;
		this.foodMax = properties.foodMax;
		this.oxy = properties.oxy;
		this.oxyMax = properties.oxyMax;
		this.water = properties.water;
		this.waterMax = properties.waterMax;
		this.captain = null;
		this.comms = null;
		this.quartermaster = null;
		this.nav = null;
		console.log("created a ship with name " + properties.name);
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

