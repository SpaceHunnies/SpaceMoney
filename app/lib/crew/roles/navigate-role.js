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
		this.targetTransform = null;
		this.searchRange = 1000;
	}

	navigate() {
		let captain = this.ship.crew.get("captain");
		if (!captain) return;
		let target = this.ship.captain.targetTransform
		if (!target) {
			this.targetTransform = chooseTargetDestination(this.ship.transform, searchRange);
		} else {
			this.targetTransform = target;
		}
		sendInstructionToEngine();
	}

	chooseTargetDestination(currentLocation, range) {

	}

	sendInstructionToEngine(request) {
		if (!request) {
			request = {target: this.targetTransform, origin: this.ship.transform};
		}
		this.ship.modules.get("engine").doWork(request);
	}

}