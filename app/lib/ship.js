'use strict';

import { GameObject } from './game-object';
import { Engine } from './ship_modules/engine'

// The base ship object is basically a container for other modules that work like plugins
export class Ship extends GameObject {
	constructor(template) {
		super(template);
		this.crew = template.crew; 						// just a container for the crew objects; ship defines rules
		this.payload = template.payload; 				// a manifest of items and weight; ship defines rules
		this.modules = template.modules;				// engine(s); life support; cargo hatches; etc. -- defines performance
		this.parameters = template.parameters;			// extra stuff
		console.log("created a ship with name " + template.name);
	}

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}

	// target: vec3
	move (target) {
		var response = {};
		if (this.modules.engine) {
			response = this.modules.engine.doWork({target: target, origin: this.transform});
		} else {
			console.log("no engine!");
		}
		if (response.newPosition) {
			this.transform.position = response.newPosition;
			this.payload.fuel = this.payload.fuel - response.fuelUse;
		}
		// this.transform.translate(val.direction[0] * val.speed, val.direction[1] * val.speed, val.direction[2] * val.speed);
	}

}
