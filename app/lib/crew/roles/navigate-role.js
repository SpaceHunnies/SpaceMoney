'use strict';
import { Role } from './role-base'
import { Engine } from '../../ship_modules/engine'
import { Transform } from '../../transform'
import { Captain } from './captain-role'

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

const statusCode = [
	"NONE",
	"ARRIVAL",
	"DOCKED"
];

export class Navigate extends Role {

	constructor(person) {
		super(person);
		this.searchRange = 1000;
		this.code = statusCode[0]
	}

	navigate() {
		if (!this.ship.targetSystem) {
			// this.targetTransform = chooseTargetDestination(this.ship.transform, searchRange);
			console.log("[NAV] No target!");
		} else if (!this.isAtTarget()) {
			this.sendInstructionToEngine();
		} else if (this.ship.targetSystem.transform.distance(this.ship.transform) > 0) {
			this.sendInstructionToEngine();
		}
	}

	isAtTarget() {
		let e = this.ship.modules.get('engine');
		if (!e) return;
		if (!e.output) return;
		if (e.output.distance > 0) {
			this.code = statusCode[0];
			this.ship.code = this.code;
			return false;
		}
		return true;
	}

	sendInstructionToEngine(request) {
		if (!request) request = {target: this.ship.targetSystem.transform, origin: this.ship.transform};
		this.ship.modules.get("engine").doWork(request, this.dock, this); // if there's a correct way to send caller/object references through callbacks that would be great
	}

	dock(my) {
		if (!my.isAtTarget()) return;
		if (!my.ship.targetSystem.starport) {
			my.code = statusCode[1];
			console.log('[NAV] At target!');
		} else {
			my.code = statusCode[2];
			console.log('[NAV] Docked!');
		}
		my.ship.code = my.code;
	}

}