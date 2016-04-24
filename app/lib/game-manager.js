'use strict';

import { Shipyard } from './shipyard';
import { UniverseForge } from './universe-forge';
const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class GameManager {
	constructor(args) {
		console.log("[GM] Constructing...")

		this.universe = new UniverseForge(2, 1000, 1000, 1000).universe;
		console.log(this.universe);

		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate, this.universe);
		console.log(this.ship);

		let newPos = this.ship.transform.translateToVector(this.universe[0].position);
		this.ship.targetTransform = this.universe[1];
		this.ship.crew.get('captain').abilities.get('captain').doMove();
	}

	// we probably want some way to handle real-time loops and
	// async or "jump-ahead" updates
	update (deltaTime) {

	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
};