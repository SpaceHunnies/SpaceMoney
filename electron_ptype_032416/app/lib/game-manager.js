'use strict';

import { Shipyard } from './shipyard';
import { UniverseForge } from './universe-forge';
const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate);
		console.log(this.ship);

		this.universe = new UniverseForge(2, 10000, 10000, 10000).universe;
		console.log(this.universe);

		let newPos = this.ship.transform.translateToVector(this.universe[0].position);
		console.log(this.universe[0].position.toArray());
	}

	// we probably want some way to handle real-time loops and
	// async or "jump-ahead" updates
	update (deltaTime) {
		// this.ship.move({direction: this.universe[0].position.toArray(), speed: 1 * deltaTime});
	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
};