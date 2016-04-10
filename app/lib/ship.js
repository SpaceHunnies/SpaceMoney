'use strict';

import { GameObject } from './game-object';

export class Ship extends GameObject {
	constructor(template) {
		super(template);
		this.crew = template.crew;
		this.payload = template.payload;
		this.modules = template.modules;
		this.parameters = template.parameters;
		console.log("created a ship with name " + template.name);
	}

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}

	move (val) {
		this.transform.translate(val.direction[0] * val.speed, val.direction[1] * val.speed, val.direction[2] * val.speed);
	}

}
