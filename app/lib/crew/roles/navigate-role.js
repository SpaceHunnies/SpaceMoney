'use strict';
import { Role } from './role-base'
import { Engine } from '../../ship_modules/engine'
import { Transform } from '../../transform'
import { Captain } from './captain-role'

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

const statusCode = [
	"NOMINAL",
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
		this.dockingTimer = 10;
		this.dockingTimerInit = 10;
		// this.getEngineModule();
	}

	getEngineModule() {
		if (this.engineModule != null) {
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

	update() {
		switch (this.code) {
			case statusCode[0]:
				if (this.engineModule == null) this.getEngineModule();
				this.navigateToTargetSystem();
			break;

			case statusCode[1]:
				this.navigateToTargetSystem();
			break;

			case statusCode[2]:
				if (this.dockingTimer <= 0) { // engage dock
					this.code = statusCode[3];
					console.log("[NAV] Docked!");
				} else {
					this.dockingTimer--;
					console.log("[NAV] Docking in " + this.dockingTimer);
				}
				this.ship.code = this.code;
			break;

			case statusCode[3]:
			break;

			default:
				console.log("[NAV] Status code missing");
			break;

		}
	}

	navigateToTargetSystem() {
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

	endInstructionsToEngine(my) {
		my.dock(my);
	}

	dock(my) {
		if (!my.isArrivedAtSystem()) return;
		if (!my.canDock()) {
			my.code = statusCode[1];
			console.log('[NAV] At target!');
		} else {
			my.code = statusCode[2];
			console.log('[NAV] Docking!');
		}
		my.ship.code = my.code;
	}

}