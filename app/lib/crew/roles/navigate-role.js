'use strict';
import { Role } from './role-base'
import { Engine } from '../../ship_modules/engine'
import { Transform } from '../../transform'
import { Captain } from './captain-role'

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class Navigate extends Role {
	constructor(person) {
		super(person);
		this.searchRange = 1000;
	}

	navigate() {
		if (!this.ship.targetTransform) {
			// this.targetTransform = chooseTargetDestination(this.ship.transform, searchRange);
			console.log("[NAV] No target!");
		} else {
			this.sendInstructionToEngine();
		}
	}

	chooseTargetDestination(currentLocation, range) {

	}

	sendInstructionToEngine(request) {
		if (!request) {
			request = {target: this.ship.targetTransform, origin: this.ship.transform};
		}
		this.ship.modules.get("engine").doWork(request);
	}

}