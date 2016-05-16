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
	"DOCKING",
	"DOCKED"
];

export class Navigate extends Role {

	constructor(person) {
		super(person);
		this.searchRange = 1000;
		this.code = statusCode[0]
		this.engineModule = null;
	}

	getEngineModule() {
		if (engineModule != null) {
			console.log("[NAV] Replacing engine module reference...");
		}
		let e = this.ship.modules.get('engine');
		if (!e) {
			console.log("[NAV] engine module reference retrieve failed!");
			return false;
		}
		this.engineModule = e;
		console.log("[NAV] Success!");
		return true;
	}

	navigate() {
		if (!this.ship.targetSystem) {
			console.log("[NAV] No target!");
		} else if (!this.isArrivedAtSystem()) {
			this.sendInstructionToEngine();
		}
	}

	isArrivedAtSystem() {
		let e = this.engineModule;
		if (!e) return;
		if (!e.output) return;
		if (e.output.distance > 0) {
			this.code = statusCode[0];
			this.ship.code = this.code;
			return false;
		}
		return true;
	}

	canDock() {
		if (!this.ship.targetSystem.starport) return false;
		return true;
	}

	sendInstructionToEngine(request) {
		if (!request) request = {target: this.ship.targetSystem.transform, origin: this.ship.transform};
		this.ship.modules.get("engine").doWork(request, this.endInstructionsToEngine, this); // if there's a correct way to send caller/object references through callbacks that would be great
	}

	endInstructionsToEngine(this) {
		this.dock(this);
	}

	dock(my) {
		if (!my.isArrivedAtSystem()) return;
		if (!my.canDock()) {
			my.code = statusCode[1];
			console.log('[NAV] At target!');
		} else {
			my.code = statusCode[2];
			console.log('[NAV] Docked!');
		}
		my.ship.code = my.code;
	}

}