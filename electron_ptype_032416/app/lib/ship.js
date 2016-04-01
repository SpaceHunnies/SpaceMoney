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
		this.captain = properties.captain;
		this.comms = properties.waterMax;
		this.quartermaster = properties.quartermaster;
		this.navigator = properties.navigator;
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

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}

	move (val) {
		this.transform.translate(val.direction[0] * val.speed, val.direction[1] * val.speed, val.direction[2] * val.speed);
	}

}
